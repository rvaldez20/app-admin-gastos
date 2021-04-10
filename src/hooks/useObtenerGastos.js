import { useState, useEffect } from 'react';
import {db} from '../firebase/firebase.Config';
import {useAuth} from '../contextos/AuthContext';

const useObtenerGastos = () => {
   
   // extraemos el usurio que esta logueado
   const {usuario} = useAuth();
   // console.log(usuario.uid);

   // se define un gasto para los gastos
   const [gastos, cambiarGastos] = useState([]);

   // se define el state para guardar el ultimo gasto
   const [ultimoGasto, cambiarUltimoGasto] = useState(null);

   // se defi ne otro stat para saber si hay mas por cargar
   const [hayMasPorCargar, cambiarhayMasPorCargar] = useState(false);


   // función para obtener mas gastos
   const obtnerMasGastos = () => {
      db.collection('gastos')
         .where('uidUsuario', '==', usuario.uid)
         .orderBy('fecha', 'desc')
         .limit(10)
         .startAfter(ultimoGasto)
         .onSnapshot((snapshot) => {
            if(snapshot.docs.length > 0) {
               cambiarUltimoGasto(snapshot.docs[snapshot.docs.length-1]);

               cambiarGastos(gastos.concat(snapshot.docs.map((gasto) =>{
                  return { ...gasto.data(), id: gasto.id }
               })))
            } else {
               cambiarhayMasPorCargar(false);
            }
         })
   }
   

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
         
         // test para ver el ultimo de los primero 10
         // console.log('last',snapshot.docs[snapshot.docs.length-1].data());
         
         // si es mayor que cero quiere decir que hay más gastos por caragar
         if(snapshot.docs.length > 0) {
            cambiarUltimoGasto(snapshot.docs[snapshot.docs.length-1]);
            cambiarhayMasPorCargar(true);
         } else {
            cambiarhayMasPorCargar(false);
         }
         
         cambiarGastos(snapshot.docs.map((gasto) => {
            // console.log(gasto.data());
            return {...gasto.data(), id: gasto.id}
         }));          
      });
      
      // para cerra la conexion
      return unsuscribe;
   }, [usuario]);


   return [gastos, obtnerMasGastos, hayMasPorCargar];
}
 
export default useObtenerGastos;