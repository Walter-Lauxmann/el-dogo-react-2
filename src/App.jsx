import { useState } from 'react';
import FormularioCliente from './components/FormularioCliente';
import ClienteItem from './components/ClienteItem';
import Login from './components/Login';
import './App.css'; // Importamos el css

function App() {
  const [clientes, setClientes] = useState ([
    { id: 1, nombre: 'Juan Perez', telefono: '1123456789' },
    { id: 2, nombre: 'Ana Gomez', telefono: '11987654321' }
  ]);
  const nombreApp = "El Dogo - Gestión de veterinaria";

  const [estaLogueado, setEstalogueado] = useState(false);

  const manejadorLogin = (estado) => {
    setEstalogueado(estado);
  }

  const agregarCliente = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente])
  }

  const eliminarCliente = (clienteId) => {
    const listaActualizada = clientes.filter( cliente => 
      cliente.id !== clienteId
    );

    setClientes(listaActualizada);

  }

  const actualizarCliente = (clienteActualizado) => {
    const listaActualizada = clientes.map(cliente => {
      if(cliente.id === clienteActualizado.id) {
        return clienteActualizado
      }
      return cliente;
    });

    setClientes(listaActualizada);
  }

  return (
    <div>
      <h1>{nombreApp}</h1>
      <p>¡Bienvenido! Acá gestionarás clientes y mascotas</p>
      {estaLogueado ? (
        <section>
          <p>Total de clientes registrados: ** { clientes.length } ** </p>

      <section>
        <h2>Gestión de Clientes</h2>
        <h2>Gestión de Mascotas</h2>
      </section>
      <hr />
      <h2>Clientes Actuales</h2>
      <FormularioCliente onClienteAgregado={agregarCliente} />
      <ul>
        {clientes.map((cliente) => (
              <ClienteItem 
                key={cliente.id} 
                cliente={cliente}
                onEliminar={eliminarCliente}
                onGuardar={actualizarCliente} 
                />  
        ))
        }
      </ul>
        </section>
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