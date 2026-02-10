import {
  colors,
  fonts,
  fontSize,
  ink,
  lineHeight,
  opacity,
  spacing,
} from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Login() {
  const { login, signup } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>Inkblot</Text>
        <Text style={styles.subtitle}>A place to think.</Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.buttons}>
          <Pressable style={styles.filledButton} onPress={signup}>
            <Text style={styles.filledButtonText}>Sign Up</Text>
          </Pressable>
          <Pressable style={styles.outlineButton} onPress={login}>
            <Text style={styles.outlineButtonText}>Log In</Text>
          </Pressable>
        </View>

        <Pressable style={styles.offlineLink} onPress={() => {}}>
          <Text style={styles.offlineLinkText}>Continue offline</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 48,
    color: ink(opacity.full),
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: ink(opacity.medium),
    marginTop: spacing.sm,
    textAlign: "center",
  },
  bottom: {
    paddingBottom: spacing.xxl,
  },
  buttons: {
    gap: spacing.sm,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: ink(opacity.full),
    borderRadius: 4,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  outlineButtonText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: ink(opacity.full),
  },
  filledButton: {
    backgroundColor: ink(opacity.full),
    borderRadius: 4,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  filledButtonText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    color: colors.background,
  },
  offlineLink: {
    alignItems: "center",
    paddingVertical: spacing.lg,
    marginTop: spacing.md,
  },
  offlineLinkText: {
    fontFamily: fonts.sans,
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    color: ink(opacity.light),
  },
});
