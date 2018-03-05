import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ClientCreate from './components/ClientCreate';
import ClientList from './components/ClientList';
import ClientLoginForm from './components/ClientLoginForm';
import GlobalExerciseList from './components/GlobalExerciseList';
import PTLoginForm from './components/PTLoginForm';
import RoleChoice from './components/RoleChoice';
import WorkoutCoolDown from './components/WorkoutCoolDown';
import WorkoutCreate from './components/WorkoutCreate';
import WorkoutDetail from './components/WorkoutDetail';
import WorkoutExerciseTimer from './components/WorkoutExerciseTimer';
import WorkoutList from './components/WorkoutList';
import WorkoutRestTimer from './components/WorkoutRestTimer';
import WorkoutReview from './components/WorkoutReview';
import WorkoutWarmUp from './components/WorkoutWarmUp';

const RouterComponent = () => {
  return (
    <Router>
      <Scene
        key="root"
        hideNavBar
      >
        <Scene key="auth">
          <Scene
            key="roleChoice"
            component={RoleChoice}
            title="Choose your role"
            backTitle=" "
            initial
          />
          <Scene
            key="ptLogin"
            component={PTLoginForm}
            title="Personal Trainer Login"
            onBack={() => Actions.roleChoice()}
            onLeft={() => Actions.roleChoice()}
          />
          <Scene
            key="clientLogin"
            component={ClientLoginForm}
            title="Client Login"
            onBack={() => Actions.roleChoice()}
            onLeft={() => Actions.roleChoice()}
          />
        </Scene>

        <Scene key="ptSide">
          <Scene
            onRight={() => Actions.ptLogin()}
            rightTitle="Logout"
            key="clientList"
            component={ClientList}
            title="Clients"
            backTitle=" "
            initial
          />
          <Scene
            key="clientCreate"
            component={ClientCreate}
            title="Create Client"
            onBack={() => Actions.clientList()}
            onLeft={() => Actions.clientList()}
          />
          <Scene
            key="workoutList"
            component={WorkoutList}
            title="Profile"
            onBack={() => Actions.clientList()}
            onLeft={() => Actions.clientList()}
          />
          <Scene
            key="workoutCreate"
            component={WorkoutCreate}
            title="Create Workout"
            onBack={() => Actions.workoutList()}
            onLeft={() => Actions.workoutList()}
          />
          <Scene
            key="workoutDetail"
            component={WorkoutDetail}
            title="Workout"
            onBack={() => Actions.workoutList()}
            onLeft={() => Actions.workoutList()}
          />
          <Scene
            key="globalExerciseList"
            component={GlobalExerciseList}
            title="Exercise Select"
            onBack={() => Actions.workoutDetail()}
            onLeft={() => Actions.workoutDetail()}
          />
        </Scene>

        <Scene key="clientSide">
          <Scene
            key="clientWorkoutList"
            component={WorkoutList}
            title="Profile"
            onRight={() => Actions.clientLogin()}
            rightTitle="Logout"
            backTitle=" "
          />
          <Scene
            key="clientWorkoutDetail"
            component={WorkoutDetail}
            title="Workout"
            onBack={() => Actions.clientWorkoutList()}
            onLeft={() => Actions.clientWorkoutList()}
          />
          <Scene
            key="workoutWarmUp"
            component={WorkoutWarmUp}
            hideNavBar
          />
          <Scene
            key="workoutExerciseTimer"
            component={WorkoutExerciseTimer}
            hideNavBar
          />
          <Scene
            key="workoutRestTimer"
            component={WorkoutRestTimer}
            hideNavBar
          />
          <Scene
            key="workoutCoolDown"
            component={WorkoutCoolDown}
            hideNavBar
          />
          <Scene
            key="workoutReview"
            component={WorkoutReview}
            hideNavBar
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
