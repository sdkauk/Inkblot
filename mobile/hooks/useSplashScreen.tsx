import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "./useAuth";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuth();

  if (!isLoading) {
    SplashScreen.hide();
  }

  return null;
}
