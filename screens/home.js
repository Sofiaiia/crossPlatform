import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";


export const home = () => {

    return(
         <SafeAreaView >
                 <Animatable.Text  animation="bounce" iterationCount="infinite"  iterationDelay={3000} style={styles.text}> Välkommen till lagtings surfen! </Animatable.Text>
                 <Animatable.Image animation="rotate" iterationCount="infinite"  iterationDelay={6000} style={styles.image} source={require('C:/Users/helle/crossplatform-grupp-7/images/logo.png')} />     
         </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    
    image:{
        width:200,
        height:300,
        margin:90,
    },

    text:{
        fontSize:45,
        fontWeight:"bold",
        marginTop:160,
        marginLeft:40,
        textShadowColor: "grey",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20,
    }
});