from pydantic import BaseModel, ConfigDict, Field


# ==========================
# NECESIDADES
# ==========================

class NecesidadResponse(BaseModel):
    id: int
    descripcion: str

    model_config = ConfigDict(from_attributes=True)


# ==========================
# CAPACITACIONES
# ==========================

class CapacitacionResponse(BaseModel):
    id: int
    descripcion: str
    metodo: str | None = None

    model_config = ConfigDict(from_attributes=True)


# ==========================
# EMPRESAS
# ==========================

class EmpresaResponse(BaseModel):
    id: int
    nombre: str
    cantidad_empleados: str | None = None
    sector: str | None = None
    horas_capacitacion: int | None = None

    model_config = ConfigDict(from_attributes=True)


class EmpresaDetalleResponse(EmpresaResponse):
    necesidades: list[NecesidadResponse] = Field(default_factory=list)
    capacitaciones: list[CapacitacionResponse] = Field(default_factory=list)


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

    model_config = ConfigDict(from_attributes=True)


# ==========================
# RESULTADOS DE CAPACITACION
# ==========================

class ResultadoCreate(BaseModel):
    usuario_id: int
    empresa_id: int | None = None
    porcentaje: int
    aprobado: str
    fecha: str


class ResultadoResponse(ResultadoCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)


class ResultadoDetalleResponse(BaseModel):
    id: int
    usuario_nombre: str
    empresa_nombre: str | None = None
    porcentaje: int
    aprobado: str
    fecha: str

    model_config = ConfigDict(from_attributes=True)