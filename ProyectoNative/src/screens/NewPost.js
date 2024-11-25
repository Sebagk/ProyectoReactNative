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
        likes: [],
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
          placeholder="Escriba su post aquí"
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
    padding: 30,
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2c3e50',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#95a5a6',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1abc9c',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  errorText: {
    color: '#e74c3c',
    marginTop: 12,
    fontSize: 16,
  },
});

export default NewPost;
