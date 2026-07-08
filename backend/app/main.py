from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
import app.models

from app.routers import empresas

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Gestión de Capacitaciones",
    version="1.0.0"
)

# Permitir conexión con React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(empresas.router)


@app.get("/")
def inicio():
    return {
        "mensaje": "Bienvenido al Sistema de Gestión de Capacitaciones"
    }