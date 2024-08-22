import React, { useReducer } from 'react';
import { ToastAndroid } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import { OBTENER_PRODUCTOS_EXITO } from '../../types';
import _ from 'lodash';

const FirebaseState = (props) => {
  // Crear state inicial
  const initialState = {
    menu: [],
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const errorMessages = {
    'auth/user-not-found': "Usuario no encontrado",
    'auth/missing-password': "Contraseña no válida",
    'auth/missing-email': "Email no válido",
    'auth/wrong-password': "Contraseña incorrecta",
    'auth/invalid-email': "Email no válido",
    'auth/too-many-requests': "Acceso a esta cuenta ha sido desactivado temporalmente debido a muchos intentos de inicio de sesión fallidos. Intente nuevamente más tarde.",
    'auth/email-already-in-use': "El correo electrónico ya está en uso",
    'default-signin': "Error al iniciar sesión",
    'default-signup': "Error al registrar usuario",
  };

  const Register = async (email, password, router) => {
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password);
      ToastAndroid.show("Registro exitoso", ToastAndroid.SHORT);
      router.push('/Login');
    } catch (error) {
      const message = errorMessages[error.code] || errorMessages['default-signup'];
      console.log(error);
      alert(message);
    }
  };

  const SignIn = async (email, password, router) => {
    try {
      await signInWithEmailAndPassword(firebase.auth, email, password);
      ToastAndroid.show("Inicio de sesión exitoso", ToastAndroid.SHORT);
      router.replace('/NuevaOrden');
    } catch (error) {
      const message = errorMessages[error.code] || errorMessages['default-signin'];
      alert(message);
    }
  };


  const SignOut = async () => {
    try {
      await signOut(firebase.auth);
    } catch (error) {
      console.log(error);
    }
  }

  // Función que se ejecuta para traer los productos
  const obtenerProductos = () => {
    // Consultar Firebase Firestore
    const productosRef = collection(firebase.db, 'productos');
    const productosQuery = query(productosRef);

    onSnapshot(productosQuery, (snapshot) => {
      let platillos = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Ordenar por categoría con lodash
      platillos = _.sortBy(platillos, 'categoria');

      // Tenemos resultados de la base de datos
      dispatch({
        type: OBTENER_PRODUCTOS_EXITO,
        payload: platillos,
      });
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        Register,
        SignIn,
        SignOut,
        obtenerProductos,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;