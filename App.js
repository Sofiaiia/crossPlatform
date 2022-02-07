import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Details } from "./screens/Details";
import { Overview } from "./screens/Overview";
import { Cases } from "./screens/Cases";
import {Plenum } from "./screens/Plenum";
import { home } from "./screens/home";
import {caseDetails } from "./screens/caseDetails";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import {
  StyleSheet,
} from "react-native";


function details() {
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator>
    <Stack.Screen
      name="Overview"
      component={Overview}
      options={{ title: "Lagtingsledamöter" }}
    />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
  );
}

function caseDetail(){
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator>
    <Stack.Screen
      name="Cases"
      component={Cases}
      options={{ title: "Ärenden" }}
    />
    <Stack.Screen name="caseDetails" component={caseDetails} />
  </Stack.Navigator>
  );
}

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={home} options={{drawerLabel:"Home", 
          drawerIcon:(({focused}) => <Icon name="home" size={30} color="#0000ff" />)}} />
          <Drawer.Screen name="Lagtingsledamöter" component={details} options={{ drawerLabel: "Personer" , 
          drawerIcon:(({focused}) => <Icon name="person" size={30} color="#0000ff"/>)}} />
          <Drawer.Screen name="Ärenden" component={caseDetail} options={{drawerLabel:"Ärenden", 
          drawerIcon:(({focused}) => <Icon name="albums" type="ionicon" size={30} color="#0000ff"/>)}} />
          <Drawer.Screen name="Plenum" component={Plenum} options={{drawerLabel:"Plenum", 
          drawerIcon:(({focused}) => <Icon name="calendar" type="ionicon"size={30} color="#0000ff"/>)}} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
 
});
