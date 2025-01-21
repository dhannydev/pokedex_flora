import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import logoImage from "../public/img/logo.png";
import ButtonRegistrar from "../botones/btn_registrar";
import ButtonLogin from "../botones/btn_login";

const SignUp = ({navigation}) => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handleRegistro = async () => {
    if (contrasena === confirmarContrasena) {
      try {
        const response = await fetch("http://192.168.70.156:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuario, email, contrasena }),
        });

        if (response.ok) {
          console.log("Usuario Creado");
          setUsuario("");
          setEmail("");
          setContrasena("");
          setConfirmarContrasena("");
          // Aquí puedes realizar acciones adicionales después del registro exitoso
          navigation.navigate('Login');
        } else {
          console.error("Error al crear usuario");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    } else {
      console.error("Las contraseñas no coinciden");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={logoImage} style={styles.image} resizeMode="contain" />
      <View style={styles.container}>
        <Text style={styles.titulo}>Hola!</Text>
        <Text style={styles.subtitulo}>Registrate</Text>
        <View style={styles.container1}>
          <TextInput
            placeholder="Usuario"
            style={styles.textInput}
            value={usuario}
            onChangeText={setUsuario}
          />
          <TextInput
            placeholder="example@email.com"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.textInput}
            secureTextEntry={true}
            value={contrasena}
            onChangeText={setContrasena}
          />
          <TextInput
            placeholder="Confirmar Contraseña"
            style={styles.textInput}
            secureTextEntry={true}
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
          />
        </View>
        <ButtonRegistrar onPress={handleRegistro} />
        <View style={styles.yatienesCContainer}>
          <Text style={styles.yatienesC}>Ya tienes una cuenta,</Text>
          <ButtonLogin />
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default SignUp;

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
    marginTop: 20,
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

  yatienesCContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 55,
  },

  yatienesC: {
    fontSize: 20,
    color: "gray",
  },
});
