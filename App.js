import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import TabNavigator from './components/Navigation';
import Instruments from './screens/Instruments'
import Tuner from './screens/Tuner';
import Metronome from './screens/Metronome';
const Stack = createNativeStackNavigator();

function App() {
  const isAuthenticated = true; // Replace with your authentication logic

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Root" component={TabNavigator} />
            <Stack.Screen name="Instruments" component={Instruments}/>
            <Stack.Screen name="Metronome" component={Metronome}/>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;