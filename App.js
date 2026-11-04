import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { MoedasProvider } from './src/MoedasContext';
import Inicio from './src/screens/Inicio';
import Sobre from './src/screens/Sobre';
import ListaMoedas from './src/screens/ListaMoedas';
import Favoritas from './src/screens/Favoritas';
import Converter from './src/screens/Converter';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// abas que ficam dentro do menu Moedas
function MoedasTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1b8a5a',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="ListaMoedas"
        component={ListaMoedas}
        options={{
          tabBarLabel: 'Moedas',
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favoritas"
        component={Favoritas}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Converter"
        component={Converter}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="swap-horizontal" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// menu lateral (drawer)
export default function App() {
  return (
    <SafeAreaProvider>
      <MoedasProvider>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#1b8a5a' },
              headerTintColor: '#fff',
              drawerActiveTintColor: '#1b8a5a',
            }}
          >
            <Drawer.Screen
              name="Início"
              component={Inicio}
              options={{
                drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
              }}
            />
            <Drawer.Screen
              name="Sobre"
              component={Sobre}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="information-circle-outline" size={size} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="Moedas"
              component={MoedasTabs}
              options={{
                drawerIcon: ({ color, size }) => <Ionicons name="cash-outline" size={size} color={color} />,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </MoedasProvider>
    </SafeAreaProvider>
  );
}
