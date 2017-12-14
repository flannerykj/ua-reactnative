import React from 'react';
import { ScrollView, View, ActivityIndicator} from 'react-native';
import { Card, Button, Text, Avatar, List, ListItem} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import authActions from '../actions/auth';
import { connect } from 'react-redux';
import {styles, colors} from '../styles/main';
class ProfileScreen extends React.Component {

  onLogout = () => {
    this.setState({isLoading: true});
    this.props.actions.onLogout();
  }
  componentDidMount() {

  }
  render() {
    const user = this.props.auth.user;
    return (
      <ScrollView style={{flex: 1, paddingTop: 20}}>

      <View style={styles.container}>

        <Avatar
          large
          rounded
          source={{uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}}
          activeOpacity={0.7}
        />

      <Text h3>{user.username}</Text>
      <Text>{user.bio}</Text>

      </View>

      <View style={styles.section}>
      <List>
        <ListItem
          title='Edit Profile'
          leftIcon={{name: 'edit'}}
        />
        <ListItem
          title='Posted'
          leftIcon={{name: 'view-stream'}}
        />

        <ListItem
          title='Saved'
          leftIcon={{name: 'bookmark'}}
        />
        <ListItem
          title='Settings'
          leftIcon={{name: 'settings'}}
        />



    </List>
  </View>
        <Button
          onPress={this.onLogout}
          title="Log Out"
          backgroundColor={colors.danger}
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
)(ProfileScreen);
