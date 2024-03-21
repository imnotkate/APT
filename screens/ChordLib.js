import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChordChart from 'react-native-chord-charts';
import { ArrowLeft } from 'iconoir-react-native';
//import Carousel from 'react-native-reanimated-carousel';

function ChordLib() {
  const navigation = useNavigation();

  const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 90, paddingLeft: 10 }}>
          <TouchableOpacity style={{marginRight: 20, marginLeft: 25}} onPress={() => {navigation.navigate('Tools');}}>
            <ArrowLeft color="#de1d35" height={30} width={30} />
          </TouchableOpacity>
          <Text style={{fontSize: 38, fontWeight: 'bold', color: '#0e1c36', marginLeft: 20}}>Chord Library</Text>
      </View>
      <ChordChart
        chordKey="C5"
        color="#F84D28"
        showTuning
        width={200}
        height={200}
      />
      
    </View>
  )
}

export default ChordLib