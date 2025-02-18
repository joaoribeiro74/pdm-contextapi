import { faker } from "@faker-js/faker";
import { Stack, usePathname, useRouter } from "expo-router";
import { Alert, FlatList, Text, TextInput, View, StyleSheet, ScrollView, ImageBackground } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewSneaker from "../../components/ViewSneaker";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Sneaker from "../../types/Sneaker";
import { useState } from "react";
import ViewDetails from "@/components/ViewDetails";
import CardSneaker from "@/components/CardSneaker";

export default function Home() {
  const { data, create, update, remove, refreshData, loading } =
    useCollection<Sneaker>("sneakers");

    const { theme } = useTheme();
    const router = useRouter();

    const styles = theme === 'light' ? lightStyles : darkStyles;

    console.log("Current theme colors:");
    
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <StyledButton
        style={{ marginBottom: 20, marginTop: -10}}
        title="Criar sneaker"
        onPress={() => router.push("/home/create")}
      />

{loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <ViewDetails sneaker={item} />
            </View>
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}


const lightStyles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  editForm: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#f6f6f6",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "#323232",
    boxShadow: '4px 4px #323232',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderColor: "#323232",
    borderWidth: 2,
    boxShadow: "4px 4px #323232",
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "#f6f6f6",
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 3,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#14242c"
  },
  editForm: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#f6f6f6",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "#323232",
    boxShadow: '4px 4px #323232',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderColor: "#323232",
    borderWidth: 2,
    boxShadow: "4px 4px #323232",
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "#14242c",
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 3,
  },
});
