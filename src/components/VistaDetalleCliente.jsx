import { useState } from "react";
import { useParams, Link } from "react-router-dom";

function VistaDetalleCliente() {
    const { id: clienteIdString } = useParams();
    const clienteId = Number(clienteIdString);

    const [clientes] = useState(() => {
        const clientesGuardados = localStorage.getItem("clientesDogo");
        return clientesGuardados ? JSON.parse(clientesGuardados) : [];
      });
    
      const [mascotas] = useState(() => {
        const mascotasGuardadas = localStorage.getItem("mascotasDogo");
        return mascotasGuardadas ? JSON.parse(mascotasGuardadas) : [];
      });

    const cliente = clientes.find(c => c.id === clienteId);
    const mascotasDelCliente = mascotas.filter( m => m.clienteId === clienteId);

    if(!cliente) {
        return <h2>Cliente no encontrado (ID: {clienteId})</h2>;
    }

    return (
        <div>
            <Link to="/"> Volver a la lista de clientes</Link>

            <section>
                <h2>Cliente: {cliente.nombre} </h2>
                <p>Teléfono: **{cliente.telefono}** </p>
                <hr />
            </section>
            <section>
                <h3>Mascotas de {cliente.nombre} ({mascotasDelCliente.length}) </h3>
                {mascotasDelCliente.length === 0 ? (
                    <p>Este cliente no tiene mascotas asociadas</p>
                ) : (
                    <ul>
                        {mascotasDelCliente.map(mascota => (
                            <li key={mascota.id}>
                                **{mascota.nombre}** - Especie: {mascota.especie}
                            </li>
                        ))}
                    </ul>
                ) }
            </section>
        </div>

    )
}

export default VistaDetalleCliente;