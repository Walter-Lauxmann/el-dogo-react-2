import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { VeterinariaContext } from "../context/VeterinariaContext";

function VistaDetalleCliente() {
    const { clientes, mascotas, isLoading } = useContext(VeterinariaContext);
    const { id: clienteIdString } = useParams();

    if (isLoading) {
        return <p role="status">Cargando información del cliente...</p>;
    }

    const cliente = clientes.find((clienteActual) => (
        String(clienteActual.id) === clienteIdString
    ));
    const mascotasDelCliente = mascotas.filter((mascota) => (
        String(mascota.clienteId) === clienteIdString
    ));

    if(!cliente) {
        return (
            <section>
                <h2>Cliente no encontrado</h2>
                <Link to="/clientes">Volver a la lista de clientes</Link>
            </section>
        );
    }

    return (
        <div>
            <Link to="/clientes">Volver a la lista de clientes</Link>

            <section>
                <h2>Cliente: {cliente.nombre} </h2>
                <p>Teléfono: {cliente.telefono}</p>
                <hr />
            </section>
            <section>
                <h3>
                    Mascotas de {cliente.nombre} ({mascotasDelCliente.length})
                </h3>
                {mascotasDelCliente.length === 0 ? (
                    <p>Este cliente no tiene mascotas asociadas</p>
                ) : (
                    <ul>
                        {mascotasDelCliente.map((mascota) => (
                            <li key={mascota.id}>
                                <strong>{mascota.nombre}</strong>
                                {' - '}Especie: {mascota.especie}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>

    );
}

export default VistaDetalleCliente;