import { useEffect, useRef, useState } from "react";

import DashboardCard from "./DashboardCard";
import DetalleEmpresa from "./DetalleEmpresa";
import EmpresasGrid from "./EmpresasGrid";
import Footer from "./Footer";
import Header from "./Header";
import ResultadosAdmin from "./ResultadosAdmin";
import { useAuth } from "../context/AuthContext";

const API_EMPRESAS = "http://127.0.0.1:8000/empresas/";

function AdminDashboard() {
  const { usuarioActual } = useAuth();

  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [mensajeError, setMensajeError] = useState("");

  const detalleRef = useRef(null);

  useEffect(() => {
    async function cargarEmpresas() {
      try {
        const respuesta = await fetch(API_EMPRESAS);

        if (!respuesta.ok) {
          setMensajeError("No se pudieron cargar las empresas.");
          return;
        }

        const datos = await respuesta.json();
        setEmpresas(datos);
      } catch {
        setMensajeError("No se pudo conectar con el servidor.");
      }
    }

    cargarEmpresas();
  }, []);

  async function verDetalleEmpresa(id) {
    if (!id) {
      setEmpresaSeleccionada(null);
      return;
    }

    setMensajeError("");

    try {
      const respuesta = await fetch(`${API_EMPRESAS}${id}`);

      if (!respuesta.ok) {
        setMensajeError("No se pudo cargar la información de la empresa.");
        return;
      }

      const datos = await respuesta.json();
      setEmpresaSeleccionada(datos);

      window.requestAnimationFrame(() => {
        detalleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    } catch {
      setMensajeError("No se pudo conectar con el servidor.");
    }
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
          icono="📊"
          titulo="Resultados"
          valor="Seguimiento"
          claseColor="card-verde"
        />

        <DashboardCard
          icono="👤"
          titulo="Usuario"
          valor={usuarioActual?.nombre ?? "Administrador"}
          claseColor="card-morado"
        />
      </section>

      {mensajeError && (
        <p className="resultado resultado-no-aprobado" role="alert">
          {mensajeError}
        </p>
      )}

      <EmpresasGrid
        empresas={empresas}
        onVerDetalle={verDetalleEmpresa}
      />

      {empresaSeleccionada && (
        <section ref={detalleRef}>
          <DetalleEmpresa empresa={empresaSeleccionada} />
        </section>
      )}

      <ResultadosAdmin />

      <Footer />
    </main>
  );
}

export default AdminDashboard;