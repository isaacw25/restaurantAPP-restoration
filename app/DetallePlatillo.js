import React, { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import { useRouter } from 'expo-router';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const DetallePlatillo = () => {
    const { platillo } = useContext(PedidoContext);
    const { nombre, imagen, descripcion, precio } = platillo;

    // Redireccionar
    const router = useRouter();

    return (
        <View style={globalStyles.contenedor}>
            <View style={globalStyles.contenido}>
                <Text style={[globalStyles.titulo, { paddingTop: 25 }]}>{nombre}</Text>
                <View>
                    <Image style={globalStyles.imagen} source={{ uri: imagen }} />
                    <Text style={{ marginTop: 20 }}>{descripcion}</Text>
                    <Text style={[globalStyles.cantidad, { paddingTop: 25 }]}>Precio: $ {precio}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={{ backgroundColor: '#FFDA00', height: 60, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => router.push('/FormularioPlatillo')}
            >
                <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DetallePlatillo;
