import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, ScrollView, Text } from "react-native";
import axios from "axios";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

export const Plenum = () => {
  const [data, setData] = useState([]);
  const [marked, setMarked] = useState({});
  const splited = [];

  function splitDates(array) {
    function split(item, index) {
      const s = item.date.split(" ", 1);
      splited.push(s);
    }

    array.forEach(split);

    const marked2 = {}; 
    splited.forEach((day) => {
      marked2[day] = { selected: true, marked: true, selectedColor: "blue" };
    });
    setMarked(marked2);
  }

  useEffect(() => {
    axios
      .get("https://api.lagtinget.ax/api/seatings.json")
      .then((response) => {
        setData(response.data);
        splitDates(data);
      })
      .catch((err) => {
        Alert.alert("Network error: " + err, "Please try again later");
      });
  }, []);

  return (
    <View styles={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Plenum</Text>
        <Calendar
          showWeekNumbers={true}
          enableSwipeMonths={true}
          firstDay={1}
          markedDates={marked}
        />
        <Text style={styles.listTitle}>  Sammanställning: </Text>
        <ScrollView style={styles.list}>
            {data.map((ple, index) => {
              return (
                <View key={index}>
                  <Text style={styles.listText}> - {ple.title} </Text>
                </View>
              );
            })}
          </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 50,
    marginLeft: 110,
    marginTop: 40,
    marginBottom: 30,
    fontWeight:"bold",
  },
  listTitle:{
    fontSize: 30,
    marginTop:20,
    fontWeight:"bold",
  },
  list: {
    marginLeft: 20,
  },
  listText:{
    marginTop:15,
    fontSize:17,
  },
});