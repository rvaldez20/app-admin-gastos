import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {useParams} from 'react-router-dom';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGasto from './FormularioGasto';
import useObtenerGasto from '../hooks/useObtenerGasto';

const EditarGasto = () => {

	// extraemos el id de la url por medio de useParams
	const {id} = useParams();
	// console.log(id)

	const [gasto] = useObtenerGasto(id);
	console.log(gasto)

	return (
		<Fragment>
			<Helmet>
				<title>Editar Gasto</title>
			</Helmet>

			<Header>
			<BtnRegresar />
				<Titulo>Editar Gasto</Titulo>
			</Header>

			<FormularioGasto />

			<BarraTotalGastado />
		</Fragment>		
	);
}
 
export default EditarGasto;