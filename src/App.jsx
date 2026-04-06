import './App.css'; // Importamos el css

function App() {
  const nombreApp = "El Dogo - Gestión de veterinaria";

  return (
    <div>
      <h1>{nombreApp}</h1>
      <p>¡Bienvenido! Acá gestionarás clientes y mascotas</p>

      <section>
        <h2>Gestión de Clientes</h2>
        <h2>Gestión de Mascotas</h2>
      </section>

    </div>
  )
}

export default App;