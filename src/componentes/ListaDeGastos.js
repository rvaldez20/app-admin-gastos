import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
// import {AuthContext} from '../contextos/AuthContext';   // 1.-para usarlo sin hook
// import {useAuth} from '../contextos/AuthContext';

const ListaDeGastos = () => {

	// accedemos al contexto - estado global
	// const contexto = useContext(AuthContext); // 2.- para usarlo sin hook
	// console.log(contexto); // 3.- para usarlo sin hook

	// accedemos al contexto (hook) - estado global
	// const {usuario} = useAuth();
	// console.log(usuario);

  return ( 
    <Fragment>
			<Helmet>
				<title>Lista de Gastos</title>
			</Helmet>

			<Header>
        <BtnRegresar />
				<Titulo>Lista de Gastos</Titulo>					
			</Header>

			<BarraTotalGastado />
		</Fragment>
  );
}
 
export default ListaDeGastos;