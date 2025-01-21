import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { useNavigation } from '@react-navigation/native'; // Importar hook de navegación

export default function Escaneo() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation(); // Obtener objeto de navegación

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Navegar a la pantalla Planta y pasar la URL escaneada como parámetro
    navigation.navigate('Planta', { url: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={styles.buttonContainer}>
        {scanned && (
          <TouchableOpacity
            onPress={() => setScanned(false)}
            style={styles.btn_again}
          >
            <Text style={styles.buttonText}>Nuevo escaneo</Text>
          </TouchableOpacity>
        )}
      </View>
      <StatusBar style="auto" backgroundColor="#F2FFE9" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFE9',
    alignItems: 'center',
    justifyContent: "center",
  },

  barcodebox: {
    backgroundColor: '#F2FFE9',
    alignItems: 'center',
    justifyContent: 'center', 
    height: 400,
    width: 330,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
    top: -100,
  },

  buttonContainer: {
    width: 200,
    height: 50,
    borderRadius: 30,
  },

  btn_again: {
    backgroundColor: '#79AC78',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
