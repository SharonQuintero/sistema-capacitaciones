from pydantic import BaseModel


class NecesidadResponse(BaseModel):
    id: int
    descripcion: str

    class Config:
        from_attributes = True


class CapacitacionResponse(BaseModel):
    id: int
    descripcion: str
    metodo: str | None = None

    class Config:
        from_attributes = True


class EmpresaResponse(BaseModel):
    id: int
    nombre: str
    cantidad_empleados: str | None = None
    sector: str | None = None
    horas_capacitacion: int | None = None

    class Config:
        from_attributes = True


class EmpresaDetalleResponse(EmpresaResponse):
    necesidades: list[NecesidadResponse] = []
    capacitaciones: list[CapacitacionResponse] = []