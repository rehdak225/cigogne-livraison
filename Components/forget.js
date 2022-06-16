
import React from 'react'
import {View,Text,Modal,Location,Dimensions,Checkbox ,shortid,Ionicons,ScrollView,Keyboard, Pressable, KeyboardAvoidingView , TextInput,  TouchableHighlight, Button, StyleSheet, FlatList , ActivityIndicator, SafeAreaView, ImageBackground}  from 'react-native'
import { connect } from 'react-redux'

import CodeInput from 'react-native-confirmation-code-input';
import {verifyNumber,verifyEmail,signUp,resetPass,resetPassDone} from '../API/UserAPI'


class Forget extends React.Component{

    constructor(props){
        super(props);
        var securityCode = null;
        this.state = {
            isnumero: true,
            pass: false,
            isNumInside: false,
            keyboardOffset: 0,
            email : "",
            password: "",
            confPass: "",
            modalVisible: false,
        }; 
        console.log(this.state.isnumero)
    }

    connexion(){
        this.props.navigation.navigate("Connexion");
    }

    _setEmail(text){
        this.state.email = text;
    }

    _click(flag){
        if(flag == true)
        {
            Keyboard.dismiss()
        }
          
    }


    toggleModal(visible) {
        this.setState({ modalVisible: visible });
     }

     connect(){

        if(this.state.email == ""){
            alert("Veuillez entrer votre email svp.");
        }else if(!this.validateEmail(this.state.email)){
            alert("Veuillez entrer  un email correct svp.");
       }else{
        this.securityCode = Math.floor(Math.random()*90000) + 10000+'';
        this.checkIfNumberExist();
        console.log(this.securityCode);
       }
     }


    validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

     checkIfNumberExist = () =>{
        this.setState({isLoading : true})
      verifyEmail(this.state.email).then((data)  =>
      this.setState({
          isNumInside : data,
          isLoading : false,
      },() => { if(this.state.isNumInside == false){
        alert("Ce numero n'existe pas sur la plateform");
        console.log(this.state.isNumInside);
    }else if(this.state.isNumInside == true){
        this.toggleModal(true);
        resetPass(this.state.email,this.securityCode);
    } })
    );
      
    }


    _onFinishCheckingCode(isValid){

        if(isValid){
            alert('Veuillez choisir un nouveau mot de passe');
            this.toggleModal(!isValid);
            this.setState({
                pass: true,
                isnumero: false,
            })
        }else{
            alert('Mauvais code Réessayez');
        }
    }


    _getPassword(text){
        this.state.password = text;
    }

    _getConfPass(text){
        this.state.confPass = text;
    }


    changePassword(){
        if(this.state.password == ""){
            alert("Veuillez remplir le champ 'mot de passe'");
        }else if(this.state.password != this.state.confPass){
            alert("Les deux champs ne correspondent pas");
        }else{

      verifyEmail(this.state.email).then((data)  =>{
          if(data ==  true){
                resetPassDone(this.state.email,this.state.password);
                alert("Votre mot de passe a bien été modifié");
                this.props.navigation.navigate("Connexion");
          }else{
              alert("Une erreur s'est produite. Veuillez verifier votre connexion internet et réessayer")
          }
      }
      );
        }
    }

    pass(){
        if(this.state.pass == true){
            return(
                <View>
                <TextInput   style={textInput(this.state.keyboardOffset)}
                secureTextEntry={true}
                onChangeText={text => this._getPassword(text)}
                  placeholder='Mot de passe'
                  autoCapitalize="none"
                  placeholderTextColor='grey'/>
                  <TextInput   style={textInput(this.state.keyboardOffset)}
                  secureTextEntry={true}
                  onChangeText={text => this._getConfPass(text)}
                    placeholder='Saississez votre mot de passe à nouveau'
                    autoCapitalize="none"
                    placeholderTextColor='grey'/>
            <TouchableHighlight  onPress={()=> this.changePassword()}style={button(this.state.keyboardOffset)}>
           <Text style={{textAlign:'center',fontSize:17,color:'white',paddingTop:8}}>Modifier mot de passe</Text>
           </TouchableHighlight> 
           </View>
            )
        }
    }


