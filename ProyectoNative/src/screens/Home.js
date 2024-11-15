import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, db } from "../firebase/config";
import { Component } from 'react';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });
    db.collection("posts").onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          data: doc.data,
        });
      });
      this.setState({
        posts: posts,
        loading: false,
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pantalla de Home</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
          <Text style={styles.linkText}>Ir a Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.linkText}>Ir a Register</Text>
        </TouchableOpacity>
        {/* {!this.state.loading && <FlatList
          data={this.state.posts}
          keyExtractor={(post) => post.id}
          renderItem={({ item }) => <Text>{item.data.text}</Text>}
        />} */}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  linkText: {
    color: "blue",
    fontSize: 18,
    marginTop: 10,
  },
});

export default Home;
