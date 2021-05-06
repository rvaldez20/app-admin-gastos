import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';

import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';
import {	ListaDeCategorias, ElementoListaCategorias, Categoria, Valor} from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import convertirAMoneda from '../funciones/convertirAMoneda';

// for test
// import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';

const GastosPorCategoria = () => {
	const gastosXcategoria = useObtenerGastosDelMesPorCategoria();
	console.log(gastosXcategoria);


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

			<ListaDeCategorias>
				{gastosXcategoria.map((elemento, index) => {
					return (
						<ElementoListaCategorias key={index}>
							<Categoria>
								<IconoCategoria nombreCategoria={elemento.categoria} />
								{elemento.categoria}
							</Categoria>
							<Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
						</ElementoListaCategorias>
					);
				})}
			</ListaDeCategorias>

			<BarraTotalGastado />

		</Fragment>
	);
}
 
export default GastosPorCategoria;