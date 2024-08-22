import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { useRouter } from 'expo-router';
import { List, Image, Text, View } from 'native-base';

import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const Menu = () => {

    const router = useRouter();

    // Context de Firebase 
    const { menu, obtenerProductos } = useContext(FirebaseContext);

    // Context de pedido
    const { seleccionarPlatillo } = useContext(PedidoContext);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const mostrarHeading = (categoria, i) => {
        if (i > 0) {
            const categoriaAnterior = menu[i - 1].categoria;
            if (categoriaAnterior !== categoria) {
                return (
                    <View style={styles.separador}>
                        <Text style={styles.separadorTexto}> {categoria} </Text>
                    </View>
                )
            }
        } else {
            return (
                <View style={styles.separador}>
                    <Text style={styles.separadorTexto}> {categoria} </Text>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={globalStyles.contenedor}>
            <ScrollView>
                <View style={{ backgroundColor: '#FFF' }}>
                    <List>
                        {menu.map((platillo, i) => {
                            const { imagen, nombre, descripcion, categoria, precio, id } = platillo;
                            return (
                                <Fragment key={id}>
                                    {mostrarHeading(categoria, i)}
                                    <TouchableOpacity
                                        onPress={() => {
                                            // Eliminar algunas propiedades del platillo
                                            const { existencia, ...platillo2 } = platillo;
                                            seleccionarPlatillo(platillo2);
                                            router.push('/DetallePlatillo')
                                        }}
                                    >
                                        <View style={styles.card}>
                                            <Image
                                                size={100}
                                                source={{ uri: imagen }}
                                                alt='imagen platillo'
                                            />
                                            <View>
                                                <Text>{nombre} </Text>
                                                <Text
                                                    note
                                                    numberOfLines={2}
                                                >
                                                    {descripcion}
                                                </Text>
                                                <Text>Precio: $ {precio} </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Fragment>
                            )
                        })}
                    </List>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000',
    },
    separadorTexto: {
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
    }
})

export default Menu;