from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.schemas import ResultadoCreate, ResultadoResponse


DbSession = Annotated[Session, Depends(get_db)]

router = APIRouter(
    prefix="/resultados",
    tags=["Resultados"],
)


@router.post(
    "/",
    response_model=ResultadoResponse,
)
def guardar_resultado(
    datos_resultado: ResultadoCreate,
    db: DbSession,
):
    return crud.crear_resultado(db, datos_resultado)


@router.get(
    "/",
    response_model=list[ResultadoResponse],
)
def obtener_resultados(db: DbSession):
    return crud.listar_resultados(db)