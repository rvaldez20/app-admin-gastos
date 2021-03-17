import React, {Fragment, useState} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as SvgLogin} from '../images/registro.svg';
import {auth} from '../firebase/firebase.Config';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {
  //definimos nuestro useHistory para redireccionar
  const history = useHistory();

  // se define los state para cada input
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  const [passwordConfirm, establecerPasswordConfirm] = useState('');
  // se definene los state para las alertas
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiaraAlerta] = useState({});

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
  } // end -handleChangeInputs

  const handleSubmit = async (e) => {
    e.preventDefault();

    // nos aseguramos que la alerta esta desactivada(false) y que la alerta esta vacia
    cambiarEstadoAlerta(false);
    cambiaraAlerta({});

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
      // console.log('Por favor ingresa un correo electronico valido');
      cambiarEstadoAlerta(true);
      cambiaraAlerta({
        tipo: 'error',
        mensaje: 'Por favor ingresa un correo electronico valido'
      });
      return;
    }

    // Se valida que ningun campo se quede vacio
    if( correo === '' || password === '' || passwordConfirm ==='' ){
      // console.log('Todos los datos son obligatorios');
      cambiarEstadoAlerta(true);
      cambiaraAlerta({
        tipo: 'error',
        mensaje: 'Todos los datos son obligatorios'
      });
      return;
    }

    // validamos que el password y passwordConfirm sean iguales
    if ( password !== passwordConfirm) {
      // console.log('Las contraseñas deben ser iguales');
      cambiarEstadoAlerta(true);
      cambiaraAlerta({
        tipo: 'error',
        mensaje: 'Las contraseñas deben ser iguales'
      });
      return;
    }

    // Paso todas las validaciones se procede a crear un usuario    
    try {
        // Guardamos en firebase.auth al usuario
        await auth.createUserWithEmailAndPassword(correo, password);
        
        // Ingres a la aplicación y redireccionamos al home ('/')
        history.push('/');
    } catch (error) {      
      // console.log(error.code);
      // console.log(error.message);

      // camibiamos el mensaje
      cambiarEstadoAlerta(true);

      let msg = '';     
      switch (error.code) {
        case 'auth/email-already-in-use':
          msg = 'Ya existe una cuenta con el correo electrónico proporcionado.'
        break;
        case 'auth/weak-password':
          msg = 'La contraseña tiene que ser de al menos 6 caracteres.'
        break;
        case 'auth/invalid-email':
          msg = 'El correo electrónico no es válido.'
        break;
      
        default:
          msg = 'Hubo un error al intentar crear la cuenta.'
          break;
      }
                  
      cambiaraAlerta({
        tipo: 'error',
        mensaje: msg
      });

      return;
    }            
  }  // end - handleSubmit

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

      <Alerta 
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        cambiarEstadoAlerta={cambiarEstadoAlerta}
      />
      
    </Fragment>

  );
}
 
export default RegistroUsuarios;