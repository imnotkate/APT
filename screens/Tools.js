import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


const Tools = ({ navigation }) => {
  const tools = [
    {
      title: 'Custom Tunings',
      onPress: () => navigation.navigate('CustomTunings'), // Navigate to MetronomePage on press
    },
    {
      title: 'String Winder',
      onPress: () => navigation.navigate('Winder'), // Navigate to MetronomePage on press
    },
    {
      title: 'Metronome',
      onPress: () => navigation.navigate('Metronome'), // Navigate to MetronomePage on press
    },
    // Add more tools as needed
  ];

  return (
    
    <View style={styles.container}>
      <Text style={{fontSize: 38, paddingTop: 30, paddingBottom: 90, fontWeight: 'bold', color: '#0e1c36'}}>Tools</Text>
      {tools.map((tool, index) => (
        <TouchableOpacity key={index} style={styles.toolBlock} >
          <Text style={styles.toolTitle}>{tool.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 30,
    paddingTop: 100,
  },
  toolBlock: {
    // length: 250, // Adjust width as needed to fit multiple blocks in a row
    aspectRatio: 1.75, // Maintain square aspect ratio for blocks
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  toolTitle: {
    fontSize: 18,
    color: '#de1d35'
  },
});

export default Tools;
