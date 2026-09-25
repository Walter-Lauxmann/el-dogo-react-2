import { useState } from "react";

function FormularioCliente({onClienteAgregado}) {

    const [ nombre, setNombre ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [ estaEnviando, setEstaEnviando ] = useState(false);

    const manejadorNombre = (e) => {
        setNombre(e.target.value);
    }

    const manejadorTelefono = (e) => {
        setTelefono(e.target.value);
    }

    const manejadorEnvio = async (e) => {
        e.preventDefault();

        if (nombre.trim() === '' || telefono.trim() === '') {
            return;
        }

        const nuevoCliente = {
            nombre: nombre.trim(),
            telefono: telefono.trim()
        };

        try {
            setEstaEnviando(true);
            await onClienteAgregado(nuevoCliente);
            setNombre('');
            setTelefono('');
        } finally {
            setEstaEnviando(false);
        }
    };

    return (
        <form onSubmit={manejadorEnvio}>
            <h3>Nuevo cliente:</h3>
            <label htmlFor="nombre-cliente">Nombre completo</label>
            <input
                id="nombre-cliente"
                name="nombre"
                type="text"
                value={nombre}
                onChange={manejadorNombre}
                autoComplete="name"
                required
            />
            <label htmlFor="telefono-cliente">Teléfono</label>
            <input
                id="telefono-cliente"
                name="telefono"
                type="tel"
                value={telefono}
                onChange={manejadorTelefono}
                autoComplete="tel"
                required
            />

            <button type="submit" disabled={estaEnviando}>
                {estaEnviando ? 'Registrando...' : 'Registrar cliente'}
            </button>
        </form>
    )
}

export default FormularioCliente;