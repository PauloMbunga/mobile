import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator}  from '@react-navigation/stack';


const {Navigator,Screen} = createStackNavigator();

import Mapa from './pages/Mapa';
import Cadastro from './pages/Cadastro';


export default function Routes(){

    return(

      <NavigationContainer>
       <Navigator screenOptions= {{headerShown:true}}>

           <Screen name="Mapa" component={Mapa} />
    
           <Screen name="Cadastro" component={Cadastro} />
       </Navigator>

      </NavigationContainer>

    );
}