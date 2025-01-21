import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Historial = ({ navigation }) => {
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    async function fetchData() {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await fetch(`http://192.168.1.6:3000/historial/${userId}`);
            const data = await response.json();
            setHistorial(data);
        } catch (error) {
            console.error("Error al obtener historial:", error);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={historial}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.nombre_planta}</Text>
                        <Text style={styles.details}>Fecha de consulta: {item.consulta}</Text>
                        {/* Agrega aquí más campos que desees mostrar */}
                    </View>
                )}
                ListHeaderComponent={() => <Text style={styles.title_1}>Historial</Text>}
                contentContainerStyle={styles.contentContainerStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2FFE9',
        marginTop: 30,
    },
    contentContainerStyle: {
        padding: 15,
    },
    item: {
        backgroundColor: '#E1F0DA',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    title_1: {
        fontSize: 38,
        fontWeight: '900',
        textAlign: 'left',
        margin: 10,
        color: '#294B29',
        marginTop: 30,
    },
    details: {
        marginTop: 5,
        fontSize: 16,
    },
});

export default Historial;
