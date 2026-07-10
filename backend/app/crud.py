from sqlalchemy.orm import Session

from app.models import Usuario
from app.schemas import UsuarioCreate


def obtener_usuario_por_nombre(
    db: Session,
    nombre_usuario: str,
) -> Usuario | None:
    return (
        db.query(Usuario)
        .filter(Usuario.usuario == nombre_usuario)
        .first()
    )


def crear_usuario(
    db: Session,
    datos_usuario: UsuarioCreate,
) -> Usuario:
    nuevo_usuario = Usuario(
        nombre=datos_usuario.nombre,
        correo=datos_usuario.correo,
        usuario=datos_usuario.usuario,
        contrasena=datos_usuario.contrasena,
        rol=datos_usuario.rol,
    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)

    return nuevo_usuario

from app.models import ResultadoCapacitacion
from app.schemas import ResultadoCreate


def crear_resultado(
    db: Session,
    datos_resultado: ResultadoCreate,
) -> ResultadoCapacitacion:
    nuevo_resultado = ResultadoCapacitacion(
        usuario_id=datos_resultado.usuario_id,
        empresa_id=datos_resultado.empresa_id,
        porcentaje=datos_resultado.porcentaje,
        aprobado=datos_resultado.aprobado,
        fecha=datos_resultado.fecha,
    )

    db.add(nuevo_resultado)
    db.commit()
    db.refresh(nuevo_resultado)

    return nuevo_resultado


def listar_resultados(db: Session) -> list[ResultadoCapacitacion]:
    return db.query(ResultadoCapacitacion).all()