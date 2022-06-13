
import React from 'react'
import {Text} from 'react-native'
import { connect } from 'react-redux'


class Index extends React.Component{

    constructor(props){
        super(props);
        console.log(this.props.connected);
    }

    componentDidMount(){
        if(this.props.connected.user.length == 0 ){
            console.log("here");
            this.props.navigation.navigate("Connexion")
        }else{
            
        }
    }

    render(){
        return(
            <Text>Hello</Text>
        )
    }
}


const mapStateToProps = (state) => {
    return state
  }

export default connect(mapStateToProps)(Index);