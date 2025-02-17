import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, View, StyleSheet } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import globalStyles from "../../../styles/globalStyles";
import Sneaker from "../../../types/Sneaker";
import ViewSneaker from "@/components/ViewSneaker";
import useCollection from "@/firebase/hooks/useCollection";

export default function SneakerDetails() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();

  // Garantir que id seja uma string (no caso de ser um array, pegar o primeiro valor)
  const sneakerId = typeof id === 'string' ? id : (Array.isArray(id) ? id[0] : undefined);


  const { data, remove, refreshData, loading } = useCollection<Sneaker>("sneakers");

  // Encontre o sneaker com o ID válido
  const sneaker = data.find(item => item.id === sneakerId);

  if (loading) {
    return <Loading />;
  }

  if (!sneaker) {
    return (
      <View style={globalStyles.container}>
        <Text>O sneaker não foi encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Detalhes",
          headerRight: () => <HeaderRight showEmail={false} />,
        }}
      />

      <ViewSneaker
        sneaker={sneaker}
        onDelete={async () => {
          if (sneaker.id) {
            await remove(sneaker.id);
            await refreshData();
            router.push("/"); // Redireciona para a página inicial após a exclusão
          }
        }}
        onEdit={() => {
          router.push({
            pathname: "/home/[id]/edit",
            params: {
              id: sneaker.id,
              brand: sneaker.brand,
              name: sneaker.name,
              size: sneaker.size.toString(),
              color: sneaker.color,
              price: sneaker.price.toString(),
              image: sneaker.image,
            },
          });
        }}
      />
    </View>
  );
}


