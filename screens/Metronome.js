
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
 // Import withNavigation
// import { useNavigation } from '@react-navigation/native';


const Metronome = () => {
    const navigation = useNavigation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [bpm, setBpm] = useState(120);
    const [sound, setSound] = useState();
  
    useEffect(() => {
      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [sound]);
  
    const handlePlayPause = async () => {
      if (isPlaying) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../click.mp3')); // Make sure you have the sound file in your project
        setSound(soundObject);
        setIsPlaying(true);
        playSound();
        const interval = setInterval(playSound, 60000 / bpm);
      }
    };
  
    const playSound = async () => {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.bpmText}>{bpm} BPM</Text>
        <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}> {/* Return to Tools Page button */}
        <Text style={styles.buttonText}>Return to Tools Page</Text>
      </TouchableOpacity>
        {/* Add additional UI components as needed */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bpmText: {
      fontSize: 24,
      marginBottom: 20,
    },
    button: {
      padding: 10,
      backgroundColor: 'lightblue',
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 18,
    },
});

export default Metronome;