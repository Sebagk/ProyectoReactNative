import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      cantidad: this.props.post.data.likes.length,
    };
  }

  componentDidMount() {
    if (this.props.post.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true,
      });
    }
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

  handlelLike() {
    db.collection("posts")
      .doc(this.props.post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          like: true,
          cantidad: this.props.post.data.likes.length,
        })
      );
  }

  handlelUnLike() {
    db.collection("posts")
      .doc(this.props.post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          like: false,
          cantidad: this.props.post.data.likes.length,
        })
      );
  }

  render() {
    const { post, showDeleteButton } = this.props;
    return (
      <View style={styles.postContainer}>
        <Text>{post.data.owner}</Text>
        <Text style={styles.postText}>{post.data.text}</Text>
        {this.state.like ? (
          <TouchableOpacity onPress={() => this.handlelUnLike()}>
            <Text>Dislike</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.handlelLike()}>
            <Text>Like</Text>
          </TouchableOpacity>
        )}
        <Text>Cantidad de likes: {this.state.cantidad}</Text>
        {showDeleteButton && (
          <TouchableOpacity style={styles.deleteButton} onPress={this.deletePost}>
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 100,
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
