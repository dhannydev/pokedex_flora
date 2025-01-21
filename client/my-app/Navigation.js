import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Historial from "./screens/Historial";
import Escaneo from "./screens/Escaneo";
import Inicio from "./screens/Inicio";
import Planta from "./screens/Planta";
import Usuarios from "./screens/Usuarios";
import Historial_admin from "./screens/Historial_admin";
import { TabButton } from "./components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  const tabs = [
    {
      id: 1,
      title: "Historial",
      screen: "Historial",
      icon: "history",
      Component: Historial,
    },
    {
      id: 2,
      title: "Inicio",
      screen: "Inicio",
      icon: "home",
      Component: Inicio,
    },
    {
      id: 3,
      title: "Escaneo",
      screen: "Escaneo",
      icon: "qrcode-scan",
      Component: Escaneo,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName={"Inicio"}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {tabs.map((item, index) => (
        <Tab.Screen
          key={item.id}
          name={item.screen}
          component={item.Component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton item={item} {...props} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

function Home_Admin() {
  const tabs = [
    {
      id: 1,
      title: "Historial",
      screen: "Historial_Admin",
      icon: "history",
      Component: Historial_admin,
    },
    {
      id: 2,
      title: "Usuarios",
      screen: "Usuarios",
      icon: "account",
      Component: Usuarios,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName={"Inicio"}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {tabs.map((item, index) => (
        <Tab.Screen
          key={item.id}
          name={item.screen}
          component={item.Component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton item={item} {...props} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
function Auth(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeA"
          component={Home_Admin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Planta"
          component={Planta} // Agregamos la navegación a Planta.js
          options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
              color: "#294B29",
            },
            headerStyle: {
              backgroundColor: "#F2FFE9",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Auth;

const styles = StyleSheet.create({
  tabBar: {
    height: 70, // Altura del nav
    position: "absolute", // Actua como si noestuviera con los demas
    bottom: 20, // Lo elevamos 25px arriba
    marginHorizontal: 16, // Aplica un margen a ambos lados del nav
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 0.5, // Anchura del borde
    borderColor: "#dadada", // Color del borde
  },
});
