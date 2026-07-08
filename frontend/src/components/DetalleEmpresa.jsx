function DetalleEmpresa({ empresa }) {
  return (
    <>
      <h2>{empresa.nombre}</h2>

      <p>
        <strong>Sector:</strong> {empresa.sector}
      </p>

      <p>
        <strong>Empleados:</strong> {empresa.cantidad_empleados}
      </p>

      <p>
        <strong>Horas:</strong> {empresa.horas_capacitacion}
      </p>

      <h3>Necesidades</h3>
      {empresa.necesidades.map((necesidad) => (
        <p key={necesidad.id}>• {necesidad.descripcion}</p>
      ))}

      <h3>Capacitaciones sugeridas</h3>
      {empresa.capacitaciones.map((capacitacion) => (
        <article key={capacitacion.id}>
          <p>
            <strong>Capacitación:</strong> {capacitacion.descripcion}
          </p>

          <p>
            <strong>Método:</strong> {capacitacion.metodo}
          </p>
        </article>
      ))}
    </>
  );
}

export default DetalleEmpresa;