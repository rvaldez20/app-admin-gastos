import { add } from 'date-fns';
import {db} from './firebase.Config';

const agregarGasto = async ({categoria, descripcion, cantidad, fecha, uidUsuario}) => {
   await db.collection('gastos').add({
      categoria,
      descripcion,
      cantidad,
      fecha,
      uidUsuario
   });
}

export default agregarGasto;