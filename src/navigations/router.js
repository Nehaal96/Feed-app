import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginView from '@screens/Login/login-screen.view';
import HomeView from '@screens/Home/home-screen.view';

const HomeStack = createStackNavigator(
  {
    LoginView,
    HomeView
  },
  {
    initialRouteName: 'LoginView',
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gestureEnabled: false,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: HomeStack,
    },
    {
      headerMode: 'none',
      mode: 'modal',
      defaultNavigationOptions: {
        gesturesEnabled: false,
      },
    },
  ),
);
