import { useRouter } from "expo-router";
import Sneaker from "../types/Sneaker";
import StyledButton from "./StyledButton";
import { Alert, Text, View, StyleSheet } from "react-native";
import CardSneaker from "./CardSneaker";
import { MaskedText } from "react-native-mask-text";
import { useTheme } from "@/context/ThemeContext";


interface ViewDetailsProps {
    sneaker: Sneaker;
}

export default function ViewDetails({ sneaker }: ViewDetailsProps) {
    const router = useRouter();
    const { theme } = useTheme();

    const styles = theme === 'light' ? lightStyles : darkStyles;
  
    return (
    <View style={styles.container}>
      <CardSneaker sneaker={sneaker}>
        <View style={styles.row}>
            <View style={styles.priceContainer}>
                <MaskedText
                style={styles.price}
                type="currency"
                options={{
                    prefix: 'R$ ',
                    decimalSeparator: ',',
                    groupSeparator: '.',
                    precision: 2,
                }}
                >
                {sneaker.price.toString()}
                </MaskedText>
            </View>
            <View style={styles.buttonContainer}>
                <StyledButton
                    title="Detalhes →"
                    onPress={() => {
                    if (sneaker.id) {
                        router.push(`/home/${sneaker.id}/`);
                    } else {
                        Alert.alert(
                        "Erro na View",
                        "Não é possível acessar os detalhes do tênis porque ele não possui um ID!"
                        );
                    }
                    }}
                    style={{ width: "110%", marginTop: 0 }}
                />
            </View>
        </View>
        </CardSneaker>
      </View>
    );
  }

  const commonStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    buttonContainer: {
      alignItems: 'flex-end',
    },
    price: {
      fontWeight: "bold",
      fontSize: 15,
    },
  });
  
  const lightStyles = StyleSheet.create({
    ...commonStyles,
    price: {
      ...commonStyles.price,
      color: "#000", // Cor para o tema claro
    },
  });
  
  const darkStyles = StyleSheet.create({
    ...commonStyles,
    price: {
      ...commonStyles.price,
      color: "#f6f6f6", // Cor para o tema escuro
    },
  });