from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Empresa
from app.schemas import EmpresaResponse, EmpresaDetalleResponse


router = APIRouter(
    prefix="/empresas",
    tags=["Empresas"]
)


@router.get(
    "/",
    response_model=List[EmpresaResponse],
    summary="Listar empresas"
)
def listar_empresas(
    db: Annotated[Session, Depends(get_db)]
):
    return db.query(Empresa).all()


@router.get(
    "/{empresa_id}",
    summary="Obtener empresa por ID",
    responses={404: {"description": "Empresa no encontrada"}}
)
def obtener_empresa(
    empresa_id: int,
    db: Annotated[Session, Depends(get_db)]
):
    empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()

    if empresa is None:
        raise HTTPException(
            status_code=404,
            detail="Empresa no encontrada"
        )

    return {
        "id": empresa.id,
        "nombre": empresa.nombre,
        "cantidad_empleados": empresa.cantidad_empleados,
        "sector": empresa.sector,
        "horas_capacitacion": empresa.horas_capacitacion,
        "necesidades": [
            {
                "id": necesidad.id,
                "descripcion": necesidad.descripcion
            }
            for necesidad in empresa.necesidades
        ],
        "capacitaciones": [
            {
                "id": capacitacion.id,
                "descripcion": capacitacion.descripcion,
                "metodo": capacitacion.metodo
            }
            for capacitacion in empresa.capacitaciones
        ]
    }