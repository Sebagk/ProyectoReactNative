import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser.email,
      user: null,
      posts: []
    };
  }

  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let postArray = [];
        docs.forEach((doc) => {
          postArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        postArray.sort((a, b) => b.data.createdAt - a.data.createdAt);
        console.log("Usuario logeado:", auth.currentUser.email);
        this.setState({
          posts: postArray
        });
      });
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(snapshot => {
        if (true) {
          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();
          console.log(userData);
          this.setState({
            user: userData.username
          });
        }
      });
  }

  Logout = () => {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => console.log(error));
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
            <Post
              post={item}
              onDelete={this.deletePost}
              showDeleteButton={true}
            />
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
    padding: 25,
    backgroundColor: '#ecf0f1',
    backgroundColor: '#ecf0f1'
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 25,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 4,
  },
  infoText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  noPostsText: {
    textAlign: 'center',
    color: '#bdc3c7',
    fontSize: 18,
    marginTop: 25,
  },
});

export default Profile;
