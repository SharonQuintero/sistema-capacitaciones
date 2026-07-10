from pydantic import BaseModel


# ==========================
# NECESIDADES
# ==========================

class NecesidadResponse(BaseModel):
    id: int
    descripcion: str

    class Config:
        from_attributes = True


# ==========================
# CAPACITACIONES
# ==========================

class CapacitacionResponse(BaseModel):
    id: int
    descripcion: str
    metodo: str | None = None

    class Config:
        from_attributes = True


# ==========================
# EMPRESAS
# ==========================

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


# ==========================
# USUARIOS
# ==========================

class UsuarioCreate(BaseModel):
    nombre: str
    correo: str
    usuario: str
    contrasena: str
    rol: str


class UsuarioLogin(BaseModel):
    usuario: str
    contrasena: str


class UsuarioResponse(BaseModel):
    id: int
    nombre: str
    correo: str
    usuario: str
    rol: str

    class Config:
        from_attributes = True
        
class ResultadoCreate(BaseModel):
    usuario_id: int
    empresa_id: int | None = None
    porcentaje: int
    aprobado: str
    fecha: str


class ResultadoResponse(ResultadoCreate):
    id: int

    class Config:
        from_attributes = True