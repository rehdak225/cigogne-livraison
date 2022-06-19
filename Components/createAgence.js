import React from 'react'
import {View,Text,Keyboard,KeyboardAvoidingView,Image ,Pressable , TextInput,  TouchableHighlight, Button, StyleSheet, FlatList , ActivityIndicator, SafeAreaView, ImageBackground,Dimensions}  from 'react-native'
import { connect } from 'react-redux'


import * as ImagePicker from 'react-native-image-picker'
import {getAgence} from '../API/DeliveryAPI'
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'

const windowWidth = Dimensions.get('window').width;

class CreateAgence extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            myAgence :null,
            fileUri:"",
        };
        console.log(this.props.connected);
    }



    _avatarClicked = () => {
        let options = {
            title:'hey',
            cancelButtonTitle:[{ name: 'didCancel', title: 'Annuler' }],
            customButtons: [{ name: 'didCancel', title: 'Annuler' }],

            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };


          ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
                console.log('Response = ', response);
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
                console.log(response.data);
                console.log('response', JSON.stringify(response));
                console.log(response)
              this.state.image = response['assets'][0].uri;
            }
        })
        }

    
  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          fileUri: response.uri
        });
      }
    });

  }

   
    componentDidMount = () =>{
        console.log(windowWidth);
    }

    render(){
        return(
            <SafeAreaView>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:100,backgroundColor:"rgb(65, 196, 170)"}}>
                    <TouchableHighlight  onPress={()=> {
        this.props.navigation.navigate("Index");}}>
                        <Icon size={45} color="white"
                        name='arrow-left' />
                    </TouchableHighlight>
                    <Text style={{fontSize:20,color:"white"}}>Votre agence</Text>
                    <Text style={{color:"rgb(65, 196, 170)"}}>hey</Text>
                </View>
                <View  >
                <View style={{marginTop:20,marginLeft:(windowWidth * 0.1)}}>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Creez</Text>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>une agence de livraision</Text>
                </View>

                <KeyboardAvoidingView  behavior="padding">

                <View style={{marginTop:30}}>
                <Text style={styles.textAbove}>Entrez le nom de votre agence</Text>
                </View>
                <View style={{alignItems:"center"}}>
                
                <   TextInput style={styles.input}
                    onChangeText={text => {}}
                    autoCapitalize="none"
                    placeholder="Exemple: Super Livraison"
                    placeholderTextColor='grey'/>
                </View>

                <View style={{marginTop:15}}>
                <Text style={styles.textAbove}>Choisissez une image pour votre agence</Text>
                </View>
                <View style={{alignItems:"center"}}>
                
                
             <TouchableHighlight  onPress={()=> this.launchImageLibrary()} style={styles.touch}>
            <Text style={{textAlign:'center',fontSize:17,paddingTop:8}}>Photo</Text>
            </TouchableHighlight> 
                </View>
                <View style={{marginTop:15}}>
                <Text style={styles.textAbove}>Faites une photo d'une piece d'identité (cni par exemple)</Text>
                </View>
                <View style={{alignItems:"center"}}>
                
                
             <TouchableHighlight  onPress={()=> this._avatarClicked()}style={styles.touch}>
            <Text style={{textAlign:'center',fontSize:17,paddingTop:8}}>Photo</Text>
            </TouchableHighlight> 
                </View>

                <View style={{alignItems:"center"}}>
                
                <View style={{marginTop:15}}>
                <Text style={{color:"#F2F2F2"}}>Faites une photo d'une piece d'identité (cni par exemple)</Text>
                </View>
                
             <TouchableHighlight  onPress={()=> this.connect()}style={{backgroundColor:"rgb(65, 196, 170)",height:50,width:"80%",borderRadius:10,justifyContent:"center",alignItems:"center"}}>
            <Text style={{textAlign:'center',color:"white",fontSize:17}}>Valider</Text>
            </TouchableHighlight> 
                </View>
                </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        )
    }
}



const styles = StyleSheet.create({
    input:{
        height: 50,
        width: "80%",
        padding:10,
        backgroundColor:"rgba(65, 196, 170,0.3)",
        borderRadius:10
    },
    textAbove:{
        fontWeight:"bold",
        marginLeft:(windowWidth * 0.1),
    },
    touch:{
        height: 50,
        width: "80%",
        borderColor:"rgb(65, 196, 170)",
        borderWidth:1,
        borderRadius:10
    }
})

const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps)(CreateAgence);