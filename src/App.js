import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

// componentes
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from './elementos/Header';
import Boton from './elementos/Boton';

const App = () => {
	return ( 		
		<Fragment>
			<Helmet>
				<title>Agregar Gasto</title>
			</Helmet>

			<Header>
				<ContenedorHeader>
					<Titulo>Agregar Gasto</Titulo>
					<ContenedorBotones>
						<Boton to="/categorias">Categorias</Boton>
						<Boton to="/lista">Lista de Gastos</Boton>
						<Boton to="/">X</Boton>
					</ContenedorBotones>
				</ContenedorHeader>
			</Header>


		</Fragment>
	);
}
 
export default App;