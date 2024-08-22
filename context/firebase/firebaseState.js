import React, { useReducer } from 'react';
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

  const Register = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const SignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebase.auth, email, password);
    } catch (error) {
      console.log(error);
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