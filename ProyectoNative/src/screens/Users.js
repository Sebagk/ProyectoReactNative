import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { db, auth } from "../firebase/config";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      search: "",
      filteredUsuarios: [],
    };
  }

  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let usuarios = [];
      docs.forEach((doc) => {
        usuarios.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        usuarios: usuarios,
        filteredUsuarios: usuarios,
      });
    });
  }

  handleSearch(userValue) {
    this.setState({
      search: userValue,
      filteredUsuarios: this.state.usuarios.filter(user => user.data.username.toLowerCase().includes(userValue.toLowerCase()))
    })
  }
  handleResetFilter() {
    this.setState({
      search: "",
      filteredUsuarios: this.state.usuarios
    })
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Usuarios</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar usuario"
            value={this.state.search}
            onChangeText={(text) => this.handleSearch(text)}
          />
          <Text style={styles.resetButton} onPress={() => this.handleResetFilter()}>
            Limpiar
          </Text>
        </View>
        {this.state.filteredUsuarios.length > 0 ? (<FlatList
          data={this.state.filteredUsuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.username}>{item.data.username}</Text>
            </View>
          )}
        />) : (<Text style={styles.noResultsText}>
          El Usuario no existe
        </Text>)}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  userItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  username: {
    fontSize: 18,
    color: "#333",
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginRight: 8,
  },
  resetButton: {
    color: "#007BFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    padding: 20
  },
});

export default Users;
