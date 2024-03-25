import React, { useState, useEffect } from 'react';
import { View, Text,StatusBar, TouchableOpacity, Animated, TextInput, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
    
import AnimatedNumbers from 'react-native-animated-numbers';
import { ArrowLeft } from 'iconoir-react-native';
import { useNavigation } from '@react-navigation/native';
        

const noteList = {
  'A': require('../assets/sound/A.wav'),
  'B': require('../assets/sound/B.wav'),
  'C': require('../assets/sound/C.wav'),
  'D': require('../assets/sound/D.wav'),
  'F': require('../assets/sound/F.wav'),
  // Add other notes if necessary
};

const EarTrainer = () => {

  const navigation = useNavigation()
  const [currentNote, setCurrentNote] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  // const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // useEffect(() => {
  //   playRandomNote();
  // }, []);

  const playRandomNote = async () => {
    try {
      const noteKeys = Object.keys(noteList);
      const randomNoteKey = noteKeys[Math.floor(Math.random() * noteKeys.length)];
      const soundToPlay = noteList[randomNoteKey];
      const { sound } = await Audio.Sound.createAsync(soundToPlay);
      await sound.playAsync();
      setCurrentNote(randomNoteKey);
    } catch (error) {
      console.log('Error playing note:', error);
    }
  };

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    if (userAnswer.trim().toUpperCase() === currentNote) {
      setIsCorrect(true);
      setScore(score + 10);
    } else {
      setIsCorrect(false);
    }
    setUserAnswer('');
  };

  const resetExercise = () => {
    setCurrentNote(null);
    setUserAnswer('');
    setIsCorrect(null);
    setScore(0);
    setAttempts(0);
    
  };

  const [score, setScore] = React.useState(0);

  const increase = () => {
    setAnimateToNumber(score + 10);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
      <TouchableOpacity style={{marginRight: 20, marginLeft: 25}} onPress={() => {navigation.navigate('Tools');}}>
            <ArrowLeft color="#de1d35" height={30} width={30} />
          </TouchableOpacity>
        <Text style={styles.title}>Ear Trainer</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Score</Text>
        <AnimatedNumbers
        includeComma
        animateToNumber={score}
        fontStyle={{fontSize: 50, fontWeight: 'bold'}}
      />
        
      </View>
      <TouchableOpacity style={styles.button} onPress={playRandomNote}>
        <FontAwesome name="play" size={24} paddingHorizontal={10} color="#fff" />
        <Text style={styles.buttonText}>Play Chord</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>What chord did you hear?</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserAnswer}
          value={userAnswer}
          placeholder="Enter note name"
          autoCapitalize="characters"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>Check Answer</Text>
      </TouchableOpacity>
      {isCorrect !== null && (
        <Text style={[styles.feedback, isCorrect ? styles.correct : styles.incorrect]}>
          {isCorrect ? 'Correct!' : 'Incorrect, try again.'}
        </Text>
      )}
      <View style={styles.resetContainer}>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetExercise}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <Text style={styles.attempts}>Attempts: {attempts}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: StatusBar.currentHeight + 30 || 0,
  },
  header: {
    width: '100%',
    
    marginBottom: 50,
    flexDirection: 'row', // Aligns items in a row
    alignItems: 'center', // Centers items vertically in the container
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 23,
  },
  scoreContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 32,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#de1d35',
    padding: 16,
    borderRadius: 25,
    marginHorizontal: 10,
    marginBottom: 50,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 100,
    marginRight: 100,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 18,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    
  },
  inputLabel: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    marginLeft: 30,

  },
  feedback: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '500',
    textAlign: 'center',
    

  },
  correct: {
    color: 'green',
    
  },
  incorrect: {
    color: 'red',
    
  },
  resetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    // paddingLeft:20,
    // paddingRight:50,
  },
  resetButton: {
    backgroundColor: '#6c757d',
    textAlign: 'center',
    width: 100,
    marginTop: 40,
    
  },
  attempts: {
    fontSize: 16,
    color: '#333',
    marginRight:100,
    fontWeight: '900'
    
  },
});

export default EarTrainer;