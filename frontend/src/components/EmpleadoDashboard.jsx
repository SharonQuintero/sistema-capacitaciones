import { useState } from "react";

import DashboardCard from "./DashboardCard";
import Footer from "./Footer";
import Header from "./Header";
import PlanCapacitacion from "./PlanCapacitacion";

function EmpleadoDashboard() {
  const [progreso, setProgreso] = useState(0);
  const [mostrarPlan, setMostrarPlan] = useState(true);

  return (
    <main>
      <Header />

      <section className="dashboard-resumen">
        <DashboardCard
          icono="📚"
          titulo="Capacitación asignada"
          valor={progreso === 100 ? "Finalizada" : "Pendiente"}
          claseColor="card-verde"
        />

        <DashboardCard
          icono="📈"
          titulo="Mi avance"
          valor={`${progreso}%`}
          claseColor="card-naranja"
        />
      </section>

      <section>
        <h2>Mi capacitación</h2>

        <p>
          Desde este módulo podrás realizar la capacitación asignada y responder
          el cuestionario correspondiente.
        </p>

        <PlanCapacitacion
          progreso={progreso}
          setProgreso={setProgreso}
          mostrarPlan={mostrarPlan}
          setMostrarPlan={setMostrarPlan}
        />
      </section>

      <Footer />
    </main>
  );
}

export default EmpleadoDashboard;