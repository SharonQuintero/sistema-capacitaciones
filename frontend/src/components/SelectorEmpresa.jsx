function SelectorEmpresa({ empresas, onSeleccionarEmpresa }) {
  return (
    <>
      <h2>Selecciona una empresa</h2>

      <select
        defaultValue=""
        onChange={(event) => onSeleccionarEmpresa(event.target.value)}
      >
        <option value="" disabled>
          Selecciona una empresa
        </option>

        {empresas.map((empresa) => (
          <option key={empresa.id} value={empresa.id}>
            {empresa.nombre}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectorEmpresa;