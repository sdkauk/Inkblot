import { useAuth } from "@/hooks/useAuth";
import { SplashScreenController } from "@/hooks/useSplashScreen";
import { AuthProvider } from "@/providers/Auth0Provider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <SplashScreenController />
          <RootNavigator />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}
