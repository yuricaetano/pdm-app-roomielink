import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/SignIn/ForgotPassword';
import Preload from '../screens/Preload';
import Profile from '../screens/Profile';
import Cliente from '../screens/Cliente';
import Clientes from '../screens/Clientes';
import Imoveis from '../screens/Imoveis';
import Imovel from '../screens/Imovel';
import {COLORS} from '../assets/colors';
import Proprietarios from '../screens/Proprietarios';
import Proprietario from '../screens/Proprietario';
import {useTheme, Icon} from '@rneui/themed';
import {StatusBar} from 'react-native';
import Menu from '../screens/Menu';
import ProprietariosMap from '../screens/ProprietariosMap';
import Notificacoes from '../screens/Notificacoes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Preload"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function AppStack() {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Imoveis"
        component={Imoveis}
        options={{
          tabBarLabel: 'Imoveis',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="business"
              color={theme.colors.primary}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Menu}
        name="Menu"
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="list"
              color={theme.colors.primary}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Proprietarios"
        component={Proprietarios}
        options={{
          tabBarLabel: 'Proprietarios',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="people"
              color={theme.colors.primary}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={ProprietariosMap}
        name="ProprietariosMap"
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="map-sharp"
              color={theme.colors.primary}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Notificacoes}
        name="Notificacoes"
        options={{
          tabBarLabel: 'Notificacoes',
          tabBarIcon: () => (
            <Icon
              type="ionicon"
              name="notifications"
              color={theme.colors.primary}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Navigator = () => {
  const {theme} = useTheme();
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.background,
        },
        dark: theme.mode === 'light',
      }}>
      <StatusBar backgroundColor={theme.colors.primaryDark} />
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="AppStack" component={AppStack} />
        <Stack.Screen
          name="Cliente"
          component={Cliente}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Clientes"
          component={Clientes}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Imovel"
          component={Imovel}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Proprietario"
          component={Proprietario}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
