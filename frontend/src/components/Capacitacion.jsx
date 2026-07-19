import { useState } from "react";

import { useAuth } from "../context/AuthContext";

const API_RESULTADOS = "http://127.0.0.1:8000/resultados/";
const TOTAL_PREGUNTAS = 10;

const preguntas = [
  {
    id: 1,
    texto:
      "¿Por qué te interesa trabajar específicamente en nuestra empresa y en este puesto?",
    opciones: [
      {
        letra: "A",
        texto:
          "Porque me queda cerca de casa, el horario se acomoda a mi rutina y actualmente me encuentro desempleado.",
      },
      {
        letra: "B",
        texto:
          "He seguido su trayectoria y me identifica su enfoque en la innovación. Creo que mi experiencia puede aportar a sus objetivos actuales y veo este puesto como el espacio ideal para crecer aportando valor.",
      },
      {
        letra: "C",
        texto:
          "Me enteré de que pagan a tiempo, tienen excelentes beneficios para los empleados y la oficina se ve muy cómoda.",
      },
      {
        letra: "D",
        texto:
          "No conozco mucho de la empresa, pero cumplo con todos los requisitos del perfil que publicaron en la oferta.",
      },
    ],
  },
  {
    id: 2,
    texto:
      "Si cometieras un error que retrasa la entrega de un proyecto, ¿cuál sería tu reacción inmediata?",
    opciones: [
      {
        letra: "A",
        texto:
          "Buscar qué compañero o factor externo influyó en el error para poder explicar que no fue del todo mi culpa.",
      },
      {
        letra: "B",
        texto:
          "Trabajar el doble en silencio para corregirlo antes de que mi supervisor se dé cuenta del retraso.",
      },
      {
        letra: "C",
        texto:
          "Asumir la responsabilidad, notificar de inmediato a mi supervisor presentando una propuesta de solución y documentar el caso para evitar que se repita.",
      },
      {
        letra: "D",
        texto:
          "Esperar a la reunión de revisión para ver si el supervisor nota el retraso y, si lo hace, pedir disculpas.",
      },
    ],
  },
  {
    id: 3,
    texto:
      "Si identificas una falla en un proceso de la empresa que no corresponde a tu área, ¿qué acción tomarías?",
    opciones: [
      {
        letra: "A",
        texto:
          "Analizar el impacto del problema, estructurar una propuesta de mejora y presentársela formalmente a mi supervisor para evaluar si se puede implementar.",
      },
      {
        letra: "B",
        texto:
          "Dejarlo pasar, ya que intervenir en procesos de otros departamentos puede causar conflictos con los compañeros.",
      },
      {
        letra: "C",
        texto:
          "Comentar el error con mis compañeros de equipo para que estemos advertidos de que esa área trabaja mal.",
      },
      {
        letra: "D",
        texto:
          "Modificar el proceso por mi cuenta de manera inmediata para solucionar la falla lo antes posible.",
      },
    ],
  },
  {
    id: 4,
    texto:
      "¿Cómo manejas las diferencias de opinión cuando trabajas en equipo para un proyecto?",
    opciones: [
      {
        letra: "A",
        texto:
          "Defiendo mi postura con firmeza, ya que confío plenamente en mi experiencia profesional y técnica.",
      },
      {
        letra: "B",
        texto:
          "Cedo ante la opinión de la mayoría para evitar discusiones y mantener un ambiente de trabajo tranquilo.",
      },
      {
        letra: "C",
        texto:
          "Escucho activamente a los demás, busco puntos en común y propongo evaluar las opciones basándonos en datos u objetivos del proyecto, no en opiniones personales.",
      },
      {
        letra: "D",
        texto:
          "Le pido al supervisor directo que intervenga de inmediato y decida cuál es la mejor opción para no perder tiempo.",
      },
    ],
  },
  {
    id: 5,
    texto:
      "¿Cómo actúas cuando cambian las prioridades de un proyecto de un momento a otro debido a exigencias del mercado o del cliente?",
    opciones: [
      {
        letra: "A",
        texto:
          "Expreso mi inconformidad por el tiempo perdido, pero realizo el nuevo trabajo bajo protesta.",
      },
      {
        letra: "B",
        texto:
          "Detengo las tareas afectadas, reevalúo el nuevo escenario junto al equipo, priorizo las actividades críticas y ajusto el plan de trabajo.",
      },
      {
        letra: "C",
        texto:
          "Sigo trabajando en el plan original hasta terminarlo y luego evalúo cómo incorporar los nuevos cambios.",
      },
      {
        letra: "D",
        texto:
          "Solicito una reunión urgente para convencer al cliente o a los directivos de que cambiar de estrategia a mitad de camino es un error.",
      },
    ],
  },
  {
    id: 6,
    texto:
      "Cuando tienes múltiples tareas urgentes y el tiempo es limitado, ¿cómo organizas tu jornada?",
    opciones: [
      {
        letra: "A",
        texto:
          "Hago un poco de cada tarea a la vez para avanzar con todo al mismo tiempo.",
      },
      {
        letra: "B",
        texto:
          "Empiezo por las tareas más fáciles y rápidas para ir saliendo de pendientes, sin importar el impacto.",
      },
      {
        letra: "C",
        texto:
          "Trabajo bajo presión haciendo lo primero que me piden mis compañeros en el transcurso del día.",
      },
      {
        letra: "D",
        texto:
          "Clasifico las tareas según su impacto y urgencia, planifico el orden de entrega y, si el tiempo es insuficiente, lo comunico preventivamente a mi líder para alinear expectativas.",
      },
    ],
  },
  {
    id: 7,
    texto:
      "Al hablar de tus debilidades u oportunidades de mejora en una entrevista, ¿cuál es el enfoque correcto?",
    opciones: [
      {
        letra: "A",
        texto:
          "Decir que soy demasiado perfeccionista o muy adicto al trabajo para quedar bien.",
      },
      {
        letra: "B",
        texto:
          "Mencionar una debilidad técnica o de hábito real, explicando las acciones concretas que estoy ejecutando actualmente para corregirla.",
      },
      {
        letra: "C",
        texto:
          "Afirmar que no poseo debilidades profesionales significativas gracias a mi sólida formación.",
      },
      {
        letra: "D",
        texto:
          "Confesar un defecto personal grave que afecte directamente las tareas principales del puesto.",
      },
    ],
  },
  {
    id: 8,
    texto: "¿Dónde te ves profesionalmente en los próximos 3 a 5 años?",
    opciones: [
      {
        letra: "A",
        texto:
          "En este mismo puesto, haciendo exactamente las mismas funciones con total comodidad y sin presiones.",
      },
      {
        letra: "B",
        texto:
          "Emprendiendo mi propio negocio en un sector similar, utilizando los conocimientos que adquiera aquí.",
      },
      {
        letra: "C",
        texto:
          "Consolidado en el área, habiendo liderado proyectos exitosos y listo para asumir mayores responsabilidades o roles de coordinación dentro de la empresa.",
      },
      {
        letra: "D",
        texto:
          "No lo sé, prefiero vivir el día a día y ver qué oportunidades van surgiendo en el camino.",
      },
    ],
  },
  {
    id: 9,
    texto:
      "¿Cómo manejas una situación en la que, a pesar de tu esfuerzo, el resultado de una propuesta o proyecto es rechazado?",
    opciones: [
      {
        letra: "A",
        texto:
          "Me desmotivo y disminuyo mi ritmo de trabajo, ya que siento que mi esfuerzo no es valorado.",
      },
      {
        letra: "B",
        texto:
          "Acepto el resultado con madurez, solicito retroalimentación específica para entender qué falló y uso la experiencia como aprendizaje para ajustar la estrategia en el siguiente intento.",
      },
      {
        letra: "C",
        texto:
          "Intento convencer insistentemente a los evaluadores de que su decisión está equivocada y que mi proyecto es el correcto.",
      },
      {
        letra: "D",
        texto:
          "Solicito que otra persona se haga cargo del proyecto de ahí en adelante para evitar más frustraciones.",
      },
    ],
  },
  {
    id: 10,
    texto:
      "Cuando el entrevistador te pregunta al final: ¿Tienes alguna pregunta para mí?, ¿cuál es la mejor opción?",
    opciones: [
      {
        letra: "A",
        texto:
          "No, muchas gracias, me quedó todo completamente claro.",
      },
      {
        letra: "B",
        texto:
          "¿Cuánto tiempo dan para la hora del almuerzo y qué días se descansa?",
      },
      {
        letra: "C",
        texto:
          "Sí, me gustaría saber: ¿Cuáles son los desafíos más urgentes que la persona que asuma este puesto deberá resolver en los primeros 90 días?",
      },
      {
        letra: "D",
        texto:
          "¿Hay algún problema si llego tarde algunos días de la semana por cuestiones de estudio?",
      },
    ],
  },
];

