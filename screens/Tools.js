import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Linking, Alert} from 'react-native';
import { OpenBook, Arc3dCenterPoint, Refresh, Metro, Learning, Spotify } from 'iconoir-react-native';
import { useNavigation } from '@react-navigation/native';
const Tools = () => {
  const navigation = useNavigation();

  const handleOpenSpotify = async () => {
    const spotifyUrl = 'spotify://'; 
    try {
      await Linking.openURL(spotifyUrl);
    } catch (err) {
      const webUrl = 'https://www.spotify.com';
      Alert.alert(
        'Open Spotify in the browser',
        'The Spotify app is not installed. Do you want to open the website?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open', onPress: () => Linking.openURL(webUrl) },
        ]
      );
    }
  };
  const handleEarTrainerPress = () => {
    navigation.navigate('EarTrainer');
  };

  const tools = [
    {
      title: 'Custom Tunings',
      onPress: () => navigation.navigate('CustomTunings'), // Navigate to CustomTunings on press
      icon: <Arc3dCenterPoint color={'#de1d35'} height={40} width={40} />,
    },
    {
      title: 'String Winder',
      onPress: () => navigation.navigate('StringWinder'), // Navigate to StringWinder on press
      icon: <Refresh color={'#de1d35'} height={40} width={40} />,
    },
    {
      title: 'Metronome',
      onPress: () => navigation.navigate('Metronome'), // Navigate to MetronomePage on press
      icon: <Metro color={'#de1d35'} height={40} width={40} />,
    },
    {
      title: 'Chord Library',
      onPress: () => navigation.navigate('ChordLib'), // Navigate to ChordLib on press
      icon: <OpenBook color={'#de1d35'} height={40} width={40} />,
    },
    {
      title: 'Ear Trainer',
      onPress: (handleEarTrainerPress), // Navigate to EarTrainer on press
      icon: <Learning color={'#de1d35'} height={40} width={40} />,
    },
    {
      title: 'Spotify',
      onPress: handleOpenSpotify, // open Spotify on press
      icon: <Spotify color={'#de1d35'} height={40} width={40} />,
    },
  ];

  return (
    <View classnName="bg-grey, w-full, h-full">

    <View className="flex items-center">
    <Text style={{fontSize: 38, paddingTop: 100, fontWeight: 'bold', color: '#0e1c36'}}>Tools</Text>
    </View>


    <View style={styles.container}>
      {tools.map((tool, index) => (
        <TouchableOpacity key={index} style={styles.toolBlock} onPress={tool.onPress}>
          <View>{tool.icon}</View>
          <Text style={styles.toolTitle}>{tool.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 40,
  },
  toolBlock: {
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 160,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  toolTitle: {
    fontSize: 16,
    color: '#de1d35', 
    paddingTop: 10,
   },
});

export default Tools;