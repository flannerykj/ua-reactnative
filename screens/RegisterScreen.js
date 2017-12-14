import React from 'react';
import { StyleSheet, Text, ScrollView, ListView, ActivityIndic} from 'react-native';
import { connect } from 'react-redux';

import {bindActionCreators} from 'redux';
import authActions from '../actions/auth';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import {styles, colors} from '../styles/main.js';
class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      username: '',
      password: '',
      password2: ''
    }
  }
  componentDidMount() {
    if (this.props.auth.registrationStatus == 'success') {
      this.setState({
        registrationSuccess: "Registration successful"
      });
    }
    this.props.actions.resetRegistrationStatus();
  }

  onRegister = () => {
    console.log(this.state.username, this.state.password);
    this.props.actions.onRegister({
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
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
        {(this.state.registrationSuccess)?(<Text>
          {this.state.registrationSuccess}
          </Text>)
          :<Text></Text>}

        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={(email) => this.setState({email})}

          autoCapitalize='none'
          />

        <FormLabel>Username</FormLabel>
        <FormInput
          onChangeText={(username) => this.setState({username})}
          autoCapitalize='none'
        />

        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={(password) => this.setState({password})}
          autoCapitalize='none'
          secureTextEntry={true}
          />
        <FormLabel>Password (again)</FormLabel>
        <FormInput
          onChangeText={(password2) => this.setState({password2})}
          autoCapitalize='none'
          secureTextEntry={true}
        />

        <Button
          onPress={this.onRegister}
          title="Register"
          buttonStyle={styles.button}
          backgroundColor={colors.info}/>

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
)(RegisterScreen);
