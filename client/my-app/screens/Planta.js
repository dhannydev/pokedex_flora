import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native'; // Importar hook de ruta y navegación
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const Planta = () => {
  const [planta, setPlanta] = useState(null);
  const route = useRoute(); // Obtener objeto de ruta
  const navigation = useNavigation(); // Obtener objeto de navegación
  const { url } = route.params; // Obtener la URL del parámetro de navegación

  useEffect(() => {
    // Lógica para obtener la información de la planta, incluida la imagen, desde el servidor
    const fetchPlanta = async () => {
      try {
        const response = await axios.get(url);
        setPlanta(response.data);
      } catch (error) {
        console.error('Error al obtener la planta:', error);
      }
    };

    fetchPlanta();
  }, []);

  const handleSaveToHistory = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId && planta) {
        await axios.post('http://192.168.1.6:3000/historial', {
          id_usuario: userId,
          id_planta: planta.id,
          nombre_planta: planta.nombre
        });
        console.log('Historial guardado exitosamente');
        navigation.navigate('Escaneo'); // Navegar a la pantalla de Escaneo
      } else {
        console.error('No se encontró el ID del usuario o la información de la planta');
      }
    } catch (error) {
      console.error('Error al guardar en el historial:', error);
    }
  };
  const handleOpenLink = () => {
    if (planta && planta.cuestionario) {
      Linking.openURL(planta.cuestionario);
    } else {
      console.error('No se encontró el enlace del cuestionario');
    }
  };

  return (
    <View style={styles.container}>
      {planta && (
        <View>
          <Text style={styles.titulo_1}>Nombre:</Text>
          <Text style={styles.texto}>{planta.nombre}</Text>

          <Text style={styles.titulo}>Nombre científico:</Text>
          <Text style={styles.texto}>{planta.nombre_cientifico}</Text>

          <Text style={styles.titulo}>Ubicación:</Text>
          <Text style={styles.texto}>{planta.locacion}</Text>

          <Text style={styles.titulo}>Cuidados:</Text>
          <Text style={styles.texto}>{planta.cuidados}</Text>

          <Text style={styles.titulo}>Tiempo de vida:</Text>
          <Text style={styles.texto}>{planta.tiempo_vida}</Text>

          <Text style={styles.titulo}>Propiedades medicinales:</Text>
          <Text style={styles.texto}>{planta.propiedades_medicas}</Text>

          <Text style={styles.titulo}>Cuestionario:</Text>
          <View style={styles.buttonContainer_1}>
            <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
              <Text style={styles.linkText}>Acceder al formulario de Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveToHistory}>
              <Text style={styles.saveButtonText}>Guardar en historial</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFE9',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
  titulo_1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  texto: {
    fontSize: 20,
    marginBottom: 10,
  },
  linkButton: {
    backgroundColor: '#D9EDBF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  buttonContainer_1: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  saveButton: {
    backgroundColor: '#79AC78',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default Planta;
