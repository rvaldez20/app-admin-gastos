import { useState, useEffect } from 'react';
import useObtenerGastosDelMes from './useObtenerGastosDelMes';


const useObtenerGastosDelMesPorCategoria = () => {
   // se define el state
   const [gastosPorCategoria, cambiarGastosPorCategoria] = useState([]);
   const gastos = useObtenerGastosDelMes();
   // console.log(gastos);

   useEffect(() => {
      const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => {
         const categoriaActual = objetoActual.categoria;
         const cantidadActual = objetoActual.cantidad;
         // console.log(categoriaActual, cantidadActual);
   
         objetoResultante[categoriaActual] += cantidadActual;
         
         return objetoResultante;
      }, {
         'comida': 0,
         'cuentas y pagos': 0,
         'hogar': 0,
         'transporte': 0,
         'ropa': 0,
         'salud e higiene': 0,
         'compras': 0,
         'diversion': 0
      });
   
      // console.log(sumaDeGastos);
   
      // console.log(Object.keys(sumaDeGastos));
      cambiarGastosPorCategoria(Object.keys(sumaDeGastos).map((elemento) => {
         return {categoria: elemento, cantidad: sumaDeGastos[elemento]}
      }));

   }, [cambiarGastosPorCategoria, gastos]);

   return gastosPorCategoria;
}
 
export default useObtenerGastosDelMesPorCategoria;