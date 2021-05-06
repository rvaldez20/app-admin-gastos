import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';

import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';

// for test
// import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';

const GastosPorCategoria = () => {
	const gastos = useObtenerGastosDelMesPorCategoria();
	console.log(gastos);


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