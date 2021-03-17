import React, {Fragment, useState} from 'react';
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

  // se define los state para cada input
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [passwordConfirm, establecerPasswordConfirm] = useState('');

  // FUNCIONES
  const handleChangeInputs = e => {
    // console.log(e.target.name);
    switch (e.target.name) {
      case 'email':
          establecerCorreo(e.target.value);
      break;
      case 'password':
          establecerPassword(e.target.value);
      break;
      case 'passwordConfirm':
          establecerPasswordConfirm(e.target.value);
      break;
      default:
        break
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    /* TODO:
          validar que sea un correo
          validar que ese correo no este registrado
          validar que password y passwordConfirm sean iguales
          validar alguna logitud minima del password
    */

    // Comprobar que el correo sea valido por medio de una expresión reguñlar
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    // console.log(expresionRegular.test(correo));
    if( !expresionRegular.test(correo) ){
      // si no hay un correo valido
      console.log('Por favor ingresa un correo electronico valido');
      return;
    }

    // Se valida que ningun campo se quede vacio
    if( correo === '' || password === '' || passwordConfirm ==='' ){
      console.log('Todos los datos son obligatorios');
      return;
    }

    // validamos que el password y passwordConfirm sean iguales
    if ( password !== passwordConfirm) {
      console.log('Las contraseñas deben ser iguales');
      return;
    }

    // Quiere decir que se han pasado todas las validaciones.
    console.log('Registramos usuario');

  }

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

      <Formulario
        onSubmit={handleSubmit}
      >
        <Svg />
        <Input 
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={handleChangeInputs}
        />
        <Input 
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChangeInputs}
        />
        <Input 
          type="password"
          name="passwordConfirm"
          placeholder="Repetir Contraseña"
          value={passwordConfirm}
          onChange={handleChangeInputs}
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">Crear Cuenta</Boton>        
        </ContenedorBoton>
      </Formulario>

    </Fragment>
  );
}
 
export default RegistroUsuarios;