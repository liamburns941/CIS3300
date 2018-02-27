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
import WorkoutReview from './components/WorkoutReview';
import ExerciseCreate from './components/ExerciseCreate';
import GlobalExerciseList from './components/GlobalExerciseList';
import WorkoutWarmUp from './components/WorkoutWarmUp';
import WorkoutExerciseTimer from './components/WorkoutExerciseTimer';
import WorkoutRestTimer from './components/WorkoutRestTimer';
import WorkoutCoolDown from './components/WorkoutCoolDown';

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
            onRight={() => Actions.clientCreate()}
            rightTitle="Create"
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
            backTitle=" "
            renderBackButton={() => (null)}
            left={() => null}
            hideNavBar={true}
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
            title="Warm Up"
            backTitle=" "
            renderBackButton={() => (null)}
            left={() => null}
            hideNavBar={true}
          />
          <Scene
            key="workoutExerciseTimer"
            component={WorkoutExerciseTimer}
            title="Exercise"
            backTitle=" "
            renderBackButton={() => (null)}
            left={() => null}
            hideNavBar={true}
          />
          <Scene
            key="workoutRestTimer"
            component={WorkoutRestTimer}
            title="Rest"
            backTitle=" "
            renderBackButton={() => (null)}
            left={() => null}
            hideNavBar={true}
          />
          <Scene
            key="workoutCoolDown"
            component={WorkoutCoolDown}
            title="Cool Down"
            backTitle=" "
            renderBackButton={() => (null)}
            left={() => null}
            hideNavBar={true}
          />
          <Scene
            key="workoutReview"
            component={WorkoutReview}
            title="Review"
            backTitle=" "
            renderBackButton={() => (null)}
            left={() => null}
            hideNavBar={true}
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
