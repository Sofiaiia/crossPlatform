import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    Alert,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { Icon } from 'react-native-elements';
 

export const Cases = () => {

    const[data,setData] = useState([]);

    useEffect(()=>{
        axios
            .get('https://api.lagtinget.ax/api/case_types.json')
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                Alert.alert("Network error: " + err, "Please try again later");
            })
   }, []);

   const navigation = useNavigation();

   const navigateToDetails = (title, id) => {
     navigation.navigate("caseDetails", { title, id });
   };


   const renderItem = ({item}) => {
        const showInfo = () => {
            Alert.alert("Description:",item.description,[
                {
                    style: "default",
                },
                {text: "OK"},
            ]);
        };
        return(
            <ListItem
                bottomDivider
                onPress={() => navigateToDetails(item.title,item.id)}
                onLongPress={showInfo}
                containerStyle={styles.cointainer}
            >
            <Icon name="align-justify" type ="feather" size={30} color="blue"/>
            <ListItem.Content>
                <ListItem.Title style={styles.list}>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron/>
            </ListItem>
        );
   };

    return(
        <View style={styles.cointainer}>
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
 cointainer: {
     flex:1,
     backgroundColor:"white",
 },
 list: {
    fontSize: 22,
    color:"black",
 },
});