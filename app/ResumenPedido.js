import React, { useContext, useEffect } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import { Text, Button, Image } from 'native-base';
import { useRouter } from 'expo-router';
import globalStyles from '../styles/global';
import firebase from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

    const router = useRouter();

    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);

        mostrarResumen(nuevoTotal)
    }

    // redirecciona a Progreso pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now()
                        }

                        try {
                            const docRef = await addDoc(collection(firebase.db, 'ordenes'), pedidoObj);
                            pedidoRealizado(docRef.id);
                            router.push('/ProgresoPedido')
                        } catch (error) {
                            console.log("Error:", error);
                        }
                    }
                },
                { text: 'Revisar', style: 'cancel' }
            ]
        )
    }

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas eliminar este artículo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                        eliminarProducto(id);
                    }
                },
                { text: 'Cancelar', style: 'cancel' }
            ]
        )
    }

    return (
        <View style={globalStyles.contenedor}>
            <View style={globalStyles.contenido}>
                <Text style={[globalStyles.titulo, { textAlign: 'center', marginVertical: 20, paddingTop: 25 }]}>Resumen Pedido</Text>
                {pedido.map((platillo, i) => {
                    const { cantidad, nombre, imagen, id, precio } = platillo;
                    return (
                        <View key={id + i} style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                            <Image
                                source={{ uri: imagen }}
                                style={{ width: 80, height: 80, borderRadius: 5, marginRight: 15 }}
                                alt='producto'
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{nombre}</Text>
                                <Text style={{ marginTop: 5 }}>Cantidad: {cantidad}</Text>
                                <Text>Precio: $ {precio}</Text>
                                <Button
                                    onPress={() => confirmarEliminacion(id)}
                                    full
                                    danger
                                    style={{ marginTop: 10, backgroundColor: '#D9534F', justifyContent: 'center' }}
                                >
                                    <Text style={[globalStyles.botonTexto, { color: '#FFF' }]}>ELIMINAR</Text>
                                </Button>
                            </View>
                        </View>
                    )
                })}

                <Text style={[globalStyles.cantidad, { textAlign: 'center', marginTop: 20, paddingTop: 25 }]}>Total a Pagar: $ {total}</Text>

                <Button
                    onPress={() => router.push('/Menu')}
                    style={{ marginTop: 30, backgroundColor: 'black', justifyContent: 'center' }}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF' }]}>SEGUIR PIDIENDO</Text>
                </Button>
            </View>

            <TouchableOpacity
                style={{ backgroundColor: '#FFDA00', height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                onPress={() => progresoPedido()}
            >
                <Text style={[globalStyles.botonTexto, { color: 'black' }]}>ORDENAR PEDIDO</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ResumenPedido;