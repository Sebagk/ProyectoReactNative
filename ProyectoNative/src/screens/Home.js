import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeMenu from '../components/HomeMenu';

const Home = (navigation) => {
  return (
    <View style={styles.container}>
      <HomeMenu />
      <Text style={styles.text}>Pantalla de Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.linkText}>Ir a Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Ir a Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Ir a Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  linkText: {
    color: 'blue',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Home;
