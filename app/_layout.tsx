import { Stack } from "expo-router";
import { LogBox, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";

// Components
import BotonResumen from "../components/ui/BotonResumen";

// importar state de context
import FirebaseState from "../context/firebase/firebaseState";
import PedidoState from "../context/pedidos/pedidosState";

LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function RootLayout() {
  return (
    <FirebaseState>
      <PedidoState>
        <NativeBaseProvider>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "#FFDA00",
              },
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTintColor: "#000",
            }}
          >
            <Stack.Screen
              name="Login"
              options={{
                title: "Iniciar Sesión",
                headerBackVisible: false,
              }}
            />

            <Stack.Screen
              name="Registro"
              options={{
                title: "Registrarse",
              }}
            />

            <Stack.Screen
              name="NuevaOrden"
              options={{
                title: "Nueva Orden",
                headerBackVisible: false,
              }}
            />

            <Stack.Screen
              name="Menu"
              options={{
                title: "Nuestro Menú",
                headerRight: (props) => <BotonResumen />,
              }}
            />

            <Stack.Screen
              name="DetallePlatillo"
              options={{
                title: "Detalle Platillo",
              }}
            />

            <Stack.Screen
              name="FormularioPlatillo"
              options={{
                title: "Ordenar Platillo",
              }}
            />

            <Stack.Screen
              name="ResumenPedido"
              options={{
                title: "Resumen Pedido",
              }}
            />

            <Stack.Screen
              name="ProgresoPedido"
              options={{
                title: "Progreso de Pedido",
              }}
            />
          </Stack>
        </NativeBaseProvider>
      </PedidoState>
    </FirebaseState>
  );
}
