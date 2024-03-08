import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';

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
    'Open D': ['D2', 'A2', 'D3', 'F#', 'A3', 'D4'],
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

  const [showTuningModal, setShowTuningModal] = useState(false);

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

  const [isTuned, setIsTuned] = useState(false);

   // connection to flask webserver 
  // send msg
  const sendMessageToServer = (string) => {
    const messageData = {
      message: string
    };
    // use pi ip address and port number
    axios.post("http://192.168.231.3:5000/tune_string", messageData) // Example message
      .then(response => {
        if (response.data.message === 'string tuned') {
          setIsTuned(true);
        } else {
          setIsTuned(false);
        }
      })
      .catch(error => {
        console.error('Error', error);
        setIsTuned(false); // Assume not tuned if there's an error
      });
  };

  const pickerTextStyle = {
    fontSize: 20, // Adjust the font size as needed
    textAlign: 'center', // Center the text
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#de1d35',
    color: '#de1d35',
    padding: 10,
    borderRadius: 25,
    width: 150,
    backgroundColor: '#fff',
  };
 

  const [isGuitarPickerVisible, setGuitarPickerVisible] = useState(false);
  const [isTuningPickerVisible, setTuningPickerVisible] = useState(false);


  return (
    <View className="bg-grey h-full w-full">
    {/* Logo and AUTO */}
    <View style={{paddingTop: 90, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Image
        source={require('../assets/images/logosmall-removebg-preview.png')}
        style={{ width: 160, height: 80, marginLeft: 20}}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', paddingRight: 30}}>
        <Text style={{ fontSize: 20, marginRight: 10, color: '#0e1c36'}}>AUTO</Text>
        <Switch
          value={auto}
          onValueChange={handleToggleSwitch}
      />
      </View>
    </View>


    {/* Tuning and Instrument buttons */}
    <View style={{flex: 1, paddingTop:50, flexDirection: 'row', justifyContent: 'left', paddingLeft: 20}}>
    {/* <Picker
      selectedValue={selectedTuning}
      onValueChange={handleTuningChange}
      style={pickerTextStyle}
    >
      {tunings.map(type => (
    <Picker.Item key={type} label={type} value={type} />
  ))}
</Picker> */}

<TouchableOpacity
  style={[
    {
      flexDirection: 'row',
      alignItems: 'center', // This will center the text vertically
      justifyContent: 'center', // This will center the text horizontally
      backgroundColor: '#de1d35',
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 0,
      borderColor: 'transparent',
      width: 150,
    },
  ]}
  onPress={() => setShowTuningModal(true)}
>
  <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>
    {selectedTuning}
  </Text>
</TouchableOpacity>

<Modal
  visible={showTuningModal}
  animationType="slide"
  transparent={true}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '90%' }}>
      <Picker
        selectedValue={selectedTuning}
        onValueChange={(itemValue) => {
          handleTuningChange(itemValue);
          setShowTuningModal(false);
        }}
        itemStyle={{ color: '#de1d35', fontSize: 20 }}
      >
        {tunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>
      <Button title="Cancel" onPress={() => setShowTuningModal(false)} />
    </View>
  </View>
</Modal>

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
          backgroundColor: '#de1d35',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderWidth: 0,
          borderColor: 'transparent',
        }}
        onPress={() => {}}
      >
    <Text style={{fontSize: 20, color: '#fff'}}>{selectedGuitar}</Text>
      </TouchableOpacity>
      </View>
      </View>


    {/* String buttons */}
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 20, paddingLeft: 40 }}>
          {strings.map((string, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedString(string);
                sendMessageToServer(string);
                handleTuningProgress();
              }}
              style={{
                width: 52,
                height: 52,
                borderRadius: 30,
                backgroundColor: selectedString === string ? (isTuned ? 'green' : '#de1d35') : '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#de1d35',
                marginBottom: 10, // Add space between circles
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 0,
                borderColor: 'transparent',
              }}
            >
              <Text style={{ color: selectedString === string ? '#fff' : '#de1d35', fontSize: 16 }}>
                {string}
              </Text>
              
            </TouchableOpacity>
          ))}
        </View>


      {/* Container for the guitar head image */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center', paddingRight: 80, paddingTop: 40}}>
        <Image
          source={require('../assets/images/guitar-head-removebg-preview.png')} // Update with your actual image path
          style={{width: 200, height: 460}} // Adjust size as needed
        />
      </View>
    </View>

      </View>
     
  );
};


export default Tuner;