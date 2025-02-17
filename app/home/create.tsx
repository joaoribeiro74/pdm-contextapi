import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import StyledButton from "@/components/StyledButton";
import useCollection from "@/firebase/hooks/useCollection";
import Sneaker from "@/types/Sneaker";
import { MaskedTextInput } from "react-native-mask-text";

export default function CreateSneaker() {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  
  const { create, refreshData } = useCollection<Sneaker>("sneakers");
  const router = useRouter();

  const handleCreate = async () => {
    if (!brand || !name || !size || !color || !price) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    let imageUrl = imageLink;
    if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
      Alert.alert("Erro", "Por favor, forneça um link de imagem válido.");
      return;
    }

    try {
        const numericPrice = price.replace(/[^\d,]/g, "").replace(",", ".");

    
      await create({
        brand,
        name,
        size: parseInt(size, 10),
        color,
        price: parseFloat(numericPrice),
        image: imageUrl || ""
      });
      await refreshData();
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Erro ao criar Sneaker", error.toString());
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Adicionar Novo Sneaker",
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tamanho"
        value={size}
        onChangeText={setSize}
        keyboardType="numeric"
        maxLength={2}
      />
      <TextInput
        style={styles.input}
        placeholder="Cor"
        value={color}
        onChangeText={setColor}
      />
      <MaskedTextInput
        type="currency"
        options={{
          prefix: 'R$ ',
          decimalSeparator: ',',
          groupSeparator: '.',
          precision: 2,
        }}
        value={price}
        onChangeText={(text, rawText) => {
          setPrice(rawText); 
        }}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Preço"
      />
      <TextInput
        style={styles.input}
        placeholder="URL da imagem (opcional)"
        value={imageLink}
        onChangeText={setImageLink}
      />
      <StyledButton title="Adicionar" onPress={handleCreate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    backgroundColor: '#f6f6f6',
    height: 50,
    borderWidth: 2,
    borderColor: "#323232",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    boxShadow: '4px 4px #323232'
  },
});

