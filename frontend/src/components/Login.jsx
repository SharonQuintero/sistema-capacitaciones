import { useState } from "react";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function iniciarSesion(event) {
    event.preventDefault();
    setMensajeError("");
    setCargando(true);

    try {
      const respuesta = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contrasena }),
      });

      if (!respuesta.ok) {
        setMensajeError("Usuario o contraseña incorrectos.");
        return;
      }

      const datosUsuario = await respuesta.json();
      onLogin(datosUsuario);
    } catch {
      setMensajeError("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Sistema de Capacitaciones</h1>
        <p>Inicia sesión para acceder a las capacitaciones y cuestionarios.</p>

        <form onSubmit={iniciarSesion}>
          <label htmlFor="usuario">Usuario</label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
            required
          />

          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
            required
          />

          {mensajeError && <p className="error-login">{mensajeError}</p>}

          <button type="submit" disabled={cargando}>
            {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;