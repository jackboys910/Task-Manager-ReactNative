import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { useThemeStore } from '@/store/useThemeStore';
import { darkTheme } from '@/constants/darkTheme';

import 'react-native-reanimated';
import Navbar from '@/components/Navbar';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    (async () => {
      const existingPermissions = await Notifications.getPermissionsAsync();
      if (!existingPermissions.granted) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission for notifications is required!');
        }
      }
    })();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { theme } = useThemeStore();

  return (
    <ThemeProvider value={theme === 'dark' ? darkTheme : DefaultTheme}>
      <Navbar />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
