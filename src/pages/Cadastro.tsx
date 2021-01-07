import React, { useState,ChangeEvent,useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert
} from "react-native";

import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import {Picker} from '@react-native-picker/picker';
import api from '../service/api';
import * as Location from 'expo-location';

//import {ProvinciaService}  from '../service/ProvinciaService';


interface IProvincia {
  id: number;
  descricao: string;
  codigo:String;
}


interface IMunicipio {
  id: number;
  descricao: string;
  codigo:String;
}

interface IComuna {
  id: number;
  descricao: string;
}

interface INivelEscola {
  id: number;
  descricao: string;
  codigo:String;
}

interface ISequencia {
  id: number;
  numero: number;
}


export default function Cadastro(){

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    
    const [selectedProvincia, setSelectedProvincia] = useState("0");
    const [provincias,setProvincias] = useState<IProvincia[]>([]);

    const [selectedCodigoP, setSelectedCodigoP] = useState("");

    const [selectedNivelEscola, setSelectedNivelEscola] = useState("0");
    const [nivelEscolas,setNivelEscolas] = useState<INivelEscola[]>([]);

    const [selectedCodigoNivelEscola, setSelectedCodigoNivelEscola] = useState("");



    const [selectedMunicipio, setSelectedMunicipio] = useState("0");
    const [municipios,setMunicipios] = useState<IMunicipio[]>([]);

    const [selectedCodigoMunicipio, setSelectedCodigoMunicipio] = useState("");

    const [selectedComuna, setSelectedComuna] = useState("0");
    const [comunas,setComunas] = useState<IComuna[]>([]);

    const [comuna,setComuna] = useState<IComuna>();
    const [selectedCodigoComuna, setSelectedCodigoComuna] = useState("");

    const [numeroSequencia, setNumeroSequencia] = useState<ISequencia>();


    const [codigoEscola, setCodigoEscola] = useState('');
    const [nomeEscola, setNomeEscola] = useState('');



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



    useEffect(()=>{ 

      if(selectedNivelEscola === '0'){
  
        return;
       }
      
      api.get(`nivelEscolas/${selectedNivelEscola}`).then(response =>{
       const nl=  response.data.codigo; 
  
    // console.log(nl);
          setSelectedCodigoNivelEscola(nl);
  
          
      })
  },[selectedNivelEscola]);

    useEffect(()=>{ 

    
      api.get('nivelEscolas').then(response =>{
        const nl=  response.data; 

          setNivelEscolas(nl);
          
      })
  },[selectedNivelEscola]);


  useEffect(()=>{ 

    if(selectedProvincia === '0'){

      return;
     }
    
    api.get(`provincias/${selectedProvincia}`).then(response =>{
     const nl=  response.data.codigo; 

  // console.log(nl);
        setSelectedCodigoP(nl);

        
    })
},[selectedProvincia]);



    useEffect(()=>{ 

      

      api.get('provincias').then(response =>{
        const prov=  response.data; 
          setProvincias(prov);
          
      })
  },[]);




  useEffect(()=>{ 

    if(selectedMunicipio === '0'){

      return;
     }
    
    api.get(`municipios/${selectedMunicipio}/1`).then(response =>{
     const nl=  response.data.codigo; 

  
  // console.log(nl);
        setSelectedCodigoMunicipio(nl);
        
    })
},[selectedMunicipio]);


  useEffect(()=>{ 

     if(selectedProvincia === '0'){

        return;
       }

    api.get(`municipios/${selectedProvincia}`).then(response =>{
      const mun=  response.data; 
        setMunicipios(mun);
        
    })
},[selectedProvincia]);



useEffect(()=>{ 

  if(selectedMunicipio === '0'){

    return;
   }
  
  api.get(`comunas/${selectedComuna}/1`).then(response =>{
   const nl=  response.data.codigo; 

 //console.log(nl);
      setSelectedCodigoComuna(nl);
      
  })
},[selectedComuna]);


useEffect(()=>{ 

  if(selectedMunicipio === '0'){

     return;
    }

 api.get(`comunas/${selectedMunicipio}`).then(response =>{
   const com =response.data; 
     setComunas(com);
     
 })
},[selectedProvincia,selectedMunicipio]);


    
    const handleSelectPv = (e: any) => {
        
      const  prov = e;
   
     setSelectedProvincia(prov);
  //   console.log("rr "+selectedCodigoP);
  
     };


     const handleSelectMunicipio = (e: any) => {
        
      const  mun = e;
   
     setSelectedMunicipio(mun);
    //  console.log(prov)

     // console.log("ddd")
     
     };


     const handleSelectNv = (e: any) => {
        
      const  prov = e;
   
     setSelectedNivelEscola(prov);
  
     };

     const handleSelectComuna = (e: any) => {
        
      const  prov = e;

     setSelectedComuna(prov);
  
     };


    
      api.get('numeroSequencial').then(response =>{
        const num=  response.data;
      //  const num=  response.data.map((mn: { numero: any; }) => mn.numero); 

          setNumeroSequencia(num);
          
      })
    
    


       function dd(){

        let seq : number = numeroSequencia?.numero as number ;
        
        let seqString = seq?.toString();
        let gerador;
    

        switch (seqString?.length)
        {

            case 1:
                gerador = "00" + seq;
                break;
            case 2:
                gerador = "0" + seq;
                break;
            case 3:
                gerador = "" + seq;
                break;
            default:
                break;
        }

        return gerador;
       }








       async function handleSubmit(){
         
    
        
          const data={
             nome:nomeEscola,
             codigoEscola:"1"+selectedCodigoP+selectedCodigoMunicipio+selectedCodigoComuna+selectedCodigoNivelEscola+dd(),
             latitude:initialPosition[0],
             longitude:initialPosition[1],
             comuna: {
              "id": selectedComuna
            },
            nivelEscola: {
              "id": selectedNivelEscola
          }
             
             
          };
      
          console.log(data)
        
         await api.post('escolas',data);
         


        
          alert("Escola Cadastrada com Sucesso!");
          actualizarSequencia();
        
        
        }



        async function actualizarSequencia(){
          
          let numero: number = numeroSequencia?.numero as number ;
          let id: number = numeroSequencia?.id as number;
          //console.log(numeroSequencia?.id)

          numero++;

          const data={
            numero,
          }

          await api.put(`numeroSequencial/${id}`,data);

        }
      
   

    return(
        

        <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Provincia</Text>

      <View style={styles.combobox}>
<Picker
  selectedValue={selectedProvincia}
  style={{width: 250}}
  onValueChange={handleSelectPv}
  
  >
  
  <Picker.Item label="Escolha uma Província" value={selectedProvincia} />
   {provincias.map(name =>(
        <Picker.Item key={name.id} label={name.descricao} value={name.id}  />
    ))} 
  
</Picker>
</View>  


      <Text style={styles.label}>Municipio</Text>
      
      <View style={styles.combobox}>
<Picker
  selectedValue={selectedMunicipio}
  style={{width: 250}}
  onValueChange={handleSelectMunicipio}
  
  >
  
  <Picker.Item label="Escolha o Município" value={selectedMunicipio} />
   {municipios.map(name =>(
        <Picker.Item key={name.id} label={name.descricao} value={name.id}  />
    ))} 
  
</Picker>
</View>  

      
      <Text style={styles.label}>Comuna</Text>
      
      <View style={styles.combobox}>
<Picker
  selectedValue={selectedComuna}
  style={{width: 250}}
  onValueChange={handleSelectComuna}
  
  >
  
  <Picker.Item label="Escolha a Comuna" value={selectedComuna} />
   {comunas.map(name =>(
        <Picker.Item key={name.id} label={name.descricao} value={name.id}  />
    ))} 
  
</Picker>
</View>  




      <Text style={styles.label}>Nivel Escola</Text>
      <View style={styles.combobox}>
<Picker
  selectedValue={selectedNivelEscola}
  style={{width: 250}}
  onValueChange={handleSelectNv}
  
  >
  
  <Picker.Item label="Escolha o Nível Escola" value={selectedNivelEscola} />
   {nivelEscolas.map(name =>(
        <Picker.Item key={name.id} label={name.descricao} value={name.id}  />
    ))} 
  
</Picker>
</View>  

    <Text style={styles.label}>Código da Escola</Text>
    <Text style={styles.input}>{"1"+selectedCodigoP+selectedCodigoMunicipio+selectedCodigoComuna+selectedCodigoNivelEscola+dd()}</Text>

    <Text style={styles.label}>Nome da Escola</Text>
    <TextInput value={nomeEscola} placeholder="Nome da Escola" onChangeText={setNomeEscola}
        style={styles.input}
        
      />
      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>

    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    title: {
      color: "#5c8599",
      fontSize: 24,
    //  fontFamily: "Nunito_700Bold",
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomWidth: 0.8,
      borderBottomColor: "#D3E2E6",
    },
  
    label: {
      color: "#8fa7b3",
     // fontFamily: "Nunito_600SemiBold",
      marginBottom: 8,
    },
  
    comment: {
      fontSize: 11,
      color: "#8fa7b3",
    },
  


    combobox: {
      backgroundColor: "#fff",
      borderWidth: 1.4,
      borderColor: "#d3e2e6",
      borderRadius: 20,
      height:56,
      paddingTop:0,
      paddingHorizontal: 30,
      marginBottom: 16,
      textAlignVertical: "top",
    },
  

    input: {
      backgroundColor: "#fff",
      borderWidth: 1.4,
      borderColor: "#d3e2e6",
      borderRadius: 20,
      height:56,
      paddingVertical: 18,
      paddingHorizontal: 20,
      marginBottom: 16,
      textAlignVertical: "top",
      fontWeight:"bold"
    },
  
    uploadedImagesContainer: {
      flexDirection: "row",
    },
  
    uploadedImage: {
      width: 64,
      height: 64,
      borderRadius: 20,
      marginBottom: 32,
      marginRight: 8,
    },
  
    imagesInput: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderStyle: "dashed",
      borderColor: "#96D2F0",
      borderWidth: 1.4,
      borderRadius: 20,
      height: 56,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 32,
    },
  
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 16,
    },
  
    nextButton: {
      backgroundColor: "#15c3d6",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      height: 56,
      marginTop: 5,
    },
  
    nextButtonText: {
     // fontFamily: "Nunito_800ExtraBold",
      fontSize: 16,
      color: "#FFF",
    },
  });