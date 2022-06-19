
import React from 'react'
import {View,Text,Keyboard,KeyboardAvoidingView,Image ,Pressable , TextInput,  TouchableHighlight, Button, StyleSheet, FlatList , ActivityIndicator, SafeAreaView, ImageBackground,Dimensions}  from 'react-native'
import { connect } from 'react-redux'


import {getAgence} from '../API/DeliveryAPI'
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'

class Index extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            myAgence :null,
        };
        console.log(this.props.connected);
    }

    componentDidMount(){
        getAgence(this.props.connected.user.id).then((data)=>{
            this.setState({
                myAgence : data,
            })
            console.log(this.state.myAgence.length);
        });
    }

    deconnect(){

    const action = { type: "DISCONNECT_USER", value: '' }
    this.props.dispatch(action)
    this.props.navigation.navigate("Connexion")
    }

    isAgenceEmpty(){
        if(!this.state.myAgence || this.state.myAgence.length == 0){
            return(
                <View style={{height:100,justifyContent:"center",alignItems:"center"}}>

                    <Icon size={35} color="rgb(65, 196, 170)"
                    name='list' />
                    <Text style={{color:"rgb(65, 196, 170)"}}>Vous avez pas encore d'agences</Text>
                </View>
            )
        }
    }
    
    

    render(){
        return(
        <View>
        <ScrollView >
            <View style={{alignItems:"center"}}>
                <Image
                style={{width:"100%",height:300}}
          source={require('../Images/delivery.gif')}
        />
            <Text style={{marginTop:20,fontSize:15,fontWeight:"bold"}}>Bienvenue sur La Cigogne</Text>
            
            <Text> Livraison</Text>
            </View>
                <View>
            {this.isAgenceEmpty()}
                <FlatList
        data={this.state.myAgence}
        renderItem={({item}) => {
            <Text>{item.nom}</Text>
        }}
        keyExtractor={item => item.id}
      />
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-around"}}>

             <TouchableHighlight  onPress={()=> this.onSubmitInscription()}style={{borderWidth:3,borderColor:"rgba(65, 196, 170,0.85)",alignItems:"center",justifyContent:"center",width:150,height:50,borderRadius:30}}>
            <Text style={{textAlign:'center',fontSize:15,color:'black',}}>Deconnexion</Text>
            </TouchableHighlight> 

            <TouchableHighlight  onPress={()=> {this.props.navigation.navigate("CreateAgence");}}style={{borderWidth:3,borderColor:"rgba(65, 196, 170,0.85)",alignItems:"center",justifyContent:"center",width:150,height:50,borderRadius:30}}>
            <Text style={{textAlign:'center',fontSize:15,color:'black'}}>Creer une agence</Text>
            </TouchableHighlight> 

                </View>
                <View style={{justifyContent:"center",alignItems:"center",marginTop:25}}>

            <TouchableHighlight  onPress={()=> this.onSubmitInscription()}style={{borderWidth:3,borderColor:"rgba(65, 196, 170,0.85)",alignItems:"center",justifyContent:"center",width:150,height:50,borderRadius:30}}>
            <Text style={{textAlign:'center',fontSize:15,color:'black'}}>Nous contacter</Text>
            </TouchableHighlight> 
                </View>
                <View style={{height:100}}>

                </View>
            </ScrollView>
        </View>
        )
    }
}


const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps)(Index);