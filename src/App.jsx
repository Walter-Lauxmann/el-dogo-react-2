import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
/* Componentes */
import Navegacion from './components/Navegacion';
import VistaClientes from './components/VistaClientes';
import VistaMascotas from './components/VistaMascotas';
import VistaConfiguracion from './components/VistaConfiguracion';
import Login from './components/Login';

import './App.css'; // Importamos el css

function App() {
  const nombreApp = "El Dogo - Gestión de veterinaria";

  const [estaLogueado, setEstalogueado] = useState(false);

  const manejadorLogin = (estado) => {
    setEstalogueado(estado);
  }

  return (
    <div>
      <h1>{nombreApp}</h1>
      <p>¡Bienvenido! Acá gestionarás clientes y mascotas</p>
      {estaLogueado ? (
        <>
          <Navegacion />

          <Routes>
            <Route path="/" element={<VistaClientes />} />
            <Route path="/mascotas" element={<VistaMascotas />} />
            <Route path="/config" element={<VistaConfiguracion />} />
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </>
      ) : (
        <Login onLoginExitoso={manejadorLogin} />
      )}

      {estaLogueado && (
        <button onClick={() => setEstalogueado(false)}>Salir</button>
      )}
      

    </div>
  )
}

export default App;