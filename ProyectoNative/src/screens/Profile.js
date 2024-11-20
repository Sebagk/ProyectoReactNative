import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '../firebase/config';

export class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser.email,
      user: auth.currentUser.user,
      posts: []
    };
  }

  componentDidMount() {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let postArray = [];
        docs.forEach((doc) => {
          postArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.setState({
          posts: postArray,
        });
      });
  }
  
  Logout = () => {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => console.log(error));
  };

  deletePost = (postId) => {
    db.collection("posts")
      .doc(postId)
      .delete()
      .catch((error) => {
        console.log("Error al eliminar el post: ", error);
      });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Perfil de Usuario</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Usuario: {this.state.user}</Text>
          <Text style={styles.infoText}>Email: {this.state.email}</Text>
          <Text style={styles.infoText}>Cantidad de posteos: {this.state.posts.length}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={this.Logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <FlatList 
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postText}>{item.data.text}</Text>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => this.deletePost(item.id)}
              >
                <Text style={styles.deleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}  
        />
        
        {this.state.posts.length === 0 && (
          <Text style={styles.noPostsText}>Aún no hay publicaciones.</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  noPostsText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Profile;
