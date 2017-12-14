import React from 'react';
import {Text, ScrollView, View, ListView, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';

import {bindActionCreators} from 'redux';
import authActions from '../actions/auth';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import {styles, colors} from '../styles/main.js';



class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: '',
      password: ''
    }
  }

  onLogin = () => {
    console.log(this.state.username, this.state.password);
    this.props.actions.onLogin({
      username: this.state.username,
      password: this.state.password
    });
  }
  render() {
  if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView style={{flex: 1, paddingTop: 20}}>

        <FormLabel>Username</FormLabel>
        <FormInput
          onChangeText={(username) => this.setState({username})}
          autoCapitalize='none'/>
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={(password) => this.setState({password})}
          autoCapitalize='none'
          secureTextEntry={true}
        />
        <Button
          onPress={this.onLogin}
          title="Login"
          backgroundColor={colors.primary}
          buttonStyle={styles.button}/>

        <Button
          onPress={ () => this.props.navigation.navigate('Register')}
          title="or Register"
          buttonStyle={styles.button}/>
      </ScrollView>
    );
  }
}


export default connect(state => ({
    auth : state.auth
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(LoginScreen);
