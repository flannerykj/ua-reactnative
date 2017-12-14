import React from 'react';
import {AlertIOS} from 'react-native';

export default class AutoComplete extends React.Component {
  constructor(props) {
    this.state({
      data: []
    });
  }
  onKeyPress = (text) => {

        var options = this.props.options.filter(function (option) {
            return option.name.toLowerCase().startsWith(text.toLowerCase())
        }).map(function (option) {
            return option.name;
        });

        this.setState({
            data:  options
        });
    }

  onSelect = (event) => {
        AlertIOS.alert(
            'You chose',
            event
        );
    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>
            Search for a country
                </Text>
            <AutoComplete onTyping={this.onKeyPress}
            onSelect={this.onSelect}
            suggestions={this.state.data}/>
            </View>
        );
    }
};
