import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config';

export class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
        usuarios: [],
    };
}


  componentDidMount() {
    db.collection('users')
    .onSnapshot((docs) => {
            let usuarios = [];
            docs.forEach(doc => {
                usuarios.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({
                usuarios: usuarios,
            });
        }
    );
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Usuarios</Text>
        <FlatList
          data={this.state.usuarios}
          keyExtractor={(item) => item.id} 
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.username}>{item.data.username}</Text> 
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  userItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  username: {
    fontSize: 18,
    color: '#333',
  },
});

export default Users;