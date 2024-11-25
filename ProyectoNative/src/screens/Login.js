import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  login = () => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Complete todos los campos de manera correcta.' });
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: '' });
        this.props.navigation.navigate('HomeMenu');
      })
      .catch(error => {
        this.setState({ error: 'Credenciales inválidas.' });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}

        <TouchableOpacity style={styles.linkButton} onPress={this.login}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.linkText}>Volver a Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 35,
    color: '#2c3e50',
  },
  input: {
    height: 50,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 25,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#3498db',
    alignItems: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Login;
