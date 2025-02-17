import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { Alert, TextInput, View, StyleSheet, Text } from "react-native";
import StyledButton from "../../../components/StyledButton";
import { useState } from "react";
import useCollection from "../../../firebase/hooks/useCollection";
import Sneaker from "../../../types/Sneaker";
import { query } from "firebase/firestore";
import { MaskedTextInput } from "react-native-mask-text";

export default function Edit() {
  const router = useRouter();
  const { id, brand: initialBrand, name: initialName, size: initialSize, color: initialColor, price: initialPrice, image: initialImage } = useGlobalSearchParams();

  const { update, refreshData } = useCollection<Sneaker>("sneakers");

  const [brand, setBrand] = useState(initialBrand as string || "");
  const [name, setName] = useState(initialName as string || "");
  const [size, setSize] = useState(initialSize?.toString() || "");
  const [color, setColor] = useState(initialColor as string || "");
  const [price, setPrice] = useState(initialPrice?.toString() || "");
  const [image, setImage] = useState(initialImage as string || "");

  const handleUpdate = async () => {
    if (!id) return;
    try {
      const numericPrice = price.replace(/[^\d,]/g, "").replace(",", ".");

      await update(id.toString(), {
        brand,
        name,
        size: parseInt(size),
        color,
        price: parseFloat(numericPrice),
        image,
      });
      await refreshData();
      if (router.canDismiss()) {
        router.replace(`/`); 
      } 
    } catch (error: any) {
      Alert.alert("Atualizar Sneaker falhou", error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Editar Sneaker" }} />

      <Text style={styles.text}>Marca:</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={setBrand}
      />
      <Text style={styles.text}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.text}>Tamanho:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tamanho"
        value={size}
        keyboardType="numeric"
        onChangeText={setSize}
        maxLength={2}
      />
      <Text style={styles.text}>Cor(es):</Text>
      <TextInput
        style={styles.input}
        placeholder="Cor(es)"
        value={color}
        onChangeText={setColor}
      />
      <Text style={styles.text}>Preço:</Text>
      <MaskedTextInput
        type="currency"
        options={{
          prefix: 'R$ ',
          decimalSeparator: ',',
          groupSeparator: '.',
          precision: 2
        }}
        value={price}
        onChangeText={(text, rawText) => {
          setPrice(rawText); // Salva o valor sem a formatação
        }}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Preço"
      />
      <Text style={styles.text}>URL da Imagem:</Text>
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={image}
        onChangeText={setImage}
      />
      <StyledButton title="Atualizar" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 15,
    borderColor: "#323232",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
    boxShadow: "4px 4px #323232"

  },
  text: {
    fontWeight: "bold",
    marginBottom: 3,
    marginHorizontal: 3,
  },
});
