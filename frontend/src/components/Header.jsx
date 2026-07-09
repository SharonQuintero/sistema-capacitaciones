import { useAuth } from "../context/AuthContext";

function Header() {
  const { usuarioActual, cerrarSesion } = useAuth();

  const nombreUsuario = usuarioActual?.nombre ?? "Usuario";
  const rolUsuario = usuarioActual?.rol ?? "Sin rol";

  return (
    <header className="header-universidad">
      <div className="header-contenido">
        <div className="marca-universidad">
          <div className="logo-universidad">🎓</div>

          <div>
            <p className="nombre-institucion">
              Proyecto Académico de Gestión Empresarial
            </p>

            <h1>Sistema de Gestión de Capacitaciones</h1>

            <p className="subtitulo-header">
              Plataforma para apoyar la formación de nuevos colaboradores y
              facilitar procesos de contratación.
            </p>
          </div>
        </div>

        <div className="usuario-header">
          <p className="usuario-nombre">{nombreUsuario}</p>
          <p className="usuario-rol">{rolUsuario}</p>

          <button
            type="button"
            className="btn-cerrar-sesion"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;