import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Title extends React.Component {
  render() {
    return(
      <View>
        <Text style={styles.titleText}>FIND MY CAR</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 28,
    paddingRight: 18,
    borderRadius: 7,
    marginBottom: 7,
    width: 180,
    alignItems: 'center',
  },
});
