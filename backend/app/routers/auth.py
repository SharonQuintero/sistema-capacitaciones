from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.schemas import UsuarioCreate, UsuarioLogin, UsuarioResponse


DbSession = Annotated[Session, Depends(get_db)]

router = APIRouter(
    prefix="/auth",
    tags=["Autenticación"],
)


@router.post(
    "/registro",
    response_model=UsuarioResponse,
    responses={
        400: {"description": "El usuario ya existe"},
    },
)
def registrar_usuario(
    datos_usuario: UsuarioCreate,
    db: DbSession,
):
    usuario_existente = crud.obtener_usuario_por_nombre(
        db,
        datos_usuario.usuario,
    )

    if usuario_existente is not None:
        raise HTTPException(
            status_code=400,
            detail="El usuario ya existe",
        )

    return crud.crear_usuario(
        db,
        datos_usuario,
    )


@router.post(
    "/login",
    response_model=UsuarioResponse,
    responses={
        401: {"description": "Usuario o contraseña incorrectos"},
    },
)
def iniciar_sesion(
    datos_login: UsuarioLogin,
    db: DbSession,
):
    usuario = crud.obtener_usuario_por_nombre(
        db,
        datos_login.usuario,
    )

    if usuario is None or usuario.contrasena != datos_login.contrasena:
        raise HTTPException(
            status_code=401,
            detail="Usuario o contraseña incorrectos",
        )

    return usuario