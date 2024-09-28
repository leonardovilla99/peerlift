import { SplashScreen, Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
}; 

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
            
                <RootLayoutNav/>
            
        </ClerkProvider>
        );
}

function RootLayoutNav() {
  const {isLoaded,isSignedIn} = useAuth();
  useEffect(() => {
    if(isLoaded && !isSignedIn){
        router.push("./(modal)/login")
    }else if (isLoaded && isSignedIn){
        router.push("./(tabs)/home")
    }
  }, [isLoaded])

  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modal)/login" options={{
            presentation: 'modal',
            headerShown: false
        }}/>
        <Stack.Screen name="(modal)/register" options={{
            presentation: 'modal',
            headerShown: false
        }}/>
    </Stack>
  );
}
