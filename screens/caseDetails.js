import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView,} from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { ListItem,Alert } from "react-native-elements"; 

export const caseDetails = () => {

    const[data,setData] = useState([]);
    const[measures, setMeasures] = useState([]); 
    const[expanded,setExpanded] = useState([]);

    const route = useRoute();
    const navigation = useNavigation([]);

    useEffect(() => {
      navigation.setOptions({ headerTitle: route.params.title });
    }, [navigation, route.params.title]);

    const fetchCases = async(type,config) => {
      const caseResponse = await axios
          .get(`https://api.lagtinget.ax/api/cases.json?type=${type}`,
      config)
      .then((response) =>{
        setData(response.data);

        const ex2 = []; 
        for( i = 0; i < response.data.length; i++){
            ex2[i] = false; 
        }
        setExpanded(ex2); 
      });
      
  };
        
    useEffect(() => {
        const source = axios.CancelToken.source();
        const config = { cancelToken: source.token };
        fetchCases(route.params.id,config).catch((err) => {
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

    const fetchMeasures= async(id) => {
        const caseResponse = await axios
            .get(`https://api.lagtinget.ax/api/cases/${id}/events.json`)
            .then((response) =>{
              setMeasures(response.data);
            });
    };

      const toggleExpand = (id,index) => {
        
        const ex2 = [...expanded];

        if(expanded[index] == true){
          setMeasures([]);
           ex2[index] = false;
          setExpanded(ex2);
        }
        else{
          fetchMeasures(id);
          ex2[index] = true;
          setExpanded(ex2);
        }
        
      };
      
      const renderItem = ({item,index}) => {
        return(
          <ListItem.Accordion
          key={item.id}
          content={
            <>
              <ListItem.Content>
                <ListItem.Title> {item.code} {":"} {item.title}</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded = {expanded[index]}
          onPress={()=>{
            toggleExpand(item.id,index);
          }}
        >
          
         {measures.map((item, index) => (
             <ListItem  key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title> {"Åtgärds id: "}  {item.id}</ListItem.Title>
                </ListItem.Content>
            </ListItem>     
         ))}

        </ListItem.Accordion>
        );
        
   };

    return(
        <View style={styles.cointainer}>
          <ScrollView >
          <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );

};


const styles = StyleSheet.create({
 cointainer: {
     flex:1,
 },
});
