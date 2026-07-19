import { useEffect, useState } from "react";

const API_RESULTADOS = "http://127.0.0.1:8000/resultados/";

function ResultadosAdmin() {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    async function cargarResultados() {
      try {
        const respuesta = await fetch(API_RESULTADOS);

        if (!respuesta.ok) {
          setMensajeError("No se pudieron cargar los resultados.");
          return;
        }

        const datos = await respuesta.json();
        setResultados(datos);
      } catch {
        setMensajeError("No se pudo conectar con el servidor.");
      } finally {
        setCargando(false);
      }
    }

    cargarResultados();
  }, []);

  if (cargando) {
    return <p>Cargando resultados...</p>;
  }

  return (
    <section className="resultados-admin">
      <h2>Resultados de capacitaciones</h2>

      {mensajeError && (
        <p className="resultado resultado-no-aprobado" role="alert">
          {mensajeError}
        </p>
      )}

      {!mensajeError && resultados.length === 0 && (
        <p>Aún no hay resultados registrados.</p>
      )}

      {resultados.length > 0 && (
        <div className="tabla-contenedor">
          <table className="tabla-resultados">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Empresa</th>
                <th>Porcentaje</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {resultados.map((resultado) => (
                <tr key={resultado.id}>
                  <td>{resultado.usuario_id}</td>
                  <td>{resultado.empresa_id ?? "Sin empresa"}</td>
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