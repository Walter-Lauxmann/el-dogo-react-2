import { useState, useEffect } from "react";
import { VeterinariaContext } from "./VeterinariaContext";
import { useApi } from '../hooks/useApi'; // ⭐️ Importamos el nuevo hook

export const VeterinariaProvider = ({ children }) => {

  // El estado inicial es un array vacío, ya que los datos vienen de la API.
  const [clientes, setClientes] = useState ([]);
  const [mascotas, setMascotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejo de carga

  // ⭐️ Instanciamos los hooks de API para cada endpoint
  const clientesApi = useApi('/clientes');
  const mascotasApi = useApi('/mascotas');


  // ----------------------------------------------------
  // ⭐️ 1. LÓGICA DE CARGA INICIAL (GET - READ)
  // ----------------------------------------------------
  useEffect(() => {
      const fetchData = async () => {
        try {
            // ⭐️ Usamos el método get del hook para cargar datos
            const [clientesData, mascotasData] = await Promise.all([
                clientesApi.get(),
                mascotasApi.get()
            ]);

            setClientes(clientesData);
            setMascotas(mascotasData);
          } catch (error) {
              // El error ya fue logueado en useApi
          } finally {
              setIsLoading(false);
          }
      };
      fetchData();
  }, []); // El array vacío asegura que se ejecute solo al montar el componente


  // ----------------------------------------------------
  // ⭐️ 2. FUNCIONES DE CLIENTES Y MASCOTAS (CREATE, UPDATE, DELETE)
  // ----------------------------------------------------
  
  // ****** CLIENTES ****** //
  const agregarCliente = async (nuevoCliente) => {
      try {
          // POST: envía el nuevo cliente al backend
          const data = await clientesApi.create(nuevoCliente); 
            setClientes([...clientes, data]);  
      } catch (error) {
          console.error("Error al agregar cliente:", error);
      }
  };
  
  const actualizarCliente = async (clienteActualizado) => {
      try {
        // ⭐️ Usamos el método update
        await clientesApi.update(clienteActualizado.id, clienteActualizado);
        // Actualiza el estado local de React
        setClientes(clientes.map(cl => 
            cl.id === clienteActualizado.id ? clienteActualizado : cl
        ));
      } catch (error) {
          console.error("Error al actualizar cliente:", error);
      }
  };
  
  const eliminarCliente = async (id) => {
      try {
          // ⭐️ Usamos el método remove
          await clientesApi.remove(id);
          // Actualiza el estado local de React
          setClientes(clientes.filter(cl => cl.id !== id));
      } catch (error) {
          console.error("Error al eliminar cliente:", error);
      }
  };
  
  // ****** MASCOTAS ****** //
  const agregarMascota = async (nuevoMascota) => {
      try {
          // POST: envía el nuevo Mascota al backend
          const data = await mascotasApi.create(nuevoMascota);
          // El backend devuelve el objeto creado con el ID
          setMascotas([...mascotas, data]); 
      } catch (error) {
          console.error("Error al agregar Mascota:", error);
      }
  };
  
  const actualizarMascota = async (mascotaActualizado) => {
      try {
          // PUT: envía los datos para actualizar
        await mascotasApi.update(mascotaActualizado.id, mascotaActualizado);
          // Actualiza el estado local de React
          setMascotas(mascotas.map(ma => 
              ma.id === mascotaActualizado.id ? mascotaActualizado : ma
          ));
      } catch (error) {
          console.error("Error al actualizar Mascota:", error);
      }
  };
  
  const eliminarMascota = async (id) => {
      try {
          // DELETE: notifica al backend para eliminar
          await mascotasApi.remove(id);
          // Actualiza el estado local de React
          setMascotas(mascotas.filter(ma => ma.id !== id));
      } catch (error) {
          console.error("Error al eliminar Mascota:", error);
      }
  };

  const value = {
      clientes,
      agregarCliente,
      actualizarCliente,
      eliminarCliente,
      mascotas,
      agregarMascota,
      actualizarMascota,
      eliminarMascota,
      isLoading, // Lo exponemos para que las vistas muestren un mensaje de carga
  };

  if (isLoading) {
      return <h1>Cargando datos del servidor...</h1>; // Muestra un mensaje de carga
  }

  return (
      <VeterinariaContext.Provider value={value}>
          {children}
      </VeterinariaContext.Provider>
  );
};