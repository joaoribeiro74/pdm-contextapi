import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity } from "react-native";
import useAuth from "../firebase/hooks/useAuth";
import StyledLogout from "./StyledLogout";
import { useTheme } from "../context/ThemeContext"; // Importando o useTheme para acessar o toggleTheme
import Ionicons from "react-native-vector-icons/Ionicons";

interface HeaderRightProps {
  showEmail?: boolean;
}

export default function HeaderRight({ showEmail = true }: HeaderRightProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useTheme(); // Acessando o toggleTheme

  const themeIcon = theme === "light" ? (
    <Ionicons name="moon" size={24} color="#323232" />
  ) : (
    <Ionicons name="sunny" size={24} color="#f6f6f6" />
  );

  return (
    <>
      {/* Exibir o botão para alternar tema */}
      <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 10 }}>
        {themeIcon}
      </TouchableOpacity>
      <StyledLogout
        onPress={async () => {
          try {
            await logout();
            router.replace('/');
            console.log("Clicado!");
          } catch (error: any) {
            Alert.alert("Erro de Logout", error.toString());
          }
        }}
        title={"Logout"}
        style={{  }}
      />
    </>
  );
}
