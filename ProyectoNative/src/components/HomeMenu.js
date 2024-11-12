import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeMenu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.menuText}>Menú de Inicio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeMenu;
