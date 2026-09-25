import { useState } from 'react';
import { Link } from 'react-router-dom';

function ClienteItem({ cliente, onEliminar, onGuardar }) {
    const [esEdicion, setEsEdicion] = useState(false);
    const [nombreEditado, setNombreEditado] = useState(cliente.nombre);
    const [telefonoEditado, setTelefonoEditado] = useState(cliente.telefono);

    const manejadorEliminar = () => {
        if (window.confirm(`¿Seguro que quiere eliminar a ${cliente.nombre}?`)) {
            onEliminar(cliente.id);
        }
    };

    const manejadorEditar = () => {
        setNombreEditado(cliente.nombre);
        setTelefonoEditado(cliente.telefono);
        setEsEdicion(true);
    };

    const manejadorGuardar = (e) => {
        e.preventDefault();

        if (nombreEditado.trim() === '' || telefonoEditado.trim() === '') {
            return;
        }

        const clienteActualizado = {
            ...cliente,
            nombre: nombreEditado.trim(),
            telefono: telefonoEditado.trim(),
        };

        onGuardar(clienteActualizado);
        setEsEdicion(false);
    };

    return (
        <li>
            {esEdicion ? (
                <form onSubmit={manejadorGuardar}>
                    <label>
                        Nombre
                        <input
                            type="text"
                            value={nombreEditado}
                            onChange={(e) => setNombreEditado(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Teléfono
                        <input
                            type="tel"
                            value={telefonoEditado}
                            onChange={(e) => setTelefonoEditado(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => setEsEdicion(false)}>
                        Cancelar
                    </button>
                </form>
            ) : (
                <div>
                    <Link to={`/cliente/${cliente.id}`}>
                        <strong>{cliente.nombre}</strong>
                    </Link>{' '}
                    - Tel: {cliente.telefono}
                    <button type="button" onClick={manejadorEditar}>
                        Editar
                    </button>
                    <button type="button" onClick={manejadorEliminar}>
                        Eliminar
                    </button>
                </div>
            )}
        </li>
    );
}

export default ClienteItem;