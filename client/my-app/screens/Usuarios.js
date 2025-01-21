import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet  } from 'react-native';

const Usuarios = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    async function fetchData() {
        try {
            const response = await fetch(`http://192.168.1.6:3000/allusers`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error al obtener el listado de usuarios:", error);
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>ID: {item.id}</Text>
                        <Text style={styles.title}>Usuario: {item.usuario}</Text>
                    </View>
                )}
                ListHeaderComponent={() => <Text style={styles.title_1}>Usuarios</Text>}
                contentContainerStyle={styles.contentContainerStyle}
            />

            <StatusBar style="auto" backgroundColor="#F2FFE9" />
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

export default Usuarios;
