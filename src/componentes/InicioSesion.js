import React, {Fragment, useState} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as SvgLogin} from '../images/login.svg';
import {auth} from '../firebase/firebase.Config';
import Alerta from '../elementos/Alerta';

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem; /* 200px */
  margin-bottom: 1.25rem; /* 20px */
`;

const InicioSesion = () => {
  //definimos nuestro useHistory para redireccionar
  const history = useHistory();

  // se definen los states para los inputs
  const [correo, establecerCorreo] = useState('');
  const [password, establecerPassword] = useState('');
  // se definene los state para las alertas
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiaraAlerta] = useState({});


  // funciones
  const handleChangeInputs = (e) => {
    switch (e.target.name) {
      case 'email':
        establecerCorreo(e.target.value);
      break;
      case 'password':
        establecerPassword(e.target.value);
      break;    
      default:
        break;
    }
  } // end - handleChangeInputs 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // nos aseguramos que la alerta esta desactivada(false) y que la alerta esta vacia
    cambiarEstadoAlerta(false);
    cambiaraAlerta({});

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
    if( correo === '' || password === '' ){
      // console.log('Todos los datos son obligatorios');
      cambiarEstadoAlerta(true);
      cambiaraAlerta({
        tipo: 'error',
        mensaje: 'Todos los datos son obligatorios'
      });
      return;
    }

    // Paso todas las validaciones se procede a crear un usuario 
    try {
      // validamos en firebase los datos del usuario
      await auth.signInWithEmailAndPassword(correo, password);
        
      // Ingres a la aplicación y redireccionamos al home ('/')
      history.push('/');

    } catch (error) {
      
      // camibiamos el mensaje
      cambiarEstadoAlerta(true);

      // console.log(error);

      let msg = '';     
      switch (error.code) {
        case 'auth/wrong-password':
          msg = 'La contraseña es incorrecta.'
        break;
        case 'auth/user-not-found':
          msg = 'El correo no esta registrado.'
        break;
      
        default:
          msg = 'Hubo un error al intentar Iniciar Sesión.'
          break;
      }
                  
      cambiaraAlerta({
        tipo: 'error',
        mensaje: msg
      });

      return;

      console.log(error);
    }


  }


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
        <ContenedorBoton>
          <Boton as="button" primario type="submit">Iniciar Sesión</Boton>        
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
 
export default InicioSesion;