import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'native-base';
import globalStyles from '../styles/global';
import { useRouter } from 'expo-router';
import PedidoContext from '../context/pedidos/pedidosContext';
import { doc, onSnapshot } from 'firebase/firestore';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const ProgresoPedido = () => {

    const router = useRouter();

    const { idpedido } = useContext(PedidoContext);

    const [tiempo, guardarTiempo] = useState(0);
    const [completado, guardarCompletado] = useState(false);

    useEffect(() => {
        const obtenerProducto = () => {
            const docRef = doc(firebase.db, 'ordenes', idpedido);
            const unsubscribe = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    guardarTiempo(doc.data().tiempoentrega);
                    guardarCompletado(doc.data().completado);
                }
            });

            return () => unsubscribe();
        };

        obtenerProducto();
    }, []);

    const renderer = ({ minutes, seconds }) => {
        return (
            <Text style={styles.tiempo}>{minutes}:{seconds} </Text>
        )
    }

    return (
        <View style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, { marginTop: 50 }]}>
                {tiempo === 0 && (
                    <>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Hemos recibido tu orden...</Text>
                        <Text style={{ textAlign: 'center', fontSize: 16 }}>Estamos calculando el tiempo de entrega</Text>
                    </>
                )}

                {!completado && tiempo > 0 && (
                    <>
                        <Text style={{ textAlign: 'center' }}>Su orden estará lista en:  </Text>
                        <Text>
                            <Countdown
                                date={Date.now() + tiempo * 60000}
                                renderer={renderer}
                            />
                        </Text>
                    </>
                )}

                {completado && (
                    <>
                        <Text style={styles.textoCompletado}>Orden Lista</Text>
                        <Text style={styles.textoCompletado}>Por favor, pase a recoger su pedido</Text>

                        <Button style={[globalStyles.boton, { marginTop: 100 }]}
                            block
                            onPress={() => router.push('/NuevaOrden')}
                        >
                            <Text style={globalStyles.botonTexto}>Comenzar Una Orden Nueva</Text>
                        </Button>

                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 80,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})

export default ProgresoPedido;