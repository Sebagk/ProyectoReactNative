import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      registered: false,
      error: '',
    };
  }

  register = () => {
    const { email, password, userName } = this.state;
  
    if (!email || !password || !userName) {
      this.setState({ error: 'Complete todos los campos de manera correcta.' });
      return;
    }
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({ registered: true, error: '' });
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        this.setState({ error: 'Fallo en el registro ' });
      });
  };
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Username"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}

        <Button title="Register" onPress={this.register} />

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>Ya tienes una cuenta? Ir a Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Register;
