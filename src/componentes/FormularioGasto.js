import React, {useState} from 'react';
import {ContenedorFiltros, Formulario, 
        Input, InputGrande, ContenedorBoton
} from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from '../images/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';

const FormularioGasto = () => {

   // se define el state para categoria
   const [inputDescripcion, cambiarInputDescripcion] = useState('');
   const [inputCantidad, cambiarInputCantidad] = useState('');
   const [categoria, cambiarCategoria] = useState('hogar');
   // se definen el state para la fecha
   const [fecha, cambiarFecha] = useState(new Date());

   // funcion para actualizar el state con lo que escribemn en los inputs
   const handleChange = (e) => {
      if(e.target.name === 'descripcion') {
         cambiarInputDescripcion(e.target.value);
      } else if (e.target.name === 'cantidad') {
         // se valida con expresion regulara solo escribir numeros
         cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
      }
   }

   console.log(fecha);

   return ( 
      <Formulario>
         <ContenedorFiltros>
            <SelectCategorias 
               categoria={categoria}
               cambiarCategoria={cambiarCategoria}
            />
            <DatePicker 
               fecha={fecha}
               cambiarFecha={cambiarFecha}
            />
         </ContenedorFiltros>

         <div>
            <Input 
               type="text"
               name="descripcion"
               id="descripcion"
               placeholder="Descripción del gasto"
               value={inputDescripcion}
               onChange={handleChange}
            />
            <InputGrande 
               type="text"
               name="cantidad"
               id="cantidad"
               placeholder="$0.00"
               value={inputCantidad}
               onChange={handleChange}
            />
         </div>
         <ContenedorBoton>
            <Boton as="button" primario conIcono type="submit">
               Agergar Gasto <IconoPlus />
            </Boton>
         </ContenedorBoton>

      </Formulario>
    );
}
 
export default FormularioGasto;