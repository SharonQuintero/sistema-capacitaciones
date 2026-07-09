function EmpresaCard({ empresa, onVerDetalle }) {
  return (
    <article className="empresa-card">
      <div className="empresa-card-icono">🏢</div>

      <div className="empresa-card-contenido">
        <h3>{empresa.nombre}</h3>

        <p>
          <strong>Empleados:</strong> {empresa.cantidad_empleados}
        </p>

        <p>
          <strong>Horas:</strong> {empresa.horas_capacitacion}
        </p>

        <button
          type="button"
          className="btn-ver-detalle"
          onClick={() => onVerDetalle(empresa.id)}
        >
          Ver información
        </button>
      </div>
    </article>
  );
}

export default EmpresaCard;