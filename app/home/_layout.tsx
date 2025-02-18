import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeLayout() {
  const { colors } = useTheme();

  return (
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTintColor: colors.textColor,
        }}
      />
  );
}