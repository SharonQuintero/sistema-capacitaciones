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