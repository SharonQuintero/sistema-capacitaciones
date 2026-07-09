import Capacitacion from "./Capacitacion";

function PlanCapacitacion({
  progreso,
  setProgreso,
  mostrarPlan,
  setMostrarPlan,
}) {
  function finalizarCapacitacion() {
    setProgreso(100);
  }

  return (
    <>
      <h3>Estado de capacitación</h3>

      <div className="estado">
        <button
          type="button"
          className="pendiente"
          onClick={() => setProgreso(0)}
        >
          Pendiente
        </button>

        <button
          type="button"
          className="proceso"
          onClick={() => setProgreso(50)}
        >
          En capacitación
        </button>

        <button
          type="button"
          className="capacitado"
          onClick={() => setProgreso(100)}
        >
          Capacitado
        </button>
      </div>

      <div className="barra-progreso">
        <div className="avance-progreso" style={{ width: `${progreso}%` }} />
      </div>

      <p>
        <strong>Avance:</strong> {progreso} %
      </p>

      <hr />

      <h3>Recomendación</h3>

      <p>
        Esta empresa puede fortalecer las competencias de sus futuros empleados
        mediante capacitaciones enfocadas en las necesidades identificadas.
      </p>

      <button type="button" onClick={() => setMostrarPlan(!mostrarPlan)}>
        {mostrarPlan
          ? "Ocultar plan de capacitación"
          : "Generar plan de capacitación"}
      </button>

      {mostrarPlan && (
        <div className="plan">
          <h3>Plan básico de capacitación</h3>

          <ul>
            <li>Semana 1: Inducción a la empresa.</li>
            <li>Semana 2: Capacitación según necesidad.</li>
            <li>Semana 3: Práctica guiada en el puesto.</li>
            <li>Semana 4: Evaluación y cierre.</li>
          </ul>

          <Capacitacion onFinalizar={finalizarCapacitacion} />
        </div>
      )}
    </>
  );
}

export default PlanCapacitacion;