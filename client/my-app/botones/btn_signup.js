import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function ButtonSignUp() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('SignUp')}
        >
                <Text style={styles.text}>Registrate</Text>
        </TouchableOpacity>
    );
} 

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginLeft: 8,
    },

    text: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    },
});