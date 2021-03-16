import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';

const GastosPorCategoria = () => {
  return ( 
    <Fragment>
			<Helmet>
				<title>Gastos por Categoria</title>
			</Helmet>

			<Header>
        <BtnRegresar />
				<Titulo>Gastos por Categoria</Titulo>					
			</Header>
		</Fragment>
  );
}
 
export default GastosPorCategoria;