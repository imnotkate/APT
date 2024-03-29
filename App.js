import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import TabNavigator from './components/Navigation';
import Instruments from './screens/Instruments'
import Metronome from './screens/Metronome';
const Stack = createNativeStackNavigator();
import ChordLib from './screens/ChordLib';
import CustomTunings from './screens/CustomTunings';
import { LanguageProvider } from './screens/LanguageContext';
import i18n from './i18n';
import Guide from  "./screens/Guide";
import EarTrainer from './screens/EarTrainer';
import Winder from './screens/StringWinder';
import { LeftHandedProvider } from './screens/Context';

function App() {
  const isAuthenticated = true; // Replace with your authentication logic

  return (
    <LeftHandedProvider>
    <LanguageProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Root" component={TabNavigator} />
            <Stack.Screen name="Instruments" component={Instruments}/>
            <Stack.Screen name="Metronome" component={Metronome } />
            <Stack.Screen name="ChordLib" component={ChordLib} />
            <Stack.Screen name="CustomTunings" component={CustomTunings} />
            <Stack.Screen name="Guide" component={Guide} />
            <Stack.Screen name="EarTrainer" component={EarTrainer} />
            <Stack.Screen name="StringWinder" component={Winder} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>

    </NavigationContainer>
    </LanguageProvider>
    </LeftHandedProvider>
  );
}

export default App;