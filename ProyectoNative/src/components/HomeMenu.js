import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Users from "../screens/Users";
import NewPost from "../screens/NewPost";

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Tab = createBottomTabNavigator();

import React, { Component } from "react";

export class HomeMenu extends Component {
  render() {
    return (
      <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
        <Tab.Screen
          options={{
            tabBarIcon: () => <Ionicons name="home-outline" size={24} color="black" />,
            headerShown: false
          }}
          name="Home"
          component={Home}
        />

        <Tab.Screen
          options={{
            tabBarIcon: () => <Feather name="settings" size={24} color="black" />,
            headerShown: false
          }}
          name="Profile"
          component={Profile}
        />

        <Tab.Screen
          options={{
            tabBarIcon: () => <Feather name="users" size={24} color="black" />,
            headerShown: false
          }}
          name="Users"
          component={Users}
        />
        <Tab.Screen
          options={{
            tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />,
            headerShown: false
          }}
          name="NewPost"
          component={NewPost}
        />
      </Tab.Navigator>
    );
  }
}

export default HomeMenu;
