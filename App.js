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

// ===== configuracoes do app (mudar aqui) =====
const COR_PRINCIPAL = '#1b8a5a';   // cor do cabecalho, aba ativa e menu ativo
const COR_TEXTO_HEADER = '#fff';   // cor do titulo e do icone do cabecalho
const COR_ABA_INATIVA = 'gray';    // cor das abas nao selecionadas
const LADO_DO_MENU = 'left';       // 'left' (esquerda) ou 'right' (direita)
const ALINHAMENTO_TITULO = 'center'; // 'center' ou 'left'

// icones (nomes em https://icons.expo.fyi, biblioteca Ionicons)
const ICONE_INICIO = 'home-outline';
const ICONE_SOBRE = 'information-circle-outline';
const ICONE_MENU_MOEDAS = 'cash-outline';
const ICONE_ABA_MOEDAS = 'list';
const ICONE_ABA_FAVORITAS = 'star';
const ICONE_ABA_CONVERTER = 'swap-horizontal';
// =============================================

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// abas que ficam dentro do menu Moedas
function MoedasTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COR_PRINCIPAL,
        tabBarInactiveTintColor: COR_ABA_INATIVA,
      }}
    >
      <Tab.Screen
        name="ListaMoedas"
        component={ListaMoedas}
        options={{
          tabBarLabel: 'Moedas',
          tabBarIcon: ({ color, size }) => <Ionicons name={ICONE_ABA_MOEDAS} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favoritas"
        component={Favoritas}
        options={{
          tabBarLabel: 'Favoritas',
          tabBarIcon: ({ color, size }) => <Ionicons name={ICONE_ABA_FAVORITAS} size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Converter"
        component={Converter}
        options={{
          tabBarLabel: 'Converter',
          tabBarIcon: ({ color, size }) => <Ionicons name={ICONE_ABA_CONVERTER} size={size} color={color} />,
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
              drawerPosition: LADO_DO_MENU,
              headerTitleAlign: ALINHAMENTO_TITULO,
              headerStyle: { backgroundColor: COR_PRINCIPAL },
              headerTintColor: COR_TEXTO_HEADER,
              drawerActiveTintColor: COR_PRINCIPAL,
            }}
          >
            <Drawer.Screen
              name="Início"
              component={Inicio}
              options={{
                title: 'Início',
                drawerIcon: ({ color, size }) => <Ionicons name={ICONE_INICIO} size={size} color={color} />,
              }}
            />
            <Drawer.Screen
              name="Sobre"
              component={Sobre}
              options={{
                title: 'Sobre',
                drawerIcon: ({ color, size }) => <Ionicons name={ICONE_SOBRE} size={size} color={color} />,
              }}
            />
            <Drawer.Screen
              name="Moedas"
              component={MoedasTabs}
              options={{
                title: 'Moedas',
                drawerIcon: ({ color, size }) => <Ionicons name={ICONE_MENU_MOEDAS} size={size} color={color} />,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </MoedasProvider>
    </SafeAreaProvider>
  );
}
