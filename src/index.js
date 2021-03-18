import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import App from './App';
import './index.css';

// imageness
import favicon from './images/logo.png';

// de style component
import Contenedor from './elementos/Contenedor';

// Componentes
import EditarGasto from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import InicioSesion from './componentes/InicioSesion';
import ListaDeGastos from './componentes/ListaDeGastos';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';



// se habilita el web font loader
WebFont.load({
	google: {
		// Work+Sans:wght@400;500;700
		families: ['Work Sans:400,500,700', 'sans-serif']
	}
});

const Index = () => {
	return (
		<Fragment>

			<Helmet>
				<link rel="shortcut icon" href={favicon} type="image/x-icon" />
			</Helmet>

			<AuthProvider>
				<BrowserRouter>
					<Contenedor>
						<Switch>
							<Route path="/iniciar-sesion" component={InicioSesion} />
							<Route path="/crear-cuenta" component={RegistroUsuarios} />
							<Route path="/categorias" component={GastosPorCategoria} />
							<Route path="/lista" component={ListaDeGastos} />
							<Route path="/editar/:id" component={EditarGasto} />
							<Route path="/" component={App} />
						</Switch>
					</Contenedor>
				</BrowserRouter>			
			</AuthProvider>

			<Fondo />

		</Fragment>
	);
}

ReactDOM.render(<Index />, document.getElementById('root'));