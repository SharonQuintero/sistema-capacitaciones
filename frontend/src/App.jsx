import "./App.css";
import "./styles/dashboard.css";
import "./styles/cards.css";

import AdminDashboard from "./components/AdminDashboard";
import EmpleadoDashboard from "./components/EmpleadoDashboard";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const { usuarioActual, iniciarSesion } = useAuth();

  if (!usuarioActual) {
    return <Login onLogin={iniciarSesion} />;
  }

  if (usuarioActual.rol === "administrador") {
    return <AdminDashboard />;
  }

  return <EmpleadoDashboard />;
}

export default App;