import { useState, useEffect } from 'react';
import {db} from '../firebase/firebase.Config';
import {useAuth} from '../contextos/AuthContext';

const useObtenerGastos = () => {
   
   // extraemos el usurio que esta logueado
   const {usuario} = useAuth();
   console.log(usuario.uid);

   // se define un gasto para los gastos
   const [gastos, cambiarGastos] = useState([]);

   // hacemos un useEffect para obtener los gastos de firestore
   useEffect(() => {
      // obtenemos la colección de gastos pero:
      // -> Gastos del usuario logueado
      // -> ordenados descendiente
      // -> solo traemos 10 y serian de 10 en 10
      const unsuscribe = db.collection('gastos')
       .where('uidUsuario', '==', usuario.uid)
       .orderBy('fecha', 'desc')
       .limit(10)
       .onSnapshot((snapshot) => {
         // console.log(snapshot.docs);
         // console.log(snapshot.docs[0].data());
         cambiarGastos(snapshot.docs.map((gasto) => {
            // console.log(gasto.data());
            return {...gasto.data(), id: gasto.id}
         }));

         // para cerra la conexion 
         return unsuscribe;
      });

   }, [usuario]);


   return [gastos];
}
 
export default useObtenerGastos;