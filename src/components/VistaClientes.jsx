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
    eliminarCliente
  } = useContext(VeterinariaContext);
  

  return (
    <div className={styles.contenedorPrincipal}>
      <section>
        <h2 className={styles.titulo}>Gestión de Clientes</h2>
        <p className={styles.contador}>Total de clientes registrados: ** {clientes.length} ** </p>
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
          ))}
        </ul>
      </section>
    </div>
  );
}

export default VistaClientes;
