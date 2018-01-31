import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClientList from './components/ClientList';
import ClientCreate from './components/ClientCreate';
import ClientEdit from './components/ClientEdit';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="root">
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" />
        </Scene>

        <Scene key="main">
          <Scene
            onRight={() => Actions.clientCreate()}
            rightTitle="Add"
            key="clientList"
            component={ClientList}
            title="Clients"
            initial
          />
          <Scene key="clientCreate" component={ClientCreate} title="Create Client" />
          <Scene key="clientEdit" component={ClientEdit} title="Edit Client" />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
