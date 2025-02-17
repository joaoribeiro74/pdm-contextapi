import {
  Text,
  TouchableOpacityProps,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import globalStyles from "../styles/globalStyles";
import { useState } from "react";

type StyledButtonProps = {
  title: string;
} & TouchableOpacityProps;

export default function StyledButton({ title, ...props }: StyledButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handlePressIn = () => {
    setIsActive(true); // Ativa o estilo de pressionado
  };

  const handlePressOut = () => {
    setIsActive(false); // Desativa o estilo de pressionado
  };

  return (
    <TouchableOpacity {...props} style={[styles.button, props.style, isActive && styles.active]}
    onPressIn={handlePressIn} // Detecta quando o botão é pressionado
    onPressOut={handlePressOut}>
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    marginTop: 50,
    width: 200,
    height: 45,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "323232",
    backgroundColor: "#f6f6f6",
    boxShadow: "4px 4px #323232",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    boxShadow: "0px 0px #323232",
    transform: [{ translateX: 3 }, { translateY: 3 }],
    opacity: 1,
  }
});
