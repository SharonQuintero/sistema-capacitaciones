import Footer from "./Footer";
import Header from "./Header";
import PlanCapacitacion from "./PlanCapacitacion";

function EmpleadoDashboard() {
  return (
    <main>
      <Header />

      <section className="dashboard-resumen">
        <article className="dashboard-card card-verde">
          <div className="dashboard-icono">📚</div>
          <div className="dashboard-contenido">
            <p className="dashboard-titulo">Capacitación asignada</p>
            <h2>Inducción</h2>
          </div>
        </article>

        <article className="dashboard-card card-naranja">
          <div className="dashboard-icono">📈</div>
          <div className="dashboard-contenido">
            <p className="dashboard-titulo">Avance</p>
            <h2>0%</h2>
          </div>
        </article>
      </section>

      <section>
        <h2>Mi capacitación</h2>
        <p>
          Desde este módulo podrás realizar la capacitación asignada y responder
          el cuestionario correspondiente.
        </p>

        <PlanCapacitacion
          progreso={0}
          setProgreso={() => {}}
          mostrarPlan
          setMostrarPlan={() => {}}
        />
      </section>

      <Footer />
    </main>
  );
}

export default EmpleadoDashboard;