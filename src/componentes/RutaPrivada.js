import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../contextos/AuthContext';


const RutaProtegida = ({children, ...restoDePropieddaes}) => {
   const {usuario} = useAuth();

   if(usuario) {
      return <Route {...restoDePropieddaes}>{children}</Route>

   } else {
      return <Redirect to="/Iniciar-sesion" />
   }
}
 
export default RutaProtegida;