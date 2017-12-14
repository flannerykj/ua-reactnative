import React from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';

import {bindActionCreators} from 'redux';
import workActions from '../actions/works';
import { FormLabel, FormInput } from 'react-native-elements'

class NewWork extends React.Component {
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
      <View style={{flex: 1, paddingTop: 20}}>

        <FormLabel>Username</FormLabel>
        <TextInput
          onChangeText={(username) => this.setState({username})}/>
        <FormLabel>Password</FormLabel>
        <TextInput onChangeText={(password) => this.setState({password})}/>
        <Button onPress={this.onLogin} title="Login"/>

        <Text onPress={ () => this.props.navigation.navigate('Register')}> or Register</Text>
      </View>
    );
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
    actions: bindActionCreators(workActions, dispatch)
  })
)(NewWork);
