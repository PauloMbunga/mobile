import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View,Dimensions, Alert } from 'react-native';
import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { RectButton } from "react-native-gesture-handler";
import * as Location from 'expo-location';

import {useNavigation} from '@react-navigation/native'

import mapMarker from './src/images/mapMarker.png';
export default function Map() {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  


   const navigation = useNavigation();


   useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync(); 

      if (status !== 'granted') {
        Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
      
      });

    

      const { latitude, longitude } = location.coords;
 
      setInitialPosition([
        latitude,
        longitude
      ]);
    }

    loadPosition();
  }, []);





   function chamarPaginaCadastro(){
       navigation.navigate('Cadastro');
   }

  return (
    <View style={styles.container}>

    <RectButton style={styles.coordenadas} onPress={chamarPaginaCadastro}>
          <Text style={styles.label}>Coordenadas Geográficas</Text>
          <Text style={styles.label}>Latitude : {initialPosition[0]}</Text>
          <Text style={styles.label}>Longitude: {initialPosition[1]}</Text>
     </RectButton>
      
      <MapView 
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: initialPosition[0],
        longitude: initialPosition[1],
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0143,
      }}
      
        >
        <Marker
        
        coordinate={{
          latitude:initialPosition[0],
          longitude:initialPosition[1],
        }}

      />

</MapView>  

      <RectButton style={styles.nextButton} onPress={chamarPaginaCadastro}>
          <Text style={styles.nextButtonText}>Ir para o Cadastro</Text>
     </RectButton>
     
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map:{
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  },


  coordenadas: {
    backgroundColor: "#15c3d6",
    justifyContent: "space-between",
    alignItems: "center",
    height: 78,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 15,
  },

  nextButtonText: {
   // fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
  label: {
    color: "#fff",
   // fontFamily: "Nunito_600SemiBold",
    marginBottom: 8,
  },
});
