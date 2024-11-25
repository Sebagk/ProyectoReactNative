import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

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

    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pantalla de Home</Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              post={item}
              onDelete={this.deletePost}
              showDeleteButton={false}
            />
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
