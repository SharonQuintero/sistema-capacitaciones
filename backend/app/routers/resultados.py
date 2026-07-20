from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.schemas import (
    ResultadoCreate,
    ResultadoDetalleResponse,
    ResultadoResponse,
)

DbSession = Annotated[Session, Depends(get_db)]

router = APIRouter(
    prefix="/resultados",
    tags=["Resultados"],
)


@router.post(
    "/",
    status_code=201,
)
def guardar_resultado(
    datos_resultado: ResultadoCreate,
    db: DbSession,
) -> ResultadoResponse:
    return crud.crear_resultado(
        db,
        datos_resultado,
    )


@router.get("/")
def obtener_resultados(
    db: DbSession,
) -> list[ResultadoResponse]:
    return crud.listar_resultados(db)


@router.get("/detallados")
def obtener_resultados_detallados(
    db: DbSession,
) -> list[ResultadoDetalleResponse]:
    return crud.listar_resultados_detallados(db)