function DashboardCard({ icono, titulo, valor, claseColor }) {
  return (
    <article className={`dashboard-card ${claseColor}`}>
      <div className="dashboard-icono">{icono}</div>

      <div className="dashboard-contenido">
        <p className="dashboard-titulo">{titulo}</p>
        <h2>{valor}</h2>
      </div>
    </article>
  );
}

export default DashboardCard;