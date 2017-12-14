import React from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, TextInput, CameraRoll} from 'react-native';
import { connect } from 'react-redux';

import {bindActionCreators} from 'redux';
import workActions from '../actions/works';
import artistActions from '../actions/artists';
import { FormLabel, FormInput, Button} from 'react-native-elements';

class NewWork extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      artistQuery: '',
      username: '',
      password: ''
    }
  }
  componentDidMount() {
    this.findArtists(this.state.artistQuery);
  }
  findArtists = () => {
    this.props.artistActions.getArtists({name: this.state.artistQuery});
  }
  handleSubmit = (entry) => {
    entry.token = this.props.auth.token;
    this.props.onSubmit(entry);
    this.setState({
      redirect: true
    });
  }
  pickPhotos = () => {
  CameraRoll.getPhotos({
       first: 20,
       assetType: 'All',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
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

        <FormLabel>Photos</FormLabel>
        <Button onPress={this.pickPhotos} title='Choose Photos'/>
        <TextInput
          onChangeText={(username) => this.setState({username})}/>
        <FormLabel>Artist</FormLabel>
        <TextInput onChangeText={(password) => this.setState({password})}/>
        <Button onPress={this.handleSubmit} title="Login"/>

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
  auth : state.auth,
  artists: state.artists
  }),
  (dispatch) => ({
    artistActions: bindActionCreators(artistActions, dispatch),
    workActions: bindActionCreators(workActions, dispatch)
  })
)(NewWork);
