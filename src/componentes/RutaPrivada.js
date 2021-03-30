import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../contextos/AuthContext';


const RutaProtegida = ({children, ...restoDePropieddaes}) => {
   const {usuario} = useAuth();

   // recibimos childres(el componente hijo) y el resto de las propiedades
   if(usuario) {
      return <Route {...restoDePropieddaes}>{children}</Route>

   } else {
      return <Redirect to="/Iniciar-sesion" />
   }
}
 
export default RutaProtegida;