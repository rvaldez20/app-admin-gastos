import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';

import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as SvgLogin} from '../images/registro.svg';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {
  return ( 
    <Fragment>

      <Helmet>
        <title>Crear Cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
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
        <Input 
          type="password"
          name="passwordConfirm"
          placeholder="Repetir Contraseña"
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">Crear Cuenta</Boton>        
        </ContenedorBoton>
      </Formulario>

    </Fragment>
  );
}
 
export default RegistroUsuarios;