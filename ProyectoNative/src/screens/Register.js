import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';

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
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('HomeMenu');
      }
    });
  }

  register = () => {
    const { email, password, userName } = this.state;

    if (!email || !password || !userName) {
      this.setState({ error: 'Complete todos los campos de manera correcta.' });
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        if (response) {
          db.collection('users')
            .add({
              email: email,
              username: userName,
              createdAt: Date.now(),
            })
            .then(() => {
              this.setState({ registered: true, error: '' });
              this.props.navigation.navigate('Login');
            })
            .catch((error) => {
              this.setState({ error: 'Error al guardar datos del usuario: ' + error.message });
            });
        }
      })
      .catch((error) => {
        this.setState({ error: 'Error al registrarse: ' + error.message });
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
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => this.register()}
        >
          <Text style={styles.linkText}>Registrarse</Text>
        </TouchableOpacity>

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
    padding: 22,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 45,
    color: '#2c3e50',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1.5,
    marginBottom: 18,
    paddingLeft: 12,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#3498db',  
    alignItems: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});


export default Register;
