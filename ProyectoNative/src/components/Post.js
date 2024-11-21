import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase/config';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deletePost = () => {
    const { post } = this.props;

    db.collection("posts")
      .doc(post.id)
      .delete()
      .then(() => {
        this.props.onDelete(post.id); 
      })
      .catch((error) => {
        console.log("Error al eliminar el post: ", error);
      });
  };

  render() {
    const { post } = this.props; 
    return (
      <View style={styles.postContainer}>
        <Text style={styles.postText}>{post.data.text}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={this.deletePost}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 18,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  postText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Post;
