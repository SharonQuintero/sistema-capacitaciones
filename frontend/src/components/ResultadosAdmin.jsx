import { useCallback, useEffect, useState } from "react";

const API_RESULTADOS =
  "http://127.0.0.1:8000/resultados/detallados";

function ResultadosAdmin() {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState("");

  const cargarResultados = useCallback(async () => {
    setCargando(true);
    setMensajeError("");

    try {
      const respuesta = await fetch(API_RESULTADOS, {
        cache: "no-store",
      });

      if (!respuesta.ok) {
        setMensajeError("No se pudieron cargar los resultados.");
        return;
      }

      const datos = await respuesta.json();

      const resultadosOrdenados = [...datos].sort(
        (resultadoA, resultadoB) =>
          resultadoB.id - resultadoA.id,
      );

      setResultados(resultadosOrdenados);
    } catch {
      setMensajeError("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarResultados();
  }, [cargarResultados]);

  return (
    <section className="resultados-admin">
      <div className="seccion-titulo">
        <p>Seguimiento</p>
        <h2>Resultados de capacitaciones</h2>
      </div>

      <button
        type="button"
        onClick={cargarResultados}
        disabled={cargando}
      >
        {cargando
          ? "Actualizando..."
          : "Actualizar resultados"}
      </button>

      {mensajeError && (
        <p
          className="resultado resultado-no-aprobado"
          role="alert"
        >
          {mensajeError}
        </p>
      )}

      {!cargando &&
        !mensajeError &&
        resultados.length === 0 && (
          <p>Aún no hay resultados registrados.</p>
        )}

      {!cargando && resultados.length > 0 && (
        <div className="tabla-contenedor">
          <table className="tabla-resultados">
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Empresa</th>
                <th>Porcentaje</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {resultados.map((resultado) => (
                <tr key={resultado.id}>
                  <td>{resultado.usuario_nombre}</td>

                  <td>
                    {resultado.empresa_nombre ??
                      "Sin empresa"}
                  </td>

                  <td>{resultado.porcentaje}%</td>

                  <td>{resultado.aprobado}</td>

                  <td>{resultado.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ResultadosAdmin;