import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';

import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as SvgLogin} from '../images/login.svg';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 200px */
  margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {
  return ( 
    <Fragment>

      <Helmet>
        <title>Iniciar Sesión</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesión</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>      
      </Header>

      <Formulario>
        <Svg />
        <Input 
          type="email"
          name="email"
          placeholder="Correo Electrónico"
        />
        <Input 
          type="passwo rd"
          name="password"
          placeholder="Contraseña"
        />        
        <ContenedorBoton>
          <Boton as="button" primario type="submit">Iniciar Sesión</Boton>        
        </ContenedorBoton>
      </Formulario>

    </Fragment>
  );
}
 
export default InicioSesion;