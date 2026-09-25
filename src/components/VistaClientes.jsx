import { useContext } from "react";
import { VeterinariaContext } from "../context/VeterinariaContext";

import FormularioCliente from "./FormularioCliente";
import ClienteItem from "./ClienteItem";

import styles from './VistaClientes.module.css';

function VistaClientes() {
  const {
    clientes,
    agregarCliente,
    actualizarCliente,
    eliminarCliente,
    isLoading
  } = useContext(VeterinariaContext);

  if (isLoading) {
    return (
      <div className={styles.contenedorPrincipal} role="status">
        <p>Cargando clientes...</p>
      </div>
    );
  }

  return (
    <div className={styles.contenedorPrincipal}>
      <section>
        <h2 className={styles.titulo}>Gestión de Clientes</h2>
        <p className={styles.contador}>
          Total de clientes registrados: {clientes.length}
        </p>
        <hr />
        <h2>Clientes Actuales</h2>
        <FormularioCliente onClienteAgregado={agregarCliente} />
        {clientes.length === 0 ? (
          <p>Aún no hay clientes registrados.</p>
        ) : (
          <ul>
            {clientes.map((cliente) => (
              <ClienteItem
                key={cliente.id}
                cliente={cliente}
                onEliminar={eliminarCliente}
                onGuardar={actualizarCliente}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default VistaClientes;
