import React, { useState } from 'react';
import clienteApi from '../api/axios';
// Importamos el contexto desde su archivo
import { AutenticacionContext } from './AutenticacionContext';

export const AutenticacionProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const tokenGuardado = localStorage.getItem('tokenAcceso');
    const usuarioGuardado = localStorage.getItem('datosUsuario');

    if (tokenGuardado && usuarioGuardado) {
      try {
        return JSON.parse(usuarioGuardado);
      } catch (error) {
        console.error('Error al parsear datos de usuario:', error);
        return null;
      }
    }
    return null;
  });

  const iniciarSesion = async (correoElectronico, contrasena) => {
    try {
      const respuesta = await clienteApi.post('/autenticacion/login', {
        correoElectronico,
        contrasena,
      });

      const { tokenAcceso, usuario } = respuesta.data;

      localStorage.setItem('tokenAcceso', tokenAcceso);
      localStorage.setItem('datosUsuario', JSON.stringify(usuario));

      setUsuarioActual(usuario);
      return { exito: true };
    } catch (error) {
      const mensajeError = error.response?.data?.mensaje || 'Error al iniciar sesión';
      return { exito: false, mensaje: mensajeError };
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('tokenAcceso');
    localStorage.removeItem('datosUsuario');
    setUsuarioActual(null);
  };

  const valoresContexto = {
    usuarioActual,
    iniciarSesion,
    cerrarSesion,
  };

  return (
    <AutenticacionContext.Provider value={valoresContexto}>
      {children}
    </AutenticacionContext.Provider>
  );
};
