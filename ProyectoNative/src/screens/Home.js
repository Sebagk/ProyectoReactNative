import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db } from "../firebase/config";
import Post from '../components/Post';  // Importamos el componente Post

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
          data: doc.data(),
        });
      });
      this.setState({
        posts: posts,
        loading: false,
      });
    });
  }

  deletePost = (postId) => {
    db.collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        const postNew = this.state.userPosts.filter(post => post.id !== postId);
        this.setState({
          posts : postNew
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pantalla de Home</Text>
        
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post post={item} onDelete={this.deletePost} />
          )}
          ListEmptyComponent={
            !this.state.loading && <Text>No hay publicaciones disponibles</Text>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
