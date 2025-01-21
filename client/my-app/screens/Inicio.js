import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const Inicio = () => {
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={[styles.welcome, styles.textTop]}>Bienvenido de nuevo</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle_1}>Misión:</Text>
                    <View style={styles.stepBox}>
                        <Text style={styles.infoText}>
                            Nuestra misión es proporcionar una aplicación fácil de usar que permita a los usuarios aprender sobre plantas de manera interactiva y educativa.
                        </Text>
                    </View>
                    <Text style={styles.infoTitle_2}>Visión:</Text>
                    <View style={styles.stepBox}>
                        <Text style={styles.infoText}>
                            Nuestra visión es convertirnos en la principal plataforma para aprender sobre plantas, brindando información precisa y útil para usuarios de todas las edades y niveles de experiencia.
                        </Text>
                    </View>
                </View>
                <View style={styles.stepContainer}>
                    <Text style={styles.steps}>¿Cómo funciona?</Text>
                    <ScrollView
                        style={styles.stepsScrollView}
                        contentContainerStyle={styles.stepsScrollContainer}
                    >
                        <View style={styles.stepBox}>
                            <Text style={styles.step}>1. Ve a la pestaña de escaneo</Text>
                        </View>
                        <View style={styles.stepBox}>
                            <Text style={styles.step}>2. Escanea el código QR correspondiente</Text>
                        </View>
                        <View style={styles.stepBox}>
                            <Text style={styles.step}>3. Una vez escaneado, te mostrará la información de la planta</Text>
                        </View>
                        <View style={styles.stepBox}>
                            <Text style={styles.step}>4. Contesta el formulario de Google Forms que aparece para ver qué tanto aprendiste de la planta</Text>
                        </View>
                        <View style={styles.stepBox}>
                            <Text style={styles.step}>5. Si deseas consultar las plantas ya escaneadas, ve a historial y selecciona un registro</Text>
                        </View>
                    </ScrollView>
                </View>
                <StatusBar style="auto" backgroundColor="#F2FFE9" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F2FFE9',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        marginTop: 30,
    },
    welcome: {
        fontSize: 38,
        fontWeight: '900',
        textAlign: 'left',
        margin: 10,
        color: '#294B29'
    },
    textTop: {
        textAlignVertical: 'top',
    },
    infoContainer: {
        marginTop: 40,
    },
    infoTitle_1: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 0,
        textAlign: 'center',
    },
    infoTitle_2: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    stepContainer: {
        marginTop: 20,
    },
    steps: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    stepBox: {
        backgroundColor: '#E1F0DA',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    step: {
        fontSize: 18,
        marginBottom: 5,
    },
    stepsScrollView: {
        maxHeight: 255,
    },
    stepsScrollContainer: {
        paddingBottom: 20,
    },
});

export default Inicio;