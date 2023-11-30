// En tu componente, por ejemplo, RegresarInicio.jsx

const botonStyle = {
   
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  
  export function RegresarInicio({ setPage }) {
    return (
      <button onClick={() => setPage(1)} style={botonStyle}>
        Regresar al Inicio
      </button>
    );
  }
  