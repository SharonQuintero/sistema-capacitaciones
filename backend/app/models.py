from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Empresa(Base):
    __tablename__ = "empresas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(200), nullable=False)
    cantidad_empleados = Column(String(100))
    sector = Column(Text)
    horas_capacitacion = Column(Integer)

    necesidades = relationship("Necesidad", back_populates="empresa")
    capacitaciones = relationship("Capacitacion", back_populates="empresa")


class Necesidad(Base):
    __tablename__ = "necesidades"

    id = Column(Integer, primary_key=True, index=True)
    empresa_id = Column(Integer, ForeignKey("empresas.id"))
    descripcion = Column(Text, nullable=False)

    empresa = relationship("Empresa", back_populates="necesidades")


class Capacitacion(Base):
    __tablename__ = "capacitaciones"

    id = Column(Integer, primary_key=True, index=True)
    empresa_id = Column(Integer, ForeignKey("empresas.id"))
    descripcion = Column(Text, nullable=False)
    metodo = Column(Text)

    empresa = relationship("Empresa", back_populates="capacitaciones")


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    correo = Column(String(150), unique=True, nullable=False)
    usuario = Column(String(80), unique=True, nullable=False)
    contrasena = Column(String(150), nullable=False)
    rol = Column(String(50), nullable=False)


class ResultadoCapacitacion(Base):
    __tablename__ = "resultados_capacitacion"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, nullable=False)
    empresa_id = Column(Integer, nullable=True)
    porcentaje = Column(Integer, nullable=False)
    aprobado = Column(String(20), nullable=False)
    fecha = Column(String(50), nullable=False)