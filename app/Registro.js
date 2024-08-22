import React, { useContext, useState } from "react";
import { Center, Box, Heading, VStack, FormControl, Input, Button } from 'native-base';
import { useRouter } from 'expo-router';
import FirebaseContext from '../context/firebase/firebaseContext';

export default function Registro() {
    const router = useRouter();
    const { Register } = useContext(FirebaseContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async ({ email, password, router }) => {
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        await Register(email, password, router);
    };

    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }} fontWeight="semibold">
                    Bienvenido
                </Heading>
                <Heading mt="1" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }} fontWeight="medium" size="xs">
                    Regístrate para continuar
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
                    <FormControl>
                        <FormControl.Label>Confirmar Contraseña</FormControl.Label>
                        <Input
                            type="password"
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword}
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
                        onPress={() => handleRegister({ email, password, router })}
                    >
                        Registrarse
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}
