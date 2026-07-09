import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "usuarioActual";

export function AuthProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const usuarioGuardado = localStorage.getItem(STORAGE_KEY);

    if (!usuarioGuardado) {
      return null;
    }

    return JSON.parse(usuarioGuardado);
  });

  function iniciarSesion(usuario) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    setUsuarioActual(usuario);
  }

  function cerrarSesion() {
    localStorage.removeItem(STORAGE_KEY);
    setUsuarioActual(null);
  }

  const valorContexto = useMemo(
    () => ({
      usuarioActual,
      iniciarSesion,
      cerrarSesion,
    }),
    [usuarioActual],
  );

  return (
    <AuthContext.Provider value={valorContexto}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}