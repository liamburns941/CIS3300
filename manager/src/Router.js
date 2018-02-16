import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import RoleChoice from './components/RoleChoice';
import PTLoginForm from './components/PTLoginForm';
import ClientLoginForm from './components/ClientLoginForm';
import ClientList from './components/ClientList';
import ClientCreate from './components/ClientCreate';
import ClientEdit from './components/ClientEdit';
import WorkoutList from './components/WorkoutList';
import WorkoutCreate from './components/WorkoutCreate';
import WorkoutDetail from './components/WorkoutDetail';
import ExerciseCreate from './components/ExerciseCreate';
import WorkoutTimer from './components/WorkoutTimer';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="auth">
          <Scene
            key="roleChoice"
            component={RoleChoice}
            title="Choose your role"
            initial
          />
          <Scene key="ptLogin" component={PTLoginForm} title="Personal Trainer Login" />
          <Scene key="clientLogin" component={ClientLoginForm} title="Client Login" />
        </Scene>

        <Scene key="ptSide">
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
            onBack={() => Actions.pop()}
          />
          <Scene key="workoutCreate" component={WorkoutCreate} title="Create Workout" />
          <Scene key="workoutDetail" component={WorkoutDetail} title="Workout" />
          <Scene key="exerciseCreate" component={ExerciseCreate} title="Create Workout" />
        </Scene>

        <Scene key="clientSide">
          <Scene
            key="clientMyProfile"
            component={WorkoutDetail}
            title="My Profile"
            backTitle="BACK"
            onBack={() => Actions.clientLogin()}
          />
          <Scene key="workoutTimer" component={WorkoutTimer} title="Timer" />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
