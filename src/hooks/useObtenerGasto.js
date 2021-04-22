import React, {useState, useEffect} from 'react';
import {db} from '../firebase/firebase.Config';
import {useHistory} from 'react-router-dom';

const useObtenerGasto = (id) => {
   const history = useHistory();
   
   // se definr el state para gasto
   const [gasto, establecerGasto] = useState('');
   console.log(gasto)

   // se define useEffect
   useEffect(() => {
      db.collection('gastos').doc(id).get()
         .then((doc) => {
            // console.log(doc.data());
            if(doc.exists){
               establecerGasto(doc);
            } else {
               history.push('./lista');
            }
         })
   },[history, id]);
   
   return [gasto]; 
}
 
export default useObtenerGasto;