import EmpresaCard from "./EmpresaCard";

function EmpresasGrid({ empresas, onVerDetalle }) {
  return (
    <section className="empresas-panel">
      <div className="seccion-titulo">
        <p>Empresas registradas</p>
        <h2>Selecciona una empresa para consultar su plan</h2>
      </div>

      <div className="empresas-grid">
        {empresas.map((empresa) => (
          <EmpresaCard
            key={empresa.id}
            empresa={empresa}
            onVerDetalle={onVerDetalle}
          />
        ))}
      </div>
    </section>
  );
}

export default EmpresasGrid;