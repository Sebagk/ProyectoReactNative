import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/AntDesign';

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
        <TouchableOpacity onPress={() => this.state.like ? this.handlelUnLike() : this.handlelLike()}>
          <Icon
            name={this.state.like ? "like1" : "like2"}
            size={30}
            color={this.state.like ? "blue" : "gray"}
          />
        </TouchableOpacity>
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
    backgroundColor: '#fafafa',
    paddingVertical: 25,
    paddingHorizontal: 18,
    marginBottom: 22,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  postText: {
    fontSize: 20,
    color: '#444',
    lineHeight: 28,
    marginBottom: 15,
    fontFamily: 'Arial',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Arial',
  },
});

export default Post;
