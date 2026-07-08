import pandas as pd

from app.database import SessionLocal
from app.models import Empresa, Necesidad, Capacitacion


RUTA_EXCEL = "data/empresas.xlsx"


def limpiar(valor):
    if pd.isna(valor):
        return ""
    return str(valor).strip()


def convertir_horas(valor):
    try:
        if pd.isna(valor):
            return 0
        return int(float(valor))
    except Exception:
     return 0


def importar_empresas():
    db = SessionLocal()

    importadas = 0
    duplicadas = 0
    errores = 0

    try:
        df = pd.read_excel(RUTA_EXCEL)

        for indice, fila in df.iterrows():
            try:
                nombre = limpiar(fila["NOMBRE DE LA EMPRESA"])

                if not nombre:
                    errores += 1
                    continue

                empresa_existente = db.query(Empresa).filter(
                    Empresa.nombre == nombre
                ).first()

                if empresa_existente:
                    duplicadas += 1
                    continue

                empresa = Empresa(
                    nombre=nombre,
                    cantidad_empleados=limpiar(fila["Cantidad de empleados"]),
                    sector=limpiar(fila["SECTOR ECONÓMICO"]),
                    horas_capacitacion=convertir_horas(
                        fila["¿Cuanto tiempo  en horas establece la empresa para capacitar empleados durante un año?"]
                    )
                )

                db.add(empresa)
                db.commit()
                db.refresh(empresa)

                necesidad = Necesidad(
                    empresa_id=empresa.id,
                    descripcion=limpiar(
                        fila["¿Qué temas o habilidades espera que un trabajador tenga previo a su primer empleo?"]
                    )
                )

                capacitacion = Capacitacion(
                    empresa_id=empresa.id,
                    descripcion=limpiar(
                        fila["¿En qué temas o habilidades se capacita a los empleados nuevos en su organización?  "]
                    ),
                    metodo=limpiar(
                        fila["¿Qué medio, estrategia o herramienta utiliza para capacitar a un empleado?"]
                    )
                )

                db.add(necesidad)
                db.add(capacitacion)
                db.commit()

                importadas += 1

            except Exception as e:
                errores += 1
                print(f"Error en fila {indice + 2}: {e}")

        print("Importación finalizada")
        print(f"Empresas importadas: {importadas}")
        print(f"Empresas duplicadas: {duplicadas}")
        print(f"Filas con errores: {errores}")

    finally:
        db.close()


if __name__ == "__main__":
    importar_empresas()