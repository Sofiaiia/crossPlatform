import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet,Text, View, ScrollView, ActivityIndicator,Alert} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";
import axios from "axios";
import { ListItem } from "native-base";
import { FlatList } from "react-native-gesture-handler";

export const Details = () => {

  const route = useRoute();
  const navigation = useNavigation();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSpeaches, setLoadingSpeaches] = useState(true);
  const [speaches, setSpeaches] = useState([]);


  const fetchTasks = async (id, config) => {
    const personResponse = await axios.get(
      `https://api.lagtinget.ax/api/persons/${id}.json`,
      config
    );

    const fetchedTasks = await Promise.all(
      personResponse.data.bindings.map(async ({ organization, role }) => {
        const organizationResponse = await axios.get(
          `https://api.lagtinget.ax/api/organizations/${organization}.json`,
          config
        );

        const roleResponse = await axios.get(
          `https://api.lagtinget.ax/api/roles/${role}.json`,
          config
        );

        return Promise.resolve({
          organization: organizationResponse.data.title,
          role: roleResponse.data.title,
        });
      })
    );
    setTasks(fetchedTasks);
    setLoading(false);
  };

  const fetchSpeaches = async(id,config) => {
    const caseResponse = await axios
            .get(`https://api.lagtinget.ax/api/comments.json?person=${id}`,
        config)
        .then((response) =>{
            setSpeaches(response.data);
            setLoadingSpeaches(false);
        });
  };

  useEffect(() => {
    navigation.setOptions({ headerTitle: route.params.name });
  }, [navigation, route.params.name]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const config = { cancelToken: source.token };
    fetchTasks(route.params.id, config).catch((err) => {
      if (!axios.isCancel(err)) {
        Alert.alert("NETWORK ERROR", "Please try again later.");
      } else {
        console.log("Was cancelled");
      }
    });

    fetchSpeaches(route.params.id, config).catch((err) => {
      if (!axios.isCancel(err)) {
        Alert.alert("NETWORK ERROR", "Please try again later.");
      } else {
        console.log("Was cancelled");
      }
    });

    

    return () => {
      source.cancel();
    };
  }, []);

  const showInfo = ({spe}) => {
    Alert.alert("Description:",spe.comment_text,[
        {
            style: "default",
        },
        {text: "OK"},
    ]);
};

const renderItem = ({item}) => {
  const showInfo = () => {
    
      Alert.alert("Tal:",item.comment_text,[
          {
              style: "default",
          },
          {text: "OK"},
      ]);
      
  };
  return(
     <View style={{alignItems:"center"}}>
       <ScrollView>
          <Text onPress={showInfo} style={{fontSize:15}}> {item.code}  </Text>
       </ScrollView>
     </View>
  );
};

  return (
    <View style={styles.container}>
      <ScrollView> 
      <Card>
        <Card.Title style={{fontSize:25}}>Uppdrag</Card.Title>
        <Card.Divider />
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <ScrollView style={styles.scrollview}>
            {tasks.map((task, index) => {
              return (
                <View style={styles.taskRow} key={index}>
                  <Text style={{fontSize:15}}>{task.organization} </Text>
                  <Text style={{fontSize:15}}>{task.role}</Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </Card>
      
      <Card>
        <Card.Title style={{fontSize:25}}> Tal: </Card.Title>
        <Card.Divider></Card.Divider>
        {loadingSpeaches ? (
           <ActivityIndicator size="large" color="blue" />
        ) : (
        <FlatList
          data={speaches}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
          )}
      </Card>
      <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  taskRow: {
    flexDirection: "row",
  },
  scrollview: {
    flexGrow: 0,
  },
});
