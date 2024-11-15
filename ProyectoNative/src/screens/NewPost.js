import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";


export class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errorMsg: ""
    };
  }
  onSumbit = (text) => {
    if (this.state.text === ''){
      this.setState({errorMsg: 'El texto no puede ser vacío'})
      return;
    }
    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        text: this.state.text,
        createdAt: Date.now(),
      })
      .then((response) => {
        this.props.navigation.navigate("Home");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <View>
        <TextInput
          keyboardType="default"
          placeholder="post"
          onChangeText={(text) => this.setState({ text: text })}
          value={this.state.text}
        />
        <TouchableOpacity onPress={() => this.onSumbit(this.state.text)}>
          <Text>crear</Text>
        </TouchableOpacity>
        {this.state.errorMsg ? <Text>{this.state.errorMsg}</Text> : null}
      </View>
    )
  }
}

export default NewPost