import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "../firebase";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      setUser(user);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing)
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#FFDA00" />
      </View>
    );

  if (user) {
    return <Redirect href="/NuevaOrden" />;
  } else {
    return <Redirect href="/Login" />;
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
