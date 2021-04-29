import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';

// for test
// import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';

const GastosPorCategoria = () => {

	// for tests
	// useObtenerGastosDelMes();

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