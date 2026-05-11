import { useState, useEffect } from "react";
import FormularioMascota from "./FormularioMascota";
import MascotaItem from "./MascotaItem";

function VistaMascotas() {
  const [clientes] = useState(() => {
    const clientesGuardados = localStorage.getItem("clientesDogo");
    return clientesGuardados ? JSON.parse(clientesGuardados) : [];
  });

  const [mascotas, setMascotas] = useState(() => {
    const mascotasGuardadas = localStorage.getItem("mascotasDogo");
    return mascotasGuardadas ? JSON.parse(mascotasGuardadas) : [];
  });

  const agregarMascota = (nuevaMascota) => {
    setMascotas([...mascotas, nuevaMascota]);
  };

  const eliminarMascota = (mascotaId) => {
    const listaActualizada = mascotas.filter(
      (mascota) => mascota.id !== mascotaId,
    );

    setMascotas(listaActualizada);
  };

  const actualizarMascota = (mascotaActualizada) => {
    const listaActualizada = mascotas.map((mascota) => {
      if (mascota.id === mascotaActualizada.id) {
        return mascotaActualizada;
      }

      return mascota;
    });

    setMascotas(listaActualizada);
  };

  useEffect(() => {
    console.log("Detectando cambios en la lista de mascotas. ¡Guardando!");
    localStorage.setItem("mascotasDogo", JSON.stringify(mascotas));
  }, [mascotas]);

  return (
    <div>
      <section>
        <h2>Gestión de Mascotas</h2>
        <p>Total de mascotas registradas: ** {mascotas.length} **</p>
        <hr />
        <FormularioMascota
          clientes={clientes}
          onMascotaAgregada={agregarMascota}
        />
        <h2>Mascotas actuales</h2>
        <ul>
          {mascotas.map((mascota) => (
            <MascotaItem 
                key={mascota.id}
                clientes={clientes}
                mascota={mascota}
                onEliminar={eliminarMascota}
                onGuardar={actualizarMascota}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default VistaMascotas;
