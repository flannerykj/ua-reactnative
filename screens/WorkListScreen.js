import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator, Button as Button0 } from 'react-native';
import { Card, ListItem, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import workActions from '../actions/works';
import {timeSince} from '../services/utils';
import {styles, colors} from '../styles/main';

class WorkListScreen extends React.Component {
constructor(props) {
        super(props);
        this.state = {
          searchKey: '',
          min: 0,
          max: 30,
          works: [],
          total: 0,
          page: 1,
          mapView: false,
        };
    }
    componentDidMount() {
      this.findWorks();
    }
    searchKeyChangeHandler(searchKey) {
      console.log(searchKey);
      this.setState({searchKey: searchKey, page: 1}, this.findWorks);
    }
    rangeChangeHandler(values) {
        this.setState({min: values[0], max: values[1], page: 1}, this.findWorks);
    }

    findWorks() {
        this.props.actions.getWorks({search: this.state.searchKey, min: this.state.min, max: this.state.max, page: this.state.page})
    }

    nextPageHandler() {
        let p = this.state.page + 1;
        this.setState({page: p}, this.findWorks);
    }

    prevPageHandler() {
        let p = this.state.page - 1;
        this.setState({page: p}, this.findWorks);
    }

  render() {
    if (this.props.works.hasreceiveddata==true) {
      return (
        <ScrollView>
          {this.props.works.items.map((work) =>
            {
              console.log(work.image);
              return (
                <View
                  key={work.id}
                  >
                  <Card
                    image={{uri: work.image}}
                    >
                    <Text
                      h3>{work.artist}</Text>
                    <Text style={{marginBottom: 10}}>
                      Posted by {work.username} {timeSince(new Date(work.date_posted))} ago
                    </Text>
                  </Card>
                  <Button
                    onPress={ () => this.props.navigation.navigate('WorkDetail', {id: work.id, work: work})}
                    buttonStyle={styles.button}
                    title='See Details'
                    backgroundColor={colors.info}/>
                </View>
          )})}
        </ScrollView>
      );

    } else {
      return (
        <ActivityIndicator />
      )

          }
  }
}

export default connect(state => ({
    works: state.works
  }),
  (dispatch) => ({
    actions: bindActionCreators(workActions, dispatch)
  })
)(WorkListScreen);
