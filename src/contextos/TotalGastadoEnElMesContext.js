import React, { useState, useEffect, useContext } from 'react';
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';

// se define el context
const TotalGastadoContext = React.createContext();

const useTotalDelMes = () => useContext(TotalGastadoContext);


// se define el provider
const TotalGastadoProvider = ({children}) => {
   // se define el state
   const [total, cambiarTotal] = useState(0);
   const gastos = useObtenerGastosDelMes();

   // definimos el useEffect para obtener la sumatoria de lo sgastos de la db
   useEffect(() => {

      // console.log(gastos)

      let acumulado = 0;
      gastos.forEach((gasto) => {
         acumulado += gasto.cantidad;
      })

      // console.log(acumulado);
      cambiarTotal(acumulado);
   }, [gastos]);

   return (
      <TotalGastadoContext.Provider value={{total: total}}>
         {children}
      </TotalGastadoContext.Provider>
   );
}

export {TotalGastadoProvider, useTotalDelMes}