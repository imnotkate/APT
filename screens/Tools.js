import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { MusicDoubleNotePlus, Arc3dCenterPoint } from 'iconoir-react-native';

const Tools = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const numColumns = 2; // Number of icons per row in the grid
  const numRows = 3 ;
  const iconHeight = screenHeight / numRows - 100;
  const iconWidth = screenWidth / numColumns - 100; // Adjust the factor as per your need

  const tools = [
    {
      title: 'Add Custom Tuning',
      icon: <MusicDoubleNotePlus color="black" height={iconHeight} width={iconWidth}/>,
      onPress: () => navigation.navigate('CustomTunings'),
    },
    {
      title: 'Metronome',
      icon: <Arc3dCenterPoint color="black" height={iconHeight} width = {iconWidth} />,
      onPress: () => navigation.navigate('Metronome'),
    },
    {
      title: 'Metronome',
      icon: <Arc3dCenterPoint color="black" height={iconHeight} width = {iconWidth} />,
      onPress: () => navigation.navigate('Metronome'),
    },
    {
      title: 'Metronome',
      icon: <Arc3dCenterPoint color="black" height={iconHeight} width = {iconWidth} />,
      onPress: () => navigation.navigate('Metronome'),
    },
    {
      title: 'Metronome',
      icon: <Arc3dCenterPoint color="black" height={iconHeight} width = {iconWidth} />,
      onPress: () => navigation.navigate('Metronome'),
    },
    {
      title: 'Metronome',
      icon: <Arc3dCenterPoint color="black" height={iconHeight} width = {iconWidth} />,
      onPress: () => navigation.navigate('Metronome'),
    },
    // Add more tools as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} style={styles.buttonContainer} onPress={tool.onPress}>
            {tool.icon}
            <Text style={styles.title}>{tool.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    padding: 1,
  },
});

export default Tools;
