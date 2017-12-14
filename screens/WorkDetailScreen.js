import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button, Text } from 'react-native-elements';
import {timeSince} from '../services/utils';

export default class New extends React.Component {
  render() {

    const work = this.props.navigation.state.params.work;
    return (
      <ScrollView style={{flex: 1, paddingTop: 20}}>
          <Card
              image={{uri: work.image}}
              key={work.id}
            >
              <Text
                h3>{work.artist}</Text>
              <Text style={{marginBottom: 10}}>
                Posted by {work.username} {timeSince(new Date(work.date_posted))} ago
              </Text>
              <Text>{work.description}</Text>


        </Card>
      </ScrollView>
    );
  }
}


