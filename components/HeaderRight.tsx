import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity } from "react-native";
import useAuth from "../firebase/hooks/useAuth";
import StyledLogout from "./StyledLogout";
import { useTheme } from "../context/ThemeContext"; // Importando o useTheme para acessar o toggleTheme

interface HeaderRightProps {
  showEmail?: boolean;
}

export default function HeaderRight({ showEmail = true }: HeaderRightProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme(); // Acessando o toggleTheme

  return (
    <>
      {/* Exibir o botão para alternar tema */}
      <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 10 }}>
        <Text style={{ color: "#007bff" }}>Mudar Tema</Text>
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
