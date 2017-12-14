import React from 'react';
import { Root, Tabs, AuthStack } from './router';
import store from './store';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import authActions from './actions/auth';

import SplashScreen from './screens/SplashScreen';


import { StyleSheet, Text, View, ListView, ActivityIndicator, Button, TextInput } from 'react-native';

class AppContainer extends React.Component {
  componentWillMount(){
    this.props.actions.checkLocalAuthState();
    console.log('mount');
    console.log(this.props.auth);
  }
  render() {
      if (this.props.auth.currently=='LOGGED_IN'){
      return (
        <Root />
      )
      } else if (this.props.auth.currently=='ANONYMOUS'){
        return (
          <AuthStack />
        )
      } else if (this.props.auth.currently='LOADING'){
        return (<ActivityIndicator />)
      }else {
        return(<View><Text>none</Text></View>)
      }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default connect(state => ({
    auth : state.auth
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(AppContainer);
