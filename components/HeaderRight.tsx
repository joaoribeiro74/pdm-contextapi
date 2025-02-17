import { useRouter } from "expo-router";
import { Alert, Text } from "react-native";

import useAuth from "../firebase/hooks/useAuth";
import StyledLogout from "./StyledLogout";

interface HeaderRightProps {
  showEmail?: boolean;
}

export default function HeaderRight({showEmail = true}: HeaderRightProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <>
      {showEmail && <Text style={{fontSize: 10, fontWeight: "600", textDecorationLine: 'underline', fontStyle: 'italic'}}>{user?.email}</Text> }
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
