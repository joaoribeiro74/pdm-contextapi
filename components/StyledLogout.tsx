import {
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    TouchableHighlight,
    TouchableHighlightProps
  } from "react-native";
  
  import globalStyles from "../styles/globalStyles";
  import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
  
  type StyledButtonProps = {
    title: string;
  } & TouchableHighlightProps;
  
  export default function StyledButton({ title, ...props }: StyledButtonProps) {
    const { theme } = useTheme();

    const styles = theme === 'light' ? lightStyles : darkStyles;

    return (
      <TouchableHighlight {...props} style={[styles.button, props.style]}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableHighlight>
    );
  }
  
  const lightStyles = StyleSheet.create({
    button: {
      fontSize: 8,
      color: '#323232',
      marginLeft: 12,
      width: 'auto',
      boxShadow: '2px 2px #323232',
      paddingHorizontal: 5,
      borderRadius: 2,
      borderWidth: 1,
    },
    buttonText: {
      color: "#323232",
      fontSize: 15,
      fontWeight: "600",
      padding: 2,
    },
  });

  const darkStyles = StyleSheet.create({
    button: {
      fontSize: 8,
      color: '#f6f6f6',
      marginLeft: 12,
      borderColor: '#f6f6f6',
      width: 'auto',
      boxShadow: '2px 2px #f6f6f6',
      paddingHorizontal: 5,
      borderRadius: 2,
      borderWidth: 1,
      backgroundColor: '#0d171c',
    },
    buttonText: {
      color: "#f6f6f6",
      fontSize: 15,
      fontWeight: "600",
      padding: 2,
    },
  });


  