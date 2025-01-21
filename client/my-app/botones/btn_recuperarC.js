import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';


export default function ButtonRecuperarC() {
    return (
        <TouchableOpacity style={styles.container}>
                <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 35,
    },

    text: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    },
});