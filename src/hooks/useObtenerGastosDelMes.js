import {useState, useEffect} from 'react';
import {db} from '../firebase/firebase.Config';
import {startOfMonth, endOfMonth, getUnixTime} from 'date-fns';
import {useAuth} from '../contextos/AuthContext';

const useObtenerGastosDelMes = () => {
   // defino el state para los gastos
   const [gastos, establecerGastos] = useState([]);
   const {usuario} = useAuth();

   useEffect(() => {

      const inicioDeMes = getUnixTime(startOfMonth(new Date()));
      const finDeMes = getUnixTime(endOfMonth(new Date()));
      // console.log(inicioDeMes, finDeMes);
      

      /* Se deja sin filtrar gastos por usuario actual */

      // verificamos si hay un usuario logueado
      if(usuario) {
         console.log(usuario);
         // se obtiene los gatos del mes actual
         const unsuscribe = db.collection('gastos')
         .orderBy('fecha', 'desc')
         .where('fecha', '>=', inicioDeMes)
         .where('fecha', '<=', finDeMes)
         .where('uidUsuario', '==', usuario.uid)
         .onSnapshot((snapshot) => {
            // console.log(snapshot.docs);

            //for test y verlos en el console.log
            // snapshot.docs.forEach((documento) => {
            //    console.log(documento.data());
            // })

            // para pasar los gastos al estado gastos
            establecerGastos(snapshot.docs.map((documento) => {
               // console.log(documento.data())
               return {...documento.data(), id: documento.id}
            }))
         })

         // useEffect ejecuta una funcion que se va ejecutar cuando se desmonte el componente.
         // en este caso queremos que ejecute el unsuscribe a la colección de firestore
         return unsuscribe;
      }      
   }, [usuario]);

   return gastos;
}
 

export default useObtenerGastosDelMes;