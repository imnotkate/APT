import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Button, Switch, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ArrowLeft } from 'iconoir-react-native';


function Metronome() {
  const [bpm, setBpm] = useState(140);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [tempoText, setTempoText] = useState('Allegro');
  const navigation = useNavigation();

  state = {
    value: [120],
  };

  multiSliderValuesChange = (values) => {
    this.setState({
        values,
    });
  } 

  const updateTempoText = () => {
    let tempo = '';

    switch (true) {
      case bpm <= 39:
        tempo = 'Grave';
        break;
      case bpm < 60 && bpm >= 40:
        tempo = 'Lento/Largo';
        break;
      case bpm < 66 && bpm >= 60:
        tempo = 'Larghetto';
        break;
      case bpm < 76 && bpm >= 66:
        tempo = 'Adagio';
        break;
      case bpm < 108 && bpm >= 76:
        tempo = 'Andante';
        break;
      case bpm < 112 && bpm >= 108:
        tempo = 'Moderato';
        break;
      case bpm < 120 && bpm >= 112:
        tempo = 'Allegretto';
        break;
      case bpm < 168 && bpm >= 120:
        tempo = 'Allegro';
        break;
      case bpm < 176 && bpm >= 168:
        tempo = 'Vivace';
        break;
      case bpm < 200 && bpm >= 176:
        tempo = 'Presto';
        break;
      default:
        tempo = 'Prestissimo';
        break;
    }
    setTempoText(tempo);
  }

  const increaseBPM = () => {
    setBpm(bpm => Math.min(bpm + 1, 280));
    updateTempoText();
  }

  const decreaseBPM = () => {
    setBpm(bpm => Math.max(bpm - 1, 20));
    updateTempoText();
  }

  const increaseBeatsPerMeasure = () => {
    setBeatsPerMeasure(beatsPerMeasure => Math.min(beatsPerMeasure + 1, 12));
  }

  const decreaseBeatsPerMeasure = () => {
    setBeatsPerMeasure(beatsPerMeasure => Math.max(beatsPerMeasure - 1, 1));
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    metronomeContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bpmDisplay: {
      flexDirection: 'row', 
      textAlign: 'bottom',
      justifyContent: 'center',
      marginBottom: 10,
    },
    bpmText: {
      fontSize: 48, 
      fontWeight: 'bold',
    },
    bpmUnit: {
      fontSize: 48, 
      marginLeft: 5,
    },
    tempoText: {
      marginBottom: 20,
    },
    tempoTextStyle: {
      fontSize: 18,
      textAlign: 'center',
    },
    tempoSettings: {
      flexDirection: 'row', 
      textAlign: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    tempoButtonMinus: {
      backgroundColor: '#de1d35',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginRight: 7,
    },
    tempoButtonPlus: {
      backgroundColor: '#de1d35',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginLeft: 7,
    },
    tempoButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    startStopButton: {
      backgroundColor: 'white',
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 40,
      marginBottom: 20,
      width: 200,
      height: 70,
      alignSelf: 'center', 
      justifyContent: 'center', 
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    startStopButtonText: {
      color: '#de1d35',
      fontSize: 24,
      textAlign: 'center',
    },
    measureSettings: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    measureButton: {
      backgroundColor: '#de1d35',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    measureButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    measureText: {
      fontSize: 18,
      color: 'black',
      marginHorizontal: 10,
    },
    measureTextContainer: {
      marginTop: 10,
    },
    measureTextStyle: {
      fontSize: 10,
      color: 'black',
      textAlign: 'center',
    },

  });
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 90, paddingLeft: 10 }}>
          <TouchableOpacity style={{marginRight: 20, marginLeft: 25}} onPress={() => {navigation.navigate('Tools');}}>
            <ArrowLeft color="#de1d35" height={30} width={30} />
          </TouchableOpacity>
          <Text style={{fontSize: 38, fontWeight: 'bold', color: '#0e1c36', marginLeft: 20}}>Metronome</Text>
      </View>

      {/* Metronome */}
      <View style={styles.metronomeContainer}> 
        {/* BPM Display */}
        <View style={styles.bpmDisplay}> 
          <Text style={styles.bpmText} > {bpm} </Text>
          <Text style={styles.bpmUnit}> BPM </Text> 
        </View>

        {/* Tempo text */}
        <View style={styles.tempoText}> 
          <Text style={styles.tempoTextStyle}>{tempoText}</Text>
        </View>

        {/* Tempo settings */}
        <View style={styles.tempoSettings}> 
          <TouchableOpacity style={styles.tempoButtonMinus} onPress={() => {decreaseBPM();}}> 
            <Text style={styles.tempoButtonText}>-</Text>
          </TouchableOpacity>
          <View>
                <MultiSlider
                    values={[140]}
                    sliderLength={280}
                    min={20}
                    max={280}
                    step={1}
                />
          </View>
          <TouchableOpacity style={styles.tempoButtonPlus} onPress={() => {increaseBPM();}}>
            <Text style={styles.tempoButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Start/Stop */}
        <TouchableOpacity style={styles.startStopButton}>
          <Text style={styles.startStopButtonText}>Start</Text>
        </TouchableOpacity>

        {/* Measures */}
        <View style={styles.measureSettings}>
          <TouchableOpacity style={styles.measureButton} onPress={() => {decreaseBeatsPerMeasure();}}>
            <Text style={styles.measureButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.measureText}>{beatsPerMeasure}</Text>
          <TouchableOpacity style={styles.measureButton} onPress={() => {increaseBeatsPerMeasure();}}>
            <Text style={styles.measureButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Measure Text */}
        <View style={styles.measureTextContainer}>
            <Text style={styles.measureTextStyle}>BEATS PER MEASURE</Text>
        </View>
      </View>
    </View>
  )
}

export default Metronome