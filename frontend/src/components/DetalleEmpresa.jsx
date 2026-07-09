function DetalleEmpresa({ empresa }) {
  return (
    <section className="detalle-empresa">
      <div className="seccion-titulo">
        <p>Información empresarial</p>
        <h2>{empresa.nombre}</h2>
      </div>

      <div className="detalle-grid">
        <article className="detalle-card">
          <span>🏭</span>
          <p>Sector económico</p>
          <strong>{empresa.sector}</strong>
        </article>

        <article className="detalle-card">
          <span>👥</span>
          <p>Empleados</p>
          <strong>{empresa.cantidad_empleados}</strong>
        </article>

        <article className="detalle-card">
          <span>⏱️</span>
          <p>Horas de capacitación</p>
          <strong>{empresa.horas_capacitacion}</strong>
        </article>
      </div>

      <div className="info-doble">
        <article className="info-panel">
          <h3>Necesidades identificadas</h3>

          {empresa.necesidades.map((necesidad) => (
            <p key={necesidad.id} className="item-lista">
              ✔ {necesidad.descripcion}
            </p>
          ))}
        </article>

        <article className="info-panel">
          <h3>Capacitaciones sugeridas</h3>

          {empresa.capacitaciones.map((capacitacion) => (
            <div key={capacitacion.id} className="capacitacion-item">
              <p>
                <strong>Capacitación:</strong> {capacitacion.descripcion}
              </p>

              <p>
                <strong>Método:</strong> {capacitacion.metodo}
              </p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

export default DetalleEmpresa;