import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-web';
//import { auth, db } from "../firebase/config"

export class Register extends Component {
  constructor(props) {
    super()
    this.state = {
      email: '',
      password: '',
      bio: '',
      userName: '',
      registered: false,
      errMsg: ''
    }
  }

  /*onSubmit = (email, pass, bio, userName) => {
    auth.createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        //vamos a agregar el usuario a la collection de users
        if (response) {
          db.collection('users')
          .add({
            mail: email,
            bio: bio,
            userName: userName, 

          }).then(
            //redireccionar a login
            this.props.navigation('login')
          )
            .catch(e => console.log(e.message))
          this.setState({ registered: true, errMsg: '' })
        }
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ errMsg: error.message })
      })
  }*/

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Registro</Text>

        <TextInput style={''}
          keyboardType='email-adress'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput style={''}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />


        <TextInput style={''}
          keyboardType='default'
          placeholder='usuario'
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.email}
        />

        <TextInput style={''}
          keyboardType='default'
          placeholder='bio'
          onChangeText={text => this.setState({ bio: text })}
          value={this.state.bio}
          multiline={true}
          numberOfLines={4}
        />


        <TouchableOpacity onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.userName, this.state.bio)}>
          <Text>Registrarse</Text>
        </TouchableOpacity>
        {this.state.errMsg && <Text>{this.state.errMsg}</Text>}
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.linkText}>Ir a Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.linkText}>Ir a Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  linkText: {
    color: 'blue',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Register;
