import React, { useContext } from "react";
import { View, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import { Button, Text } from 'native-base';
import globalStyles from '../styles/global';
import { useRouter } from 'expo-router';
import FirebaseContext from '../context/firebase/firebaseContext';

var height = Dimensions.get("window").height;

const NuevaOrden = () => {
    const router = useRouter();
    const { SignOut } = useContext(FirebaseContext);

    handleLogOut = () => {
        SignOut();
        ToastAndroid.show("Cerrando sesión...", ToastAndroid.SHORT);
        router.replace('/Login');
    }

    return (
        <View style={globalStyles.contenedor}>
            <View style={[globalStyles.contenido, styles.contenido]}>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Button
                        style={globalStyles.boton}
                        block
                        onPress={() => router.push('/Menu')}
                    >
                        <Text style={globalStyles.botonTexto}>Crear Nueva Orden</Text>
                    </Button>

                    <View style={styles.space} />

                    <Button
                        style={globalStyles.boton}
                        block
                        onPress={() => router.push('/Menu')}
                    >
                        <Text style={globalStyles.botonTexto}>Revisar Ordenes</Text>
                    </Button>
                </View>

                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Button
                        style={[globalStyles.boton, { marginBottom: height * 0.05 }]}
                        block
                        onPress={() => handleLogOut()}
                    >
                        <Text style={globalStyles.botonTexto}>Cerrar sesión</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    space: {
        height: 20, // Ajusta esta altura para cambiar el espacio entre los botones
    },
})

export default NuevaOrden;