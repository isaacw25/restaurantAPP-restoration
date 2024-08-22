import React, { useState, useContext, useEffect } from 'react';
import { Alert, View, TouchableOpacity } from 'react-native';
import { Icon, Button, Text } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {

    // state para cantidades
    const [cantidad, guardarCantidad] = useState(1);
    const [total, guardarTotal] = useState(0);

    // context
    const { platillo, guardarPedido } = useContext(PedidoContext);
    const { precio } = platillo;

    // redireccionar
    const router = useRouter();

    // En cuanto el componente carga, calcular la cantidad a pagar
    useEffect(() => {
        calcularTotal();
    }, [cantidad]);

    // Calcula el total del platillo por su cantidad
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    }

    // Decrementa en uno
    const decrementarUno = () => {
        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);
        }
    }


    // incrementa en uno la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }

    // Confirma si la orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Almacenar el pedido al pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }

                        // console.log(pedido);
                        guardarPedido(pedido);

                        // Navegar hacia el Resumen
                        router.push('/ResumenPedido');
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Text style={[globalStyles.titulo, { paddingTop: 25, textAlign: 'center' }]}>Cantidad</Text>
                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                    <TouchableOpacity
                        style={{ width: 80, height: 80, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => decrementarUno()}
                    >
                        <Icon as={FontAwesome} size="5" color="white" name="minus" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, marginHorizontal: 20 }}>{cantidad}</Text>
                    <TouchableOpacity
                        style={{ width: 80, height: 80, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => incrementarUno()}
                    >
                        <Icon as={FontAwesome} size="5" color="white" name="plus" />
                    </TouchableOpacity>
                </View>
                <Text style={[globalStyles.cantidad, { textAlign: 'center', marginTop: 20, paddingTop: 25 }]}>Subtotal: $ {total} </Text>
            </View>

            <TouchableOpacity
                style={{ backgroundColor: '#FFDA00', height: 60, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => confirmarOrden()}
            >
                <Text style={globalStyles.botonTexto}>Agregar al pedido</Text>
            </TouchableOpacity>
        </View>
    );
}

export default FormularioPlatillo;