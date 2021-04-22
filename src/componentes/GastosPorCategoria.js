import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';

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

			<BarraTotalGastado />

		</Fragment>
	);
}
 
export default GastosPorCategoria;