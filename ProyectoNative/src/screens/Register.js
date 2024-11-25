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
        console.log("El usuario ya estaba logeado");
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
    padding: 25,
    backgroundColor: '#ecf0f1',
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 25,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 4,
  },
  infoText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  noPostsText: {
    textAlign: 'center',
    color: '#bdc3c7',
    fontSize: 18,
    marginTop: 25,
  },
});

export default Register;
