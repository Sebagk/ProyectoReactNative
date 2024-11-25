import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errorMsg: ""
    };
  }

  onSubmit = (text) => {
    if (this.state.text === '') {
      this.setState({ errorMsg: 'El texto no puede ser vacío' });
      return;
    }
    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        text: this.state.text,
        likes:[],
        createdAt: Date.now(),
      })
      .then((response) => {
        this.props.navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear post</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Escribe tu post"
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit(this.state.text)}>
          <Text style={styles.buttonText}>Crear</Text>
        </TouchableOpacity>
        {this.state.errorMsg ? <Text style={styles.errorText}>{this.state.errorMsg}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0066CC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});

export default NewPost;
