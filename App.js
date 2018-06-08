/*import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// reducers
const aReducer = (state = { number: 0 }, actions) => {
  switch (actions.type) {
      case 'RANDOMIZE_ITEM':
          return { ...state, number: Math.random() };
  }
  return state;
};

// store creation
const store = createStore(
  combineReducers({ a: aReducer })
);

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
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



const ReduxApp = connect((state) => (state))(App);

export default () => (
    <Provider store={store}>
        <ReduxApp />
    </Provider>
);
*/
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Splashscreen, Home, About } from './screens';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import { View, StatusBar, Button, TouchableOpacity, Text, SectionList, Animated, Image, Easing, Icon, ScrollView, FlatList, Platform, PanResponder, Dimensions } from 'react-native';

// reducers
const aReducer = (state = { number: 0 }, actions) => {
  switch (actions.type) {
    case 'RANDOMIZE_ITEM':
      return { ...state, number: Math.random() };
  }
  return state;
};

// store creation
const store = createStore(
  combineReducers({ a: aReducer })
);

const SECTIONS = [
  { title: 'A', data: ['Deaavain'] },
  { title: 'B', data: ['Jackson', 'Jame4s4', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
  { title: 'C', data: ['Devin'] },
  { title: 'D', data: ['Devin'] },
  { title: 'E', data: ['444Devin'] },
  { title: 'F', data: ['Deavin'] },
  { title: 'G', data: ['Devin'] },
  { title: 'H', data: ['Devin'] },
  { title: 'I', data: ['Devin'] },
  { title: 'J', data: ['Devin'] },
  { title: 'K', data: ['Devin'] },
  { title: 'L', data: ['Devin'] }
];

const styles = {
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  scroll: {
    marginTop: 150
  },
  map: {
    backgroundColor: 'red',
    height: 150,
    width: '100%',
    position: 'absolute',
    top: 0
  },
  section: {
  }
};

/*class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.map}></Animated.View>
        <ScrollView style={styles.scroll}>
          <SectionList
            style={styles.section}
            sections={SECTIONS}
            renderItem={({ item }) => <Text onPress={() => { this.props.navigation.navigate('Details'); }} style={styles.item}>{item}</Text>}
            renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      </View>
    );
  }
}*/

const MainStack = createStackNavigator(
  {
    Splashscreen: { screen: Splashscreen },
    Home: { screen: Home },

  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'Home'
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    About: { screen: About }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
    },
  }
);



const ReduxApp = connect((state) => (state))(RootStack);




export default () => (
  <Provider store={store}>
    <ReduxApp />
  </Provider>
);

