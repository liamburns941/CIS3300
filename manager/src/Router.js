import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ClientList from './components/ClientList';
import ClientCreate from './components/ClientCreate';
import ClientEdit from './components/ClientEdit';
import WorkoutList from './components/WorkoutList';
import WorkoutCreate from './components/WorkoutCreate';
import ExerciseList from './components/ExerciseList';
import ExerciseCreate from './components/ExerciseCreate';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Welcome" />
        </Scene>

        <Scene key="main">
          <Scene
            onRight={() => Actions.clientCreate()}
            rightTitle="Create"
            key="clientList"
            component={ClientList}
            title="Clients"
            initial
          />
          <Scene key="clientCreate" component={ClientCreate} title="Create Client" />
          <Scene key="clientEdit" component={ClientEdit} title="Edit Client" />
          <Scene
            key="workoutList"
            component={WorkoutList}
            title="Profile"
          />
          <Scene key="workoutCreate" component={WorkoutCreate} title="Create Workout" />
          <Scene
            key="exerciseList"
            component={ExerciseList}
            title="Exercises"
          />
          <Scene key="exerciseCreate" component={ExerciseCreate} title="Create Workout" />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
