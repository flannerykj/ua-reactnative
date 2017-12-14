import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import WorkListScreen from './screens/WorkListScreen';

import WorkDetailScreen from './screens/WorkDetailScreen';
import ProfileScreen from './screens/ProfileScreen';

import SettingsScreen from './screens/SettingsScreen';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import NewWorkScreen from './screens/NewWorkScreen';
import NewWorkSuccessScreen from './screens/NewWorkSuccessScreen';

export const FeedStack = StackNavigator({
  Feed: {
    screen: WorkListScreen,
    navigationOptions: {
      title: 'Works',
    },
  },
  WorkDetail: {
    screen: WorkDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Details`,
    }),
  },
});
export const NewWorkStack = StackNavigator({
  NewWork: {
    screen: NewWorkScreen,
    navigationOptions: {
      title: 'New Work',
    },
  },
  NewWorkSuccess: {
    screen: NewWorkSuccessScreen,
    navigationOptions: {
      title: 'Sucessfully submitted',
    },
  },

});
export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Works',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  NewWork: {
    screen: NewWorkStack,
    navigationOptions: {
      tabBarLabel: 'New Work',
      tabBarIcon: ({ tintColor }) => <Icon name="add" size={35} color={tintColor} />,
    },
  },

  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
});


export const AuthStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Register',
    },
  },

});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
