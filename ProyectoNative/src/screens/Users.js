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
    padding: 18,
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  userItem: {
    padding: 18,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#7f8c8d",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  username: {
    fontSize: 20,
    color: "#34495e",
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#95a5a6',
    marginTop: 18,
  },
  searchInput: {
    flex: 1,
    borderColor: "#bdc3c7",
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginRight: 12,
    backgroundColor: "#ffffff",
  },
  resetButton: {
    color: "#2980b9",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    padding: 16,
    marginTop: 12,
  },
});


export default Users;
