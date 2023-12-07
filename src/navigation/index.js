
import React from 'react';
import {AuthenticationProvider} from '../context/Authentication';
import Navigator from './Navigator';
import {ClienteProvider} from '../context/ClienteProvider';
import {ImovelProvider} from '../context/ImovelProvider';
import {ProprietarioProvider} from '../context/ProprietarioProvider';
import {ApiProvider} from '../context/ApiProvider';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {COLORS} from '../assets/colors';
import {UserProvider} from '../context/UserProvider';
import {NotificationsProvider} from '../context/NotificationsProvider';

const theme = createTheme({
  lightColors: {
    primary: COLORS.primary,
    primaryDark: COLORS.primaryDark,
    secondary: COLORS.accent,
    accentSecundary: COLORS.accentSecundary,
    background: COLORS.white,
    error: COLORS.errror,
    transparent: COLORS.transparent,
  },
  darkColors: {
    primary: COLORS.primary,
    secondary: COLORS.accent,
  },
  mode: 'light',
  components: {
    Button: {
      containerStyle: {
        width: '85%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10,
        backgroundColor: COLORS.accent,
        borderRadius: 5,
      },
      buttonStyle: {
        height: 48,
        backgroundColor: COLORS.accent,
        borderRadius: 3,
      },
      titleStyle: {color: COLORS.white},
    },
    ButtonGroup: {
      containerStyle: {
        height: 35,
        marginTop: 20,
        marginBottom: 20,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.white,
      },
      buttonStyle: {
        height: 32,
      },
      textStyle: {color: COLORS.primary},
      innerBorderStyle: {color: COLORS.primary},
    },
    Image: {
      containerStyle: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120 / 2,
        backgroundColor: COLORS.transparent,
      },
    },
    Input: {
      inputContainerStyle: {
        borderBottomColor: COLORS.primary,
      },
    },
  },
});

export default function Providers() {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <NotificationsProvider>
          <ApiProvider>
            <UserProvider>
              <ClienteProvider>
                <ImovelProvider>
                  <ProprietarioProvider>
                    <Navigator />
                  </ProprietarioProvider>
                </ImovelProvider>
              </ClienteProvider>
            </UserProvider>
          </ApiProvider>
        </NotificationsProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
}
