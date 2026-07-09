import { useState } from "react";

const preguntas = [
  {
    id: 1,
    texto: "¿Cuál es el objetivo principal de la inducción laboral?",
    opciones: [
      "Acelerar la contratación sin capacitación",
      "Preparar al nuevo colaborador para desempeñar mejor su trabajo",
      "Evitar explicar las normas de la empresa",
      "Reemplazar la supervisión del jefe",
    ],
    respuestaCorrecta:
      "Preparar al nuevo colaborador para desempeñar mejor su trabajo",
  },
  {
    id: 2,
    texto: "¿Qué debe conocer primero un nuevo colaborador?",
    opciones: [
      "Las normas básicas de la empresa",
      "Los problemas personales de sus compañeros",
      "Los horarios de vacaciones",
      "Los datos privados de otros empleados",
    ],
    respuestaCorrecta: "Las normas básicas de la empresa",
  },
  {
    id: 3,
    texto: "¿Qué ayuda a capacitar más rápido a un empleado nuevo?",
    opciones: [
      "No darle instrucciones",
      "Asignarle tareas sin explicación",
      "Guiarlo paso a paso en el trabajo real",
      "Evitar resolver sus dudas",
    ],
    respuestaCorrecta: "Guiarlo paso a paso en el trabajo real",
  },
];

function Capacitacion({ onFinalizar }) {
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);

  const cuestionarioFinalizado = resultado !== null;

  function seleccionarRespuesta(preguntaId, opcion) {
    if (cuestionarioFinalizado) {
      return;
    }

    setRespuestas({
      ...respuestas,
      [preguntaId]: opcion,
    });
  }

  function calcularResultado() {
    const correctas = preguntas.filter(
      (pregunta) => respuestas[pregunta.id] === pregunta.respuestaCorrecta,
    ).length;

    const porcentaje = Math.round((correctas / preguntas.length) * 100);
    const aprobado = porcentaje >= 70;

    setResultado({
      correctas,
      porcentaje,
      aprobado,
    });

    if (aprobado) {
      onFinalizar();
    }
  }

  return (
    <section className="capacitacion">
      <h2>Capacitación: Inducción al puesto de trabajo</h2>

      <p>
        Esta capacitación ayuda a preparar al nuevo colaborador para integrarse
        más rápido a la empresa, comprender sus responsabilidades y facilitar el
        proceso de contratación.
      </p>

      <h3>Contenido</h3>

      <ul>
        <li>Normas básicas de la empresa.</li>
        <li>Responsabilidades del nuevo colaborador.</li>
        <li>Importancia de la capacitación inicial.</li>
        <li>Seguimiento del avance del proceso.</li>
      </ul>

      <h3>Cuestionario</h3>

      {preguntas.map((pregunta) => (
        <article key={pregunta.id} className="pregunta">
          <h4>{pregunta.texto}</h4>

          {pregunta.opciones.map((opcion) => (
            <label key={opcion} className="opcion">
              <input
                type="radio"
                name={`pregunta-${pregunta.id}`}
                value={opcion}
                disabled={cuestionarioFinalizado}
                onChange={() => seleccionarRespuesta(pregunta.id, opcion)}
              />
              {opcion}
            </label>
          ))}
        </article>
      ))}

      {!cuestionarioFinalizado && (
        <button type="button" onClick={calcularResultado}>
          Finalizar cuestionario
        </button>
      )}

      {resultado && (
        <div
          className={
            resultado.aprobado
              ? "resultado resultado-aprobado"
              : "resultado resultado-no-aprobado"
          }
        >
          <h3>
            {resultado.aprobado
              ? "¡Felicitaciones! Has aprobado la capacitación."
              : "Debes repasar el contenido e intentarlo nuevamente."}
          </h3>

          <p>
            <strong>Correctas:</strong> {resultado.correctas} de{" "}
            {preguntas.length}
          </p>

          <p>
            <strong>Calificación:</strong> {resultado.porcentaje} %
          </p>

          <p>
            <strong>Estado:</strong>{" "}
            {resultado.aprobado ? "APROBADO" : "NO APROBADO"}
          </p>
        </div>
      )}
    </section>
  );
}

export default Capacitacion;