import { useState } from "react";

function FormularioMascota({ clientes, onMascotaAgregada }) {

    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [foto, setFoto] = useState(null);
    const [estaEnviando, setEstaEnviando] = useState(false);

    const manejadorCambioImagen = (e) => {
        setFoto(e.target.files[0] ?? null);
    };

    const manejadorSubmit = async (e) => {
        e.preventDefault();

        if (!foto) {
            return;
        }

        const datosFormulario = new FormData();

        datosFormulario.append('nombre', nombre.trim());
        datosFormulario.append('especie', especie.trim());
        datosFormulario.append('raza', raza.trim());
        datosFormulario.append('clienteId', clienteId);
        datosFormulario.append('foto', foto);

        try {
            setEstaEnviando(true);
            await onMascotaAgregada(datosFormulario);
            setNombre('');
            setEspecie('');
            setRaza('');
            setClienteId('');
            setFoto(null);
            e.target.reset();
        } finally {
            setEstaEnviando(false);
        }
    };

    return (
        <form onSubmit={manejadorSubmit}>
            <h3>Nueva Mascota</h3>
            <label htmlFor="cliente-mascota">Dueño (cliente)</label>
            <select
                id="cliente-mascota"
                name="clienteId"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
            >
                    <option value="">--Seleccione un dueño--</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre}
                        </option>
                    ))}
            </select>
            <label htmlFor="nombre-mascota">Nombre</label>
            <input
                id="nombre-mascota"
                name="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre de la mascota"
                required
            />
            <label htmlFor="especie-mascota">Especie</label>
            <input
                id="especie-mascota"
                name="especie"
                type="text"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                placeholder="Especie de la mascota"
                required
            />
            <label htmlFor="raza-mascota">Raza</label>
            <input
                id="raza-mascota"
                name="raza"
                type="text"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                placeholder="Raza de la mascota"
            />
            <label htmlFor="foto-mascota">Foto</label>
            <input
                id="foto-mascota"
                name="foto"
                type="file"
                accept="image/*"
                onChange={manejadorCambioImagen}
                required
            />

            <button type="submit" disabled={estaEnviando}>
                {estaEnviando ? 'Registrando...' : 'Registrar mascota'}
            </button>
        </form>
    );
}

export default FormularioMascota;