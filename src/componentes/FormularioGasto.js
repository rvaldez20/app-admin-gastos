import {useState, useEffect} from 'react';
import {ContenedorFiltros, Formulario, 
        Input, InputGrande, ContenedorBoton
} from '../elementos/ElementosDeFormulario';
import {useHistory} from 'react-router-dom';
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from '../images/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import agregarGasto from '../firebase/agregarGasto';
import {useAuth} from '../contextos/AuthContext';
import Alerta from '../elementos/Alerta';
import editarGasto from '../firebase/editarGasto';

const FormularioGasto = ({gasto}) => {

   // se define el state para categoria
   const [inputDescripcion, cambiarInputDescripcion] = useState('');
   const [inputCantidad, cambiarInputCantidad] = useState('');
   const [categoria, cambiarCategoria] = useState('hogar');
   // se definen el state para la fecha
   const [fecha, cambiarFecha] = useState(new Date());
   // se definen los estados para las alertas
   const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
   const [alerta, cambiarAlerta] = useState({});

   // obtenemos el AuthContext
   const {usuario} = useAuth();
   // console.log(usuario.uid);

   const history = useHistory();

   //con un useEffect para saber si se pas aun gasto, esto para saber si es new o se edita
   useEffect(() =>{
      // Comprobamos si se le paso un gasto
      // De ser asi establecemos todo el state con los valores del gasto
      if(gasto){
         // Comprobamos que el gasto sea del usuario actual (logueado)
         // Para eso comprobamos el uid guardado con el gasto del uid del usuario actual
         if(gasto.data().uidUsuario === usuario.uid){
            // quiere decir que el gasto es del usuario actual y se establecen los estados
            cambiarCategoria(gasto.data().categoria);
            cambiarFecha(fromUnixTime(gasto.data().fecha));
            cambiarInputDescripcion(gasto.data().descripcion);
            cambiarInputCantidad(gasto.data().cantidad);
         } else {
            history.push('/lista');
         }
      }

   },[gasto, usuario, history])

   // funcion para actualizar el state con lo que escribemn en los inputs
   const handleChange = (e) => {
      if(e.target.name === 'descripcion') {
         cambiarInputDescripcion(e.target.value);
      } else if (e.target.name === 'cantidad') {
         // se valida con expresion regulara solo escribir numeros
         cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
      }
   }

   // se crea la funcion para enviar los datos del formulario y guardar el gasto en firebase
   const handleSubmit = (e) => {
      e.preventDefault();
      
      // para convertir a float con 2 decimales la cantidad
      let cantidadFloat = parseFloat(inputCantidad).toFixed(2);
      // console.log(cantidad);

      // Se valida que no svayan campos vacios
      if (inputDescripcion !== '' && inputCantidad !=='') {
         if(cantidadFloat) {

            // si se tiene un gasto
            if(gasto){
               // console.log(gasto.data());
               editarGasto({
                  id: gasto.id,
                  categoria: categoria,
                  descripcion: inputDescripcion,
                  cantidad: cantidadFloat,
                  fecha: getUnixTime(fecha)
               }).then(() =>{
                  history.push('/lista');
               }).catch((error) => {
                  console.log(error)  
               });
            } else {
               // se formatea la fecha a milisegundos con la funcion de la liberia date-fns   
               // console.log(inputDescripcion, inputCantidad, categoria, fecha);
               agregarGasto({
                  categoria: categoria,
                  descripcion: inputDescripcion,
                  cantidad: cantidadFloat,
                  fecha: getUnixTime(fecha),
                  uidUsuario: usuario.uid
               })
               .then(() => {
                  // si todo es correcto se restablecen todos los estados
                  cambiarCategoria('hogar');
                  cambiarInputDescripcion('');
                  cambiarInputCantidad('');
                  cambiarFecha(new Date());
   
                  cambiarEstadoAlerta(true);
                  cambiarAlerta({tipo: 'exito', mensaje: 'El gasto fue agregado correctamente'})
               })
               .catch((error) => {
                  cambiarEstadoAlerta(true);
                  cambiarAlerta({tipo: 'error', mensaje: 'Error al guardar el gasto, intenta nuevamente'});
                  console.log(error);
               }) 
            }
         } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: 'error', mensaje: 'El valor de la cantidad no es correcto'})
         }
      } else {
         cambiarEstadoAlerta(true);
         cambiarAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los campos'});
      }
   }

   return ( 
      <Formulario onSubmit={handleSubmit}>
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
               {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
            </Boton>
         </ContenedorBoton>
         
         <Alerta 
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            estadoAlerta={estadoAlerta}
            cambiarEstadoAlerta={cambiarEstadoAlerta}
         />
      </Formulario>
    );
}
 
export default FormularioGasto;