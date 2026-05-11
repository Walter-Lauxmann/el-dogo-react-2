import { useState } from "react";

function FormularioMascota({clientes, onMascotaAgregada}) {

    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [clienteId, setClienteId] = useState('');

    const manejadorSubmit = (e) => {
        e.preventDefault();

        if( !nombre || !especie || !clienteId) {
            alert ('Por favor, completa Nombre, Especie y Dueño');
            return;
        }

        const nuevaMascota = {
            id: Date.now(),
            nombre,
            especie,
            raza,
            clienteId: Number(clienteId)
        };

        onMascotaAgregada(nuevaMascota);

        setNombre('');
        setEspecie('');
        setRaza('');
        setClienteId('');
    }

    return (
        <form onSubmit={manejadorSubmit}>
            <h3>Nueva Mascota</h3>
            <label>
                Dueño (Cliente):
                <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                    <option value="">--Seleccione un dueño--</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre}
                        </option>
                    ))}
                </select> 
            </label>
            <label>
                Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre de la mascota" required />
            </label>
            <label>
                Especie:
                <input type="text" value={especie} onChange={(e) => setEspecie(e.target.value)} placeholder="Especie de la mascota" required />
            </label>
            <label>
                Raza:
                <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} placeholder="Raza de la mascota" />
            </label>

            <button type="submit">Registrar mascota</button>
        </form>
    )
}

export default FormularioMascota;