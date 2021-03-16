import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';

const ListaDeGastos = () => {
  return ( 
    <Fragment>
			<Helmet>
				<title>Lista de Gastos</title>
			</Helmet>

			<Header>
        <BtnRegresar />
				<Titulo>Lista de Gastos</Titulo>					
			</Header>
		</Fragment>
  );
}
 
export default ListaDeGastos;