import {db} from './firebase.Config';

const borrarGasto = (id) => {
   db.collection('gastos').doc(id).delete()
}

export default borrarGasto;