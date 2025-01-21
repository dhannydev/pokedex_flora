import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import logoImage from "../public/img/logo.png";
import ButtonIniciar from "../botones/btn_iniciar";
import ButtonSignUp from "../botones/btn_signup";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://192.168.1.6:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, contrasena }),
            });

            if (response.ok) {
                const responseData = await response.json(); // Obtener datos de la respuesta
            
                // Verificar si los datos de usuario están presentes y son válidos
                if (responseData && responseData.user && responseData.user.id) {
                    const userId = responseData.user.id; // Obtener ID de usuario
                    const userEmail = responseData.user.email; // Obtener email de usuario
                    await AsyncStorage.setItem('userId', userId.toString()); // Almacenar ID de usuario en AsyncStorage
                    console.log("Inicio de sesión exitoso");
                    setEmail("");
                    setContrasena("");
                    // Redirigir al usuario a la pantalla de inicio dependiendo del rol
                    if (userEmail === "admin@example.com") { // Aquí debes cambiar "admin@example.com" por el correo del usuario administrador
                        navigation.navigate('HomeA');
                    } else {
                        navigation.navigate('Home');
                    }
                } else {
                    console.error("No se pudo obtener el ID del usuario de los datos de respuesta");
                    // Manejar el caso en el que no se puede obtener el ID del usuario de los datos de respuesta
                }
            } else {
                console.error("Credenciales incorrectas");
                // Manejar error de credenciales incorrectas
            }
            
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <Image source={logoImage} style={styles.image} resizeMode="contain" />
            <View style={styles.container}>
                <Text style={styles.titulo}>Hola!</Text>
                <Text style={styles.subtitulo}>Inicia sesión para comenzar</Text>
                <View style={styles.container1}>
                    <TextInput
                        placeholder="example@email.com"
                        style={styles.textInput}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="contraseña"
                        style={styles.textInput}
                        secureTextEntry={true}
                        value={contrasena}
                        onChangeText={setContrasena}
                    />
                </View>
                <ButtonIniciar onPress={handleLogin}/>
                <View style={styles.notienesCContainer}>
                    <Text style={styles.notienesC}>No tienes cuenta,</Text>
                    <ButtonSignUp />
                </View>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#f1f1f1",
    },

    container: {
        flex: 1,
        alignItems: "center",
    },

    container1: {
        alignItems: "center",
        width: "80%",
        marginTop: 50,
    },

    titulo: {
        fontSize: 60,
        color: "#34434D",
        fontWeight: "bold",
        marginTop: -65,
    },

    subtitulo: {
        fontSize: 20,
        color: "green",
    },

    textInput: {
        padding: 10,
        paddingStart: 30,
        width: "100%",
        height: 50,
        marginTop: 15,
        borderRadius: 30,
        backgroundColor: "white",
        fontSize: 16,
    },

    image: {
        width: "40%",
        alignSelf: "center",
    },

    notienesCContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 90,
    },

    notienesC: {
        fontSize: 20,
        color: "gray",
    },
});
