import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, Button, StyleSheet, Switch } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { NavArrowDown, NavArrowRight } from 'iconoir-react-native';

const Tuner = () => {
  const [selectedTuning, setTuning] = useState('E Standard');
  const [selectedString, setSelectedString] = useState('E2');
  const [tuningProgress, setTuningProgress] = useState(0);
  const [selectedGuitar, setGuitar] = useState('Guitar 6-string');
  const [selectedInstrument, setInstrument] = useState('Guitar');   

  const instruments = ['Guitar', 'Bass', 'Soprano Ukulele', 'Concert Ukulele', 'Tenor Ukulele', 'Baritone Ukulele', 'Banjo', 'Mandolin', 'Sitar'];
  const guitars = ['Guitar 6-string', 'Guitar 7-string', 'Guitar 8-string', 'Guitar 12-string'];
  const tunings = ['E Standard', 'Drop D', 'Open D', 'Drop C', 'Open C', 'Open G', 'Drop B', 'Open E', 'Drop A']; 

  const stringsData = {
    'E Standard': ['E2', 'A', 'D', 'G', 'B', 'E4'], 
    'Drop D': ['D2', 'A', 'D3', 'G', 'B', 'E'], 
    'Open D': ['D2', 'A', 'D3', 'F#', 'A', 'D4'],
    'Drop C': ['C2', 'G', 'C3', 'F', 'A', 'D'],
    'Open C': ['C2', 'G2', 'C3', 'G3', 'C4', 'E'],
    'Open G': ['D2', 'G2', 'D3', 'G3', 'B', 'D4'],
    'Drop B': ['B1', 'Gb', 'B2', 'E', 'Ab', 'Db'],
    'Open E': ['E2', 'B2', 'E3', 'G#', 'B3', 'E4'],
    'Drop A': ['A1', 'E', 'A2', 'D', 'F#', 'B'],
  };
  const strings = stringsData[selectedTuning] || []; // Get strings based on selected tuning
 
  const handleTuningChange = (value) => {
    setTuning(value);
    setTuningPickerVisible(false);
  };

  const handleTuningProgress = () => {
    // Simulate tuning progress, you can replace this with actual logic
    if (tuningProgress < 100) {
      setTuningProgress(tuningProgress + 1);
    }
  };

  const handleGuitarChange = (value) => {
    setGuitar(value);
    setGuitarPickerVisible(false);
  }

  const handleInstrumentChange = (value) => {
    setInstrument(value);
  }

  const [auto, setAuto] = useState(false);

  const handleToggleSwitch = () => {
    setAuto(!auto);
  };

   // connection to flask webserver 
  // send msg
  const sendMessageToServer = (string) => {
    const messageData = {
      message: string
    };
    axios.post("http://192.168.231.3:5000/tune_string", messageData).then(response => {console.log('msg sent', response.data);}).catch(error => {console.error('error', error);});
  };

  const pickerTextStyle = {
    fontSize: 20, // Adjust the font size as needed
    textAlign: 'center', // Center the text
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#de1d35',
    color: '#de1d35',
    padding: 10,
    borderRadius: 25,
    width: 150,

  };

  const styles = StyleSheet.create({
    text: {
      fontSize: 22, // 'text-lg' equivalent
      paddingRight: 8, // 'pr-2' equivalent
      justifyContent: 'center', // Center text vertically
      alignContent: 'center', // Center text horizontally
      alignItems: 'center',
    },
    stringContainer: {
      // Styles for the string container
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    stringText: {
      // Styles for the string text
    },
    pointer: {
      // Styles for the pointer indicator
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: [{ translateY: -8 }], // Adjust number as needed
    },
    pointerText: {
      // Styles for the pointer text, adjust as needed
      fontSize: 24,
    }
  });

  const [isGuitarPickerVisible, setGuitarPickerVisible] = useState(false);
  const [isTuningPickerVisible, setTuningPickerVisible] = useState(false);



  return (
    <View className="bg-white h-full w-full bg-white">
    {/* Logo and AUTO */}
    <View style={{ backgroundColor: 'white', paddingTop: 90, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Image
        source={require('../assets/images/logosmall.png')}
        style={{ width: 160, height: 80, marginLeft: 20}}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', paddingRight: 30}}>
        <Text style={{ fontSize: 18, marginRight: 10 }}>AUTO</Text>
        <Switch
          value={auto}
          onValueChange={handleToggleSwitch}
      />
      </View>
    </View>


    {/* Tuning and Instrument buttons */}
    <View style={{paddingTop:50, flexDirection: 'row', alignItems: 'left', justifyContent: 'left', paddingLeft: 20}}>
    <RNPickerSelect
      onValueChange={handleTuningChange}
      items={tunings.map(type => ({ label: type, value: type }))}
      value={selectedTuning}
      placeholder={{ label: 'Select Tuning', value: null }}
      style={{ inputAndroid: pickerTextStyle, inputIOS: pickerTextStyle }}
    />
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', paddingLeft: 10 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          borderRadius: 25,
          fontSize: 20,
          width: 190,
          borderWidth: 1,
          borderColor: '#de1d35',
        }}
        onPress={() => {}}
      >
    <Text style={{fontSize: 20, color: '#de1d35',}}>{selectedGuitar}</Text>
      </TouchableOpacity>
      </View>
      </View>


    {/* String buttons */}
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 50, paddingLeft: 40 }}>
          {strings.map((string, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedString(string);
                sendMessageToServer(string);
                handleTuningProgress();
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: selectedString === string ? '#de1d35' : '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#de1d35',
                marginBottom: 10, // Add space between circles
              }}
            >
              <Text style={{ color: selectedString === string ? '#fff' : '#de1d35', fontSize: 18 }}>
                {string}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


      {/* Container for the guitar head image */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center', paddingRight: 80, paddingTop: 40}}>
        <Image
          source={require('../assets/images/guitar-head.jpeg')} // Update with your actual image path
          style={{width: 200, height: 460}} // Adjust size as needed
        />
      </View>
    </View>

      </View>
     
  );
};


export default Tuner;