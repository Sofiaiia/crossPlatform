import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import mock from "../mock/persons.json";
import { ListItem, Avatar, SearchBar } from "react-native-elements";
import axios from "axios";

export const Overview = () => {
  useEffect(() => {
    axios
      .get("https://api.lagtinget.ax/api/persons.json?state=1")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((err) => {
        Alert.alert("Network error: " + err, "Please try again later");
      });
  }, []);

  const navigation = useNavigation();

  const navigateToDetails = (name, id) => {
    navigation.navigate("Details", { name, id });
  };

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const updateSearch = (newSearch) => {
    setSearch(newSearch);

    if (search === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(
          (person) =>
            person.first_name.toLowerCase().match(newSearch.toLowerCase()) ||
            person.last_name.toLowerCase().match(newSearch.toLowerCase())
        )
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => navigateToDetails(item.name, item.id)}
      >
        <Avatar
          rounded
          size="large"
          title={item.first_name.charAt(0) + item.last_name.charAt(0)}
          overlayContainerStyle={styles.avatar}
          source={item.image && { uri: item.image.url }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Sök"
        lightTheme="true"
        inputContainerStyle={styles.searchbar}
        onChangeText={updateSearch}
        value={search}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    backgroundColor: "blue",
  },
  searchbar: {
    backgroundColor: "white",
  },
});
