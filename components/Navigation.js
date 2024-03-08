import React from 'react';
import { Hammer, Arc3dCenterPoint, Settings } from 'iconoir-react-native';
import Tools from '../screens/Tools';
import Tune from '../screens/Tuner';
import Setting from '../screens/Settings';
import { StyleSheet, Animated, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants/Theme';
import { Dimensions } from 'react-native';

const tabs = [
  {
    name: 'Tune',
    screen: Tune,
    options: {
      tabBarIcon: ({ focused }) => (
        <Arc3dCenterPoint
          color={focused ? '#0e1c36' : 'gray'}
          height={32}
          width={32}
        />
      ),
    },
  },
  {
    name: 'Tools',
    screen: Tools,
    options: {
      tabBarIcon: ({ focused }) => (
        <Hammer color={focused ? '#0e1c36' : 'gray'} height={32} width={32} />
      ),
    },
  },
  {
    name: 'Settings',
    screen: Setting,
    options: {
      tabBarIcon: ({ focused }) => (
        <Settings color={focused ? '#0e1c36' : 'gray'} height={32} width={32} />
      ),
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
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        {tabs.map(({ name, screen, options }, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              options={options}
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
  tabBarStyle: {
    backgroundColor: '#f5f5f5', // Light gray background
    borderTopWidth: 1, // Add a top border
    borderTopColor: '#d9d9d9', // Light gray border color
    shadowColor: '#000', // Add a shadow
    shadowOffset: {
      width: 0,
      height: -2, // Negative value for upward shadow
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5, // Add elevation for Android
  },
});

export default Navigation;