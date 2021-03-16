import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from '../elementos/Header';

const GastosPorCategoria = () => {
  return ( 
    <Fragment>
			<Helmet>
				<title>Gastos por Categoria</title>
			</Helmet>

			<Header>
				<ContenedorHeader>
					<Titulo>Gastos por Categoria</Titulo>					
				</ContenedorHeader>
			</Header>


		</Fragment>
  );
}
 
export default GastosPorCategoria;