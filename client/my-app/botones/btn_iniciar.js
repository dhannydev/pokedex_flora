import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function ButtonIniciar({onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#B99470', '#5F6F52']}
                start={{x: 0, y: 0}}
                end={{x: .8, y: 1}}
                style={styles.button}
            >
                <Text style={styles.text}>Iniciar sesión</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 200,
        marginTop: 110,
    },

    text: {
        fontSize: 22,
        color: '#FEFAE0',
        fontWeight: 'bold',
    },

    button: {
        width: '80%',
        height: 45,
        borderRadius: 25,
        padding: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
});