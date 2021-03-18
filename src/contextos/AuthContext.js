import React, { useState, useEffect, useContext } from 'react';

import {auth} from '../firebase/firebase.Config';

// ****************** Creamos el contexto **********************************
const AuthContext = React.createContext();


//  ***************** HOOK para acceder al contexto *************************
const useAuth = () => {
  return useContext(AuthContext);
}


// ***************** Provider - Componente padre *****************************
const AuthProvider = ({children}) => {
  // definimos el state que va controlar el inicio de sesión
  const [usuario, cambiarUsuario] = useState();
  // define otro state para cuando termine de cargar la comprobacion en auth.onAuthStateChanged
  const [cargando, cambiarCargando] = useState(true);

  // definimos el useEffect que es al qu eva actualizar el acceso
  useEffect( () => {
    // Comprobamos si hay un usurio cad avez que se inicia o cierra una sesión
    const cancelarSuscripcion = auth.onAuthStateChanged( (userCheckSign) => {
      console.log(userCheckSign);
      // si usuario retorna null quiere decir qu eno ha iniciado sesion
      // si regresa un objeto quiere decir que ya inicio sesion    
      
      // y guardamos la información en el state usuario
      cambiarUsuario(userCheckSign);

      // actualizamos el state cargando cuando ya cargo
      cambiarCargando(false);
    });

    return cancelarSuscripcion;
  }, []);

  return ( 
    <AuthContext.Provider value={ {usuario: usuario} }>
      {/*
        Solo retorna los elementos hijos cuando no este cargando.
        De esta forma nos aseguramos de no cargar el resto de la aplicacion hasta que el usuario haya sido establecido.

        Si no hacemos esto al refrescar la pagina el componente children intenta cargar inmediatamente, antes de haber comprobado que existe un usurios autenticado
      */}
      { !cargando && children }
    </AuthContext.Provider>
   );
}
 
export { AuthContext, AuthProvider, useAuth };