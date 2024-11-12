import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export class Login extends Component {
    constructor(){
        super()
    }
    componentDidMount(){
        AuthenticatorAssertionResponse.onAutStateChanged((user)=> {
            if(user){
                this.props.navigation.navigate("HomeMenu")
            }
        })
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Login
