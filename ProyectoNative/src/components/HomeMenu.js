import { StyleSheet, Text, View } from "react-native";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Users from "../screens/Users";
import NewPost from "../screens/NewPost";

const Tab = createBottomTabNavigator();

import React, { Component } from "react";

export class HomeMenu extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />

        <Tab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />

        <Tab.Screen
          options={{ headerShown: false }}
          name="Users"
          component={Users}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="NewPost"
          component={NewPost}
        />
      </Tab.Navigator>
    );
  }
}

export default HomeMenu;
