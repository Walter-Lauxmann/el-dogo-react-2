import { useState, useEffect } from "react";
import { VeterinariaContext } from "./VeterinariaContext";


export const VeterinariaProvider = ({ children }) => {

    // ** CLIENTES ** //
    const [clientes, setClientes] = useState (() => {
    const datosGuardados = localStorage.getItem('clientesDogo');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  useEffect(() => {
    console.log('Detectando cambio en la lista de clientes. ¡Guardando!');
    localStorage.setItem('clientesDogo', JSON.stringify(clientes));
  }, [clientes]);

  // Funciones de CLIENTES (ABM)
  const agregarCliente = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente])
  }

  const eliminarCliente = (clienteId) => {
    const listaActualizada = clientes.filter( cliente => 
      cliente.id !== clienteId
    );

    setClientes(listaActualizada);

  }

  const actualizarCliente = (clienteActualizado) => {
    const listaActualizada = clientes.map(cliente => {
      if(cliente.id === clienteActualizado.id) {
        return clienteActualizado
      }
      return cliente;
    });

    setClientes(listaActualizada);
  }

  // ** MASCOTAS ** //
  const [mascotas, setMascotas] = useState(() => {
    const mascotasGuardadas = localStorage.getItem("mascotasDogo");
    return mascotasGuardadas ? JSON.parse(mascotasGuardadas) : [];
  });

  useEffect(() => {
    console.log("Detectando cambios en la lista de mascotas. ¡Guardando!");
    localStorage.setItem("mascotasDogo", JSON.stringify(mascotas));
  }, [mascotas]);

  // Funciones de MASCOTAS (ABM)
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


  // Objeto de valor
  const value = {
    // Clientes
    clientes,
    agregarCliente,
    actualizarCliente,
    eliminarCliente,
    // Mascotas
    mascotas,
    agregarMascota,
    actualizarMascota,
    eliminarMascota
  };

  return (
    <VeterinariaContext.Provider value={value}>
        {children}
    </VeterinariaContext.Provider>
  )

}