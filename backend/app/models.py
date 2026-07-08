from sqlalchemy import Column, Integer, String, Text, ForeignKey
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