    numero(){
        if(this.state.isnumero == true){
        return(
            
<View>
            <   TextInput style={textInput(this.state.keyboardOffset)}

            onChangeText={text => this._setEmail(text)}
            placeholder='email'
            autoCapitalize="none"
            placeholderTextColor='grey'/>
            <TouchableHighlight  onPress={()=> this.connect()}style={button(this.state.keyboardOffset)}>
           <Text style={{textAlign:'center',fontSize:17,color:'white',paddingTop:8}}>Envoyer code</Text>
           </TouchableHighlight> 
           </View>
        )
        }
    }

    render(){
        return(
            <SafeAreaView  style={styles.main_container}>
            <TouchableHighlight onPress={() => this._click(true)} style={{flex:1}} >
                <ImageBackground blurRadius={1} source={require('../Images/Abidjan.jpg')} style={styles.mainImage}>
                    <View style={styles.overlay}>
                        <View style={styles.headerText}>
                    <Text style={{color:'white'}}>Connexion</Text>
                        </View>
                        <View style={styles.bottomSection}>
                        
                            <View >
                            <KeyboardAvoidingView  behavior="padding">
                            <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style={styles.modal}>
               <View style={{flex:1,alignItems:"center",justifyContent:'center'}}>
                  <Text style={{textAlign:'center'}}>Un code de confirmation vous a été envoyé sur le numero indiqué. Entrez le pour valider votre inscription</Text>
                
                  </View>
                  <View style={{flex:1}}>
    <CodeInput 
      ref="codeInputRef2"
      secureTextEntry
      compareWithCode={this.securityCode}
      keyboardType = 'numeric'
      activeColor='rgba(65, 196, 170,0.85)'
      inactiveColor='rgba(65, 196, 170,0.85)'
      autoFocus={false}
      ignoreCase={true}
      inputPosition='center'
      size={50}
      onFulfill={(isValid) => this._onFinishCheckingCode(isValid)}
    />
    </View>

                  <TouchableHighlight style={{height:30,flex:0.5}} onPress = {() => {
                     this.toggleModal(!this.state.modalVisible),alert('Vérifiez le numero et réessayé.')}}>
                     
                     <Text style = {styles.text}>Message non reçu?</Text>
                  </TouchableHighlight>  
               </View>
            </Modal>
                   {this.numero()}
                   {this.pass()}
              </KeyboardAvoidingView>
            </View>
                            <Text style={textBottom(this.state.keyboardOffset)}>Pas Encore de compte? Inscrivez vous !!<Text onPress={() => this.inscription()} style={{color:'white',fontWeight:"bold"}}>Ici</Text></Text>
                            <Text style={textBottom(this.state.keyboardOffset)}><Text onPress={() => this.connexion()} style={{color:'white',fontWeight:"bold"}}>Connexion?</Text></Text>
                           
                        </View>
                        </View>
                </ImageBackground>
                    </TouchableHighlight>
            </SafeAreaView>
       
        )
    }
}


const textInput = function(position){
    return {

        height: 50,
        width: 300,
        margin:5,
        backgroundColor: '#A0E1DD',
        paddingLeft: 10,
        borderRadius: 8,
    }
}


const textBottom = function(position){
    return {
    }
}


const button = function(position){
    return {

        height: 50,
        borderWidth: 0.5,
        borderColor: "white",
        backgroundColor: "rgba(0,0,0,0)",
        borderRadius: 15,
        width: 300,
        margin: 5,
    }
}


const styles = StyleSheet.create({
    main_container:{
        flex : 1,
        fontFamily: 'System',
        color: 'white'
    }, 
    modal:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
    button:{
        height: 50,
        borderWidth: 0.5,
        borderColor: "white",
        color: "white",
        backgroundColor: "rgba(0,0,0,0)",
        borderRadius: 15,
        width: 300,
        margin: 5,
    },
    overlay: {
        flex:1,
        backgroundColor:'rgba(65, 196, 170,0.85)',
    },
    mainImage:{
        flex:1,
    },
    headerText:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#07BB20',
        borderBottomWidth : 1,
    },
    bottomSection:{
        flex : 8,
        alignItems: "center",
        justifyContent: "center",
        color: 'white'
    }
})


const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps)(Forget);