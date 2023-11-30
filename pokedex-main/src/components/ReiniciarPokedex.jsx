const botonStyle = {
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  
  export function ReiniciarPokedex({ setResultadosBusqueda }) {
    return (
      <button onClick={() => setResultadosBusqueda([])} style={botonStyle}>
        Regresar De Busqueda
      </button>
    );
  }
  
