import { useEffect, useRef, useState } from "react";

import DashboardCard from "./DashboardCard";
import DetalleEmpresa from "./DetalleEmpresa";
import EmpresasGrid from "./EmpresasGrid";
import Footer from "./Footer";
import Header from "./Header";
import PlanCapacitacion from "./PlanCapacitacion";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { usuarioActual } = useAuth();

  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [mostrarPlan, setMostrarPlan] = useState(false);
  const [progreso, setProgreso] = useState(0);

  const detalleRef = useRef(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/empresas/")
      .then((response) => response.json())
      .then((data) => setEmpresas(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function verDetalleEmpresa(id) {
    if (!id) {
      setEmpresaSeleccionada(null);
      return;
    }

    setMostrarPlan(false);
    setProgreso(0);

    fetch(`http://127.0.0.1:8000/empresas/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmpresaSeleccionada(data);

        window.requestAnimationFrame(() => {
          detalleRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <main>
      <Header />

      <section className="dashboard-resumen">
        <DashboardCard
          icono="🏢"
          titulo="Empresas"
          valor={empresas.length}
          claseColor="card-azul"
        />

        <DashboardCard
          icono="📚"
          titulo="Capacitación"
          valor={progreso === 100 ? "Finalizada" : "Activa"}
          claseColor="card-verde"
        />

        <DashboardCard
          icono="📈"
          titulo="Avance"
          valor={`${progreso}%`}
          claseColor="card-naranja"
        />

        <DashboardCard
          icono="👤"
          titulo="Usuario"
          valor={usuarioActual.nombre}
          claseColor="card-morado"
        />
      </section>

      <EmpresasGrid empresas={empresas} onVerDetalle={verDetalleEmpresa} />

      {empresaSeleccionada && (
        <section ref={detalleRef}>
          <DetalleEmpresa empresa={empresaSeleccionada} />

          <PlanCapacitacion
            progreso={progreso}
            setProgreso={setProgreso}
            mostrarPlan={mostrarPlan}
            setMostrarPlan={setMostrarPlan}
          />
        </section>
      )}

      <Footer />
    </main>
  );
}

export default AdminDashboard;