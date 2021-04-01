import {db} from './firebase.Config';

const agregarGasto = ({categoria, descripcion, cantidad, fecha, uidUsuario}) => {
   return db.collection('gastos').add({
      categoria,
      descripcion,
      cantidad,
      fecha,
      uidUsuario
   });
}

export default agregarGasto;