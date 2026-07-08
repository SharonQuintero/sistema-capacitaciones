import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SelectorEmpresa from "./components/SelectorEmpresa";
import DetalleEmpresa from "./components/DetalleEmpresa";
import PlanCapacitacion from "./components/PlanCapacitacion";

function App() {
  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [mostrarPlan, setMostrarPlan] = useState(false);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/empresas/")
      .then((response) => response.json())
      .then((data) => {
        setEmpresas(data);
      })
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
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <main>
      <Header />

      <SelectorEmpresa
        empresas={empresas}
        onSeleccionarEmpresa={verDetalleEmpresa}
      />

      {empresaSeleccionada && (
        <section>
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

export default App;