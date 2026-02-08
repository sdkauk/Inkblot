import {
  colors,
  fonts,
  fontSize,
  ink,
  opacity,
  spacing,
} from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Login() {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Inkblot</Text>
        <Text style={styles.subtitle}>A place to think.</Text>
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between",
    paddingTop: "30%",
    paddingBottom: spacing.xxl,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 64,
    color: ink(opacity.full),
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: fontSize.body,
    color: ink(opacity.medium),
    marginTop: spacing.sm,
  },
  button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: ink(opacity.full),
    borderRadius: 4,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.body,
    color: ink(opacity.full),
  },
});
