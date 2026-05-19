import { useState } from "react";

import styles from './MascotaItem.module.css';

function MascotaItem( {clientes, mascota, onEliminar, onGuardar} ) {

    const getNombreDuenio = (id) => {
        const duenio = clientes.find((c) => c.id === id);
        return duenio ? duenio.nombre : "Dueño desconocido";
    };

    const [esEdicion, setEsEdicion] = useState(false);

    const [clienteIdEditado, setClienteIdEditado] = useState(mascota.clienteId);
    const [nombreEditado, setNombreEditado] = useState(mascota.nombre);
    const [especieEditado, setEspecieEditado] = useState(mascota.especie);
    const [razaEditado, setRazaEditado] = useState(mascota.raza);
    
    const manejadorEliminar = () => {
        if(window.confirm(`¿Seguro que quiere eliminar a ${mascota.nombre}?`)) {
            onEliminar(mascota.id);
        }
    }

    const manejadorEditar = () => {
        setEsEdicion (true);
    }

    const manejadorGuardar = (e) => {
        e.preventDefault();

        const mascotaActualizado = {
            ...mascota,
            nombre: nombreEditado,
            especie: especieEditado,
            raza: razaEditado,
            clienteId: Number(clienteIdEditado)
           
        };
        
        onGuardar(mascotaActualizado);

        setEsEdicion(false);
    };

    return (
        <li key={mascota.id} className={styles.tarjetaMascota}>
            {esEdicion ? (
                <form onSubmit={manejadorGuardar} className={StyleSheet.modoEdicion}>
                    <input 
                    type="text" 
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)} 
                    />
                    <input 
                    type="text" 
                    value={especieEditado}
                    onChange={(e) => setEspecieEditado(e.target.value)} 
                    />
                    <input 
                    type="text" 
                    value={razaEditado}
                    onChange={(e) => setRazaEditado(e.target.value)} 
                    />
                    <select value={clienteIdEditado} onChange={(e) => setClienteIdEditado(e.target.value)} required>
                        <option value="">--Seleccione un dueño--</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nombre}
                            </option>
                        ))}
                    </select> 
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => setEsEdicion(false)}>Cancelar</button>
                </form>
            ):(
              <div className={StyleSheet.infoMascota}>
                <strong className={styles.nombreMascota}>**{mascota.nombre}** </strong>
                - Especie: {mascota.especie} 
                - Raza: {mascota.raza} 
                <span className={styles.duenio}>
                    - Dueño: {getNombreDuenio(mascota.clienteId)}
                </span>
                <div className={styles.acciones}>
                    <button onClick={manejadorEditar}>
                        Editar
                    </button>
                    <button onClick={manejadorEliminar}>
                        💥Eliminar
                    </button>
                </div>
              </div>  
            )};
        </li>  
    )
}

export default MascotaItem;