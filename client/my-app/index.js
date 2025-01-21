import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text } from "react-native";
import Home from "./screens/Inicio";
import Escaneo from "./screens/Escaneo";
import Historial from "./screens/Historial";
import Planta from "./screens/Planta";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {TabButton} from './components';


const Tab = createBottomTabNavigator();

export default () => {
    const tabs = [
        {
            id: 1,
            title: 'Historial',
            screen: 'Historial',
            icon: 'history',
            Component: Historial,
        },
        {
            id: 2,
            title: 'Home',
            screen: 'Home',
            icon: 'home',
            Component: Home,
        },
        {
            id: 3,
            title: 'Escaneo',
            screen: 'Escaneo',
            icon: 'qrcode-scan',
            Component: Escaneo,
        },
    ]

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={"Home"}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar
                }}
            >
                {
                    tabs.map ((item, index) => 
                        <Tab.Screen
                            key={item.id}
                            name={item.screen}
                            component={item.Component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabButton item={item} {...props}/>                            }}
                        />
                    )
                }
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create ({
    tabBar: {
        height: 70, // Altura del nav
        position: 'absolute', // Actua como si noestuviera con los demas
        bottom: 20, // Lo elevamos 25px arriba
        marginHorizontal: 16, // Aplica un margen a ambos lados del nav
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 0.5, // Anchura del borde
        borderColor: '#dadada', // Color del borde
    }
})