function obtenerFechaActual() {
  return new Date().toISOString().slice(0, 10);
}

function Capacitacion({ onFinalizar, empresaId = null }) {
  const { usuarioActual } = useAuth();

  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [mensajeGuardado, setMensajeGuardado] = useState("");
  const [mensajeValidacion, setMensajeValidacion] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cuestionarioFinalizado = resultado !== null;

  function seleccionarRespuesta(preguntaId, letra) {
    if (cuestionarioFinalizado) {
      return;
    }

    setRespuestas((respuestasAnteriores) => ({
      ...respuestasAnteriores,
      [preguntaId]: letra,
    }));

    setMensajeValidacion("");
  }

  async function guardarResultado(porcentaje) {
    if (!usuarioActual?.id) {
      setMensajeGuardado("No se encontró el usuario autenticado.");
      return false;
    }

    setGuardando(true);

    try {
      const respuesta = await fetch(API_RESULTADOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: usuarioActual.id,
          empresa_id: empresaId,
          porcentaje,
          aprobado: "APROBADO",
          fecha: obtenerFechaActual(),
        }),
      });

      if (!respuesta.ok) {
        setMensajeGuardado("El resultado no pudo guardarse.");
        return false;
      }

      setMensajeGuardado("Resultado guardado correctamente.");
      return true;
    } catch {
      setMensajeGuardado("No se pudo conectar con el servidor.");
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function calcularResultado() {
    const cantidadRespondidas = Object.keys(respuestas).length;

    if (cantidadRespondidas < TOTAL_PREGUNTAS) {
      const pendientes = TOTAL_PREGUNTAS - cantidadRespondidas;

      setMensajeValidacion(
        `Debes responder todas las preguntas. Te faltan ${pendientes}.`,
      );

      return;
    }

    const porcentaje = 100;

    setResultado({
      correctas: TOTAL_PREGUNTAS,
      porcentaje,
    });

    await guardarResultado(porcentaje);

    if (typeof onFinalizar === "function") {
      onFinalizar();
    }
  }

  function reiniciarCuestionario() {
    setRespuestas({});
    setResultado(null);
    setMensajeGuardado("");
    setMensajeValidacion("");
    setGuardando(false);

    window.requestAnimationFrame(() => {
      document
        .querySelector(".capacitacion")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  }

  return (
    <section className="capacitacion">
      <h2>Capacitación: Preparación para entrevistas laborales</h2>

      <p>
        Responde las diez preguntas. Todas las opciones son válidas y cada
        respuesta seleccionada cuenta para completar la capacitación.
      </p>

      {preguntas.map((pregunta) => (
        <article key={pregunta.id} className="pregunta">
          <h4>
            {pregunta.id}. {pregunta.texto}
          </h4>

          {pregunta.opciones.map((opcion) => (
            <label
              key={`${pregunta.id}-${opcion.letra}`}
              className="opcion"
            >
              <input
                type="radio"
                name={`pregunta-${pregunta.id}`}
                value={opcion.letra}
                checked={respuestas[pregunta.id] === opcion.letra}
                disabled={cuestionarioFinalizado}
                onChange={() =>
                  seleccionarRespuesta(pregunta.id, opcion.letra)
                }
              />

              <span className="opcion-letra">{opcion.letra})</span>
              <span>{opcion.texto}</span>
            </label>
          ))}
        </article>
      ))}

      {mensajeValidacion && (
        <p className="resultado resultado-no-aprobado" role="alert">
          {mensajeValidacion}
        </p>
      )}

      {!cuestionarioFinalizado && (
        <button
          type="button"
          disabled={guardando}
          onClick={calcularResultado}
        >
          {guardando
            ? "Guardando resultado..."
            : "Finalizar cuestionario"}
        </button>
      )}

      {resultado && (
        <div className="resultado resultado-aprobado">
          <h3>APROBADO</h3>

          <p>
            <strong>Preguntas respondidas:</strong>{" "}
            {resultado.correctas} de {TOTAL_PREGUNTAS}
          </p>

          <p>
            <strong>Porcentaje:</strong> {resultado.porcentaje} %
          </p>

          <p>
            <strong>Usuario:</strong>{" "}
            {usuarioActual?.nombre ?? "Usuario no identificado"}
          </p>

          {mensajeGuardado && <p>{mensajeGuardado}</p>}

          <button
            type="button"
            onClick={reiniciarCuestionario}
          >
            Realizar cuestionario nuevamente
          </button>
        </div>
      )}
    </section>
  );
}

export default Capacitacion;