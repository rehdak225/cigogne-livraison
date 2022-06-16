import React from 'react'
import {View,Text,Keyboard,KeyboardAvoidingView,Image ,Pressable , TextInput,  TouchableHighlight, Button, StyleSheet, FlatList , ActivityIndicator, SafeAreaView, ImageBackground,Dimensions}  from 'react-native'

import { connect } from 'react-redux'

import {verifyNumber,verifyEmail,signUp} from '../API/UserAPI'

class Inscription extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            keyboardOffset: 0,
            nom:"",
            email:"",
            numero : 0,
            confPass:"",
            password: "",
            isNumInside:false,
            isLoading: false,
        };
        console.log(this.props.connected.user);
    }

    componentDidMount = () =>{
        if(this.props.connected.user.length != 0){

            console.log("Ici");
            this.props.navigation.navigate("Index")
        }
        console.log(this.state.numero);
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }



    _displayLoading(){
        if(this.state.isLoading){
        return (
          <View style={{justifyContent: "center",position:"absolute",left:0,right:0,top:100}}>
              <ActivityIndicator color="white" size="large"/>
          </View>
        )
        }
      }
    

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (event) =>{
        this.position = event.endCoordinates.height;
        this.setState({
            keyboardOffset: Dimensions.get('window').height - 500,
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardOffset: 0,
        })
    }

    _click(flag){
        if(flag == true)
        {
            Keyboard.dismiss()
        }
          
    }

    _getPassword(pass){
        this.state.password = pass;
    }

    _getNumero(numero){
        this.state.numero = numero;
    }


    _getConfPass(conf){
        this.state.confPass = conf;
    }
    _getNom(nom){
        this.state.nom = nom;
    }

    _getEmail(email){
        this.state.email = email;
    }

    connexion(){
        this.props.navigation.navigate("Connexion")
    }


    passOublie(){
        this.props.navigation.navigate("PassOublie")
    }

    connect(){
        console.log(this.state.password);
        connexion(this.state.numero,this.state.password).then((data)  =>
        {if(data == false){

            alert('Mauvais identifiant ou mot de passe')
        }else{
            this.persistUser(data)
        }}
      );

    }

    persistUser(user){
        const action = { type: "CONNECT_USER", value: user }
        this.props.dispatch(action)
        this.props.navigation.navigate("Index")
    }

    onSubmitInscription = () =>{
        if(this.state.nom == ""){
            alert("Veuillez entrez votre nom svp");
        }
        else if(this.state.numero == "" ){
            alert("Veuillez entrez votre numero svp");
        }else if(this.state.numero.length != 10){
            alert("Veuillez entrez un numero correct svp");
        }else if(!this.validateEmail(this.state.email)){
            alert("Veuillez entrez un email correct svp");
        }else if(this.state.password == ""){
            alert("Veuillez entrer votre mot de passe svp");
        }else if(this.state.confPass != this.state.password){
            alert("Les deux mots de passes doivent correspondre");
        }else{
            this.setState({isLoading : true})
            verifyEmail(this.state.email).then((data)  =>
            this.setState({
              isNumInside : data,
            },() => { 
                if(this.state.isNumInside == true){
                alert("Cet email existe déjà sur la plateform");
                this.setState(
                    {
                        isLoading:false,
                        isNumInside:false,
                    }
                );
            }else if(this.state.isNumInside == false){
                signUp(this.state.nom,this.state.email,this.state.numero,this.state.password).then((data)  =>
                {if(data == true){
                    this.setState(
                        {
                            isLoading:false,
                        }
                    );
                    alert('Felicitation vous êtes desormais inscrit. Un email de confirmation vous a été envoyé');
                }else{
                    this.setState(
                        {
                            isLoading:false,
                        }
                    );
                    alert('Une erreur  s\'est produite lors de l\'inscription. Veuillez svp verifier votre connexion internet.')
                }});
        } })
        );
        }
    }

    validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    render(){
        return(
            <SafeAreaView  style={styles.main_container}>
            <TouchableHighlight onPress={() => this._click(true)} style={{flex:1}} >

                <ImageBackground blurRadius={1} source={require('../Images/Abidjan.jpg')} style={styles.mainImage}>
                    <View style={styles.overlay}>
                        <View style={styles.headerText}>
                    <Text style={{color:'white'}}>Inscription</Text>
                        </View>
                        <View style={styles.bottomSection}>
                            <View >
                            <KeyboardAvoidingView  behavior="padding">
        <   TextInput style={textInput(this.state.keyboardOffset)}

            onChangeText={text => this._getNom(text)}
            placeholder='Entrez votre nom complet'
            autoCapitalize="none"
            placeholderTextColor='#929292'/>
            <   TextInput style={textInput(this.state.keyboardOffset)}
    
                onChangeText={text => this._getNumero(text)}
                placeholder='Entrez numero de telephone'
                autoCapitalize="none"
                keyboardType = 'numeric'
                placeholderTextColor='#929292'/>
        <   TextInput style={textInput(this.state.keyboardOffset)}

onChangeText={text => this._getEmail(text)}
placeholder='Entrez votre email'
autoCapitalize="none"
placeholderTextColor='#929292'/>
                <   TextInput style={textInput(this.state.keyboardOffset)}
        
                    onChangeText={text => this._getPassword(text)}
                    placeholder='Entrez votre mot de passe'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='#929292'/>
            <TextInput   style={textInput(this.state.keyboardOffset)}
            secureTextEntry={true}
            onChangeText={text => this._getConfPass(text)}
              placeholder='Veuillez confirmer votre mot de passe'
              autoCapitalize="none"
              placeholderTextColor='#929292'/>

            {this._displayLoading()}
              </KeyboardAvoidingView>
            </View>
             <TouchableHighlight  onPress={()=> this.onSubmitInscription()}style={button(this.state.keyboardOffset)}>
            <Text style={{textAlign:'center',fontSize:17,color:'white',paddingTop:8}}>S'inscrire</Text>
            </TouchableHighlight> 
                            <Text style={textBottom(this.state.keyboardOffset)}>Déjà inscrit?<Text onPress={() => this.connexion()} style={{color:'white',fontWeight:"bold"}}>Connexion</Text></Text>
                            <Text style={textBottom(this.state.keyboardOffset)}><Text onPress={() => this.passOublie()} style={{color:'white',fontWeight:"bold"}}>Mot de passe oublié?</Text></Text>
                           
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
        paddingBottom: 100,
        alignItems: "center",
        justifyContent: "flex-end",
        color: 'white'
    }
})



const mapStateToProps = (state) => {
    return state
  }

  export default connect(mapStateToProps)(Inscription)