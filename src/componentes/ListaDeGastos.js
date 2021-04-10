import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

import {Header, Titulo} from '../elementos/Header';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastos from '../hooks/useObtenerGastos';
import {
	Lista,
	ElementoLista,
	Categoria,
	Descripcion,
	Valor,
	Fecha,
	ContenedorBotones,
	BotonAccion,
	BotonCargarMas,
	ContenedorBotonCentral,
	ContenedorSubtitulo,
	Subtitulo
} from '../elementos/ElementosDeLista';
import IconoCategoria from '../elementos/IconoCategoria';
import convertirAMoneda from '../funciones/convertirAMoneda';
import {ReactComponent as IconoEditar} from '../images/editar.svg';
import {ReactComponent as IconoBorrar} from '../images/borrar.svg';
import Boton from '../elementos/Boton';
import {format, fromUnixTime} from 'date-fns';
import {es} from 'date-fns/locale';

// import {AuthContext} from '../contextos/AuthContext';   // 1.-para usarlo sin hook
// import {useAuth} from '../contextos/AuthContext';

const ListaDeGastos = () => {

	// accedemos al contexto - estado global
	// const contexto = useContext(AuthContext); // 2.- para usarlo sin hook
	// console.log(contexto); // 3.- para usarlo sin hook

	// accedemos al contexto (hook) - estado global
	// const {usuario} = useAuth();
	// console.log(usuario);

	const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();
	// console.log(gastos);
	console.log(hayMasPorCargar)

	const formatearFecha = (fecha) => {
		return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es});
	}

	const fechaEsIgual = (gastos, index, gasto) => {
		if(index !==0){
			const fechaActual = formatearFecha(gasto.fecha);
			const fechaGastoAnterior = formatearFecha(gastos[index - 1].fecha);

			if (fechaActual === fechaGastoAnterior){
				return true;
			} else {
				return false;
			}
		}
	}

  return ( 
	<Fragment>
		<Helmet>
			<title>Lista de Gastos</title>
		</Helmet>

		<Header>
		<BtnRegresar />
			<Titulo>Lista de Gastos</Titulo>
		</Header>

		<Lista>
			{gastos.map((gasto, index) => {
				return(
					<div key={gasto.id}>
						{!fechaEsIgual(gastos, index, gasto) &&
							<Fecha>{formatearFecha(gasto.fecha)}</Fecha>						
						}
						<ElementoLista key={gasto.id}>							
							<Categoria>
								<IconoCategoria nombreCategoria={gasto.categoria} />
								{gasto.categoria}
							</Categoria>
							
							<Descripcion>
								{gasto.descripcion}
							</Descripcion>

							<Valor>{convertirAMoneda(gasto.cantidad)}</Valor>

							<ContenedorBotones>
								<BotonAccion as={Link} to={`/editar/${gasto.id}`}>
									<IconoEditar />
								</BotonAccion>
								<BotonAccion>
									<IconoBorrar />
								</BotonAccion>
							</ContenedorBotones>
						</ElementoLista>

					</div>
				) ;
			})}

			{hayMasPorCargar &&
				<ContenedorBotonCentral>
					<BotonCargarMas onClick={() => {obtenerMasGastos()}}>Cargar Más</BotonCargarMas>
				</ContenedorBotonCentral>
			}
		

			{gastos.length === 0 &&
				<ContenedorSubtitulo>
					<Subtitulo>No hay gastos por mostrar</Subtitulo>
					<Boton as={Link} to="/">Agregar Gasto</Boton>
				</ContenedorSubtitulo>
			}

		</Lista>

		<BarraTotalGastado />
	</Fragment>
  );
}
 
export default ListaDeGastos;