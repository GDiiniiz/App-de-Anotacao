import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';

export default function App() {

const [estado,setarEstado] = useState('leitura');
const [anotacao,setarAnotacao] = useState('');


useEffect(()=>{
  //Quando iniicar o App queremos que leia a Key anotacao.

  (async () => {
      try{
          const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
          setarAnotacao(anotacaoLeitura);
      }catch(error){}
  })();

},[])


setData = async() =>{
  try{
      await AsyncStorage.setItem('anotacao',anotacao)
  }catch(error){

  }

  alert('Sua anotação foi salva!')
}

function atualizarTexto(){
    setarEstado('leitura');
    setData();
}

  if(estado == 'leitura'){
  return (
    <View style={{marginTop:41}}>
      <StatusBar/> 
      <View style={style.header}><Text style={{textAlign:'center',color:'white', fontSize:18}}>Aplicativo anotação</Text></View>
      { 
      (anotacao != '')?
      <View style={{padding:20}}><Text style={style.anotacao}>{anotacao}</Text></View>
      :
      <View style={{padding:20}}><Text style={{opacity:0.3}}>Nenhuma notação encontrada</Text></View>
      }
      <TouchableOpacity onPress={()=> setarEstado('atualizando')} style={style.btnAnotacao}>
        { 
        (anotacao == "")?
        <Text style={style.btnAnotacaoTexto}>+</Text>
        :
        <Text style={{fontSize:12,color:'white',textAlign:'center',marginTop:17}}>Editar</Text>}
        </TouchableOpacity>
        
    </View>
  )
  }else if(estado == 'atualizando'){
    return(
    <View style={{marginTop:41}}>
    <StatusBar/> 
    <View style={style.header}><Text style={{textAlign:'center',color:'white', fontSize:18}}>Aplicativo anotação</Text></View>

      <TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} style={{padding:20,height:300}}  multiline={true} numberOfLines={5} value={anotacao}></TextInput>

    <TouchableOpacity onPress={()=> atualizarTexto()} style={style.btnSalvar}><Text style={{textAlign:'center',color:'white'}}>Salvar</Text></TouchableOpacity>
  
  </View>
    );
  }

  }

const style = StyleSheet.create({
    header:{
      width: '100%',
      padding: 20,
      backgroundColor: '#069'
    },
    anotacao:{
      fontSize:13
    },
    btnAnotacao:{
      position: 'absolute',
      right:10,
      bottom:'-500%',
      width:50,
      height:50,
      backgroundColor:'#069',
      borderRadius: 25
    },
    btnAnotacaoTexto:{
      color:'white',
      position: 'relative',
      textAlign: 'center',
      top:5,
      fontSize: 30
    },
    btnSalvar:{
      position: 'absolute',
      right:10,
      bottom:'-10%',
      width:100,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#069',

    },
    


});
