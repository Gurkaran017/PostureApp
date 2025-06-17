import { enableScreens } from 'react-native-screens';

enableScreens();


import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import PoseScreen from './screens/PoseScreen';
import CameraScreen from './screens/CameraScreen';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Pose' component={PoseScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Text>
    //   Hello
    // </Text>
  )
}
