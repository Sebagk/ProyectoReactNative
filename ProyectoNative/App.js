import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import NewPost from './src/screens/NewPost';
import Profile from './src/screens/Profile';
import Users from './src/screens/Users';
import Register from './src/screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

