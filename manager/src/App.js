import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    // Connect the application with the specific firebase database
    const config = {
      apiKey: 'AIzaSyCBPdpVjHvfpQwDqLjgetJFMe1b78tMl_I',
      authDomain: 'manager-e3359.firebaseapp.com',
      databaseURL: 'https://manager-e3359.firebaseio.com',
      projectId: 'manager-e3359',
      storageBucket: 'manager-e3359.appspot.com',
      messagingSenderId: '470741785329'
    };

    // Initialise the app with the firebase database
    firebase.initializeApp(config);
  }

  render() {
    // Create the store
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
