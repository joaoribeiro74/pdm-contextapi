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
  
  type StyledButtonProps = {
    title: string;
  } & TouchableHighlightProps;
  
  export default function StyledButton({ title, ...props }: StyledButtonProps) {

    return (
      <TouchableHighlight {...props} style={[styles.button, props.style]}>
        <Text style={globalStyles.buttonText}>{title}</Text>
      </TouchableHighlight>
    );
  }
  
  const styles = StyleSheet.create({
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
  });
  