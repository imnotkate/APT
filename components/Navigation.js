import React from 'react';
import { Hammer, Arc3dCenterPoint, Settings } from 'iconoir-react-native';
import Tools from '../screens/Tools';
import Tune from '../screens/Tuner';
import Profile from '../screens/UserProfile';
import { StyleSheet, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants/Theme';
import { Dimensions } from 'react-native';

const tabs = [
    {
      name: 'Tune',
      screen: Tune,
      options: {
        tabBarIcon: ({ focused }) => <Arc3dCenterPoint color="black" height={32} width={32} />
      },
    },
    {
      name: 'Tools',
      screen: Tools,
      options: {
        tabBarIcon: ({ focused }) => <Hammer color="black" height={32} width={32} />
      },
    },
    {
      name: 'Profile',
      screen: Profile,
      options: {
        tabBarIcon: ({ focused }) => <Settings color="black" height={32} width={32} />
      },
    },
  ];

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        {tabs.map(({ name, screen, options }, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              options={options} // Pass the options directly
              listeners={{
                focus: () => {
                  Animated.spring(offsetAnimation, {
                    toValue: index * (Dimensions.get('window').width / tabs.length),
                    useNativeDriver: true,
                  }).start();
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: offsetAnimation,
              },
            ],
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: 10,
    height: 2,
    left: Dimensions.get('window').width / tabs.length / 2 - 5,
    bottom: 30,
    backgroundColor: colors.primary,
    zIndex: 100,
  },
});

export default Navigation;