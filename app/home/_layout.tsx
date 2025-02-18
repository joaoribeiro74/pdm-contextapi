import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeLayout() {
  const { theme } = useTheme();

  return (
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme === "light" ? "#ffffff" : "#0d171c", // Define a cor do header
          },
          headerTintColor: theme === "light" ? "#000" : "#fff", // Define a cor do texto do header
        }}
      />
  );
}
