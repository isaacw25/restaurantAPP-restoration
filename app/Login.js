import React, { useContext, useState } from "react";
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, Dimensions, ToastAndroid } from "react-native";
import { Center, Box, Heading, VStack, FormControl, Input, Button, HStack } from 'native-base';
import FirebaseContext from '../context/firebase/firebaseContext';

export default function Login() {
    const router = useRouter();
    const { SignIn } = useContext(FirebaseContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = async ({ email, password }) => {
        try {
            await SignIn(email, password);
            showToast();
            router.replace('/NuevaOrden');
        }
        catch (error) {
            alert(error.message);
        }
    };

    showToast = () => {
        ToastAndroid.show("Inicio de sesión exitoso", ToastAndroid.SHORT);
    }

    return (
        <Center w="100%" >
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Bienvenido
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Iniciar sesión para continuar
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Contraseña</FormControl.Label>
                        <Input
                            type="password"
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                            textContentType="password"
                        />
                    </FormControl>
                    <Button
                        mt="2"
                        _text={{
                            color: "black",
                            style: { fontWeight: "bold" }
                        }}
                        borderRadius="full"
                        style={{ backgroundColor: "#FFDA00" }}
                        onPress={() => handleLogIn({ email, password })}
                    >
                        Iniciar sesión
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            ¿Nuevo usuario?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/Registro')}>
                            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
                                Registrarse
                            </Text>
                        </TouchableOpacity>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
}
