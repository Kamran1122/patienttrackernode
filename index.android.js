import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import axios from 'axios';

export default class patienttrackernode extends Component {
  constructor(props){
    super(props);
    this.state = { data: [], loading: true }
  }
  componentWillMount(){
    fetch('http://localhost:3001/api/patients')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('fafalkjl')
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

  }
  render() {
    return this.state.loading===true ? <Text>Loading...</Text> : (
      <View style={styles.container}>
        {console.log(this.state.data)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('patienttrackernode', () => patienttrackernode);
