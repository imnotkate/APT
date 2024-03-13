import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Button, Switch } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThreePlusThreeHeadImage from '../assets/images/3+3-removebg.png';
import SixHeadImage from '../assets/images/6inline-removebg-preview.png';
import SevenString from '../assets/images/7string-removebg.png';
import EightString from '../assets/images/8string-removebg.png';
import TwelveString from '../assets/images/12-removebg-preview.png';

function Tuner({ route }) {

  const { selectedHead, selectedInstrument } = route.params || {};

  const tunings = ['Standard','Open G','Open D','D Modal','Drop D','Open C','Drop C','Drop B','Drop A','Half Step Down','Full Step Down','Drop C#','Drop D Flat','Drop E','Drop F','Drop G','Open E','Open A','Open B','Open F','Gsus','Asus2 Modal','New Standard','Standard C','Standard C#','Standard B-Barytone','Low C','Low A full step down','C Modal','C6 Modal','All Fourths','Double Drop D','Pentatonic','Minor Third','Major Third','Augmented Fourth','Nick Drake', 'Dobro Open G']; 
  const sevenTunings = ['Standard','Open G','D Modal','Drop D','Open C','Drop A','Drop F','Drop G','Drop G#','Drop A#','Drop B','All Fourths','Russian','Standard Choro','Thirds'];
  const eightTunings = ['Standard', 'Drop D', 'Drop A + E', 'Drop E', 'F'];
  const twelveTunings = ['Standard', 'Open G', 'D Modal', 'Drop D', 'Open C', 'Drop A', 'Split', 'Open E', 'Full Step Down'];

  const renderGuitarHead = () => {
    switch (selectedHead) {
      case '3+3':
        return <Image source={ThreePlusThreeHeadImage} style={{ width: 200, height: 460,  }} />;
      case '6-in-line':
        return <Image source={SixHeadImage} style={{ width: 200, height: 460 }} />;
      case '7-string':
        return <Image source={SevenString} style={{ width: 230, height: 460 }} />;;
      case '8-string':
        return <Image source={EightString} style={{ width: 230, height: 460 }} />;;
      case '12-string':
        return <Image source={TwelveString} style={{ width: 230, height: 460 }} />;;
      default:
        return <Image source={SixHeadImage} style={{ width: 200, height: 460 }} />;
    }
  };

  const renderTunings = () => {
    switch (selectedInstrument) {
      case 'Guitar 6-string':
        return tunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      case 'Guitar 7-string':
        return sevenTunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      case 'Guitar 8-string':
        return eightTunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      case 'Guitar 12-string':
        return twelveTunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      default:
        return tunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
    }
  };
  const navigation = useNavigation();

  const [selectedTuning, setTuning] = useState('Standard');
  const [selectedString, setSelectedString] = useState(null);
  const [tuningProgress, setTuningProgress] = useState(0);

  const stringsData = {
    'Standard': ['E4', 'B', 'G', 'D', 'A', 'E2'], 
    'Open G': ['D4', 'B', 'G3', 'D3', 'G2', 'D2'],
    'Open D': ['D4', 'A3', 'F#', 'D3', 'A2', 'D2'], 
    'D Modal': ['D4', 'A3', 'D3', 'G2', 'A2', 'D2'],
    'Drop D': ['E', 'B', 'G', 'D3', 'A', 'D2'],
    'Open C': ['E', 'C4', 'G3', 'C3', 'G2', 'C2'],
    'Drop C': ['D', 'A', 'F', 'C3', 'G', 'C2'],
    'Drop B': ['Db', 'Ab', 'E', 'B2', 'Gb', 'B1'],
    'Drop A': ['B', 'F#', 'D', 'A2', 'E', 'A1'],
    'Half Step Down': ['Eb', 'Bb', 'Gb', 'Db', 'Ab', 'Db'],
    'Full Step Down': ['D', 'A', 'F', 'C', 'G', 'C'],
    'Drop C#': ['Db', 'Ab', 'F', 'C#3', 'G#', 'C#2'],
    'Drop D Flat': ['Db', 'Ab', 'F', 'Db3', 'Ab', 'Db2'],
    'Drop E': ['E4', 'B3', 'G#', 'E3', 'B2', 'E2'],
    'Drop F': ['F', 'C', 'G', 'D3', 'A', 'D2'],
    'Drop G': ['G', 'D', 'A', 'E3', 'B', 'E2'],
    'Open E': ['E4', 'B3', 'G#', 'E3', 'B2', 'E2'],
    'Open A': ['E', 'A', 'E', 'A2', 'C#', 'E1'],
    'Open B': ['B', 'F#', 'B', 'F#2', 'B', 'F#1'],
    'Open F': ['F', 'C', 'F', 'A#2', 'C', 'F1'],
    'Gsus': ['G4', 'D3', 'G3', 'C3', 'D2', 'G2'],
    'Asus2 Modal': ['A4', 'E3', 'A3', 'D3', 'E2', 'A2'],
    'New Standard': ['C4', 'G3', 'D3', 'G2', 'C2', 'E1'],
    'Standard C': ['C4', 'G3', 'C3', 'G2', 'C2', 'E1'],
    'Standard C#': ['C#4', 'G#3', 'C#3', 'G#2', 'C#2', 'F#1'],
    'Standard B-Barytone': ['B3', 'F#3', 'B2', 'F#2', 'B1', 'E1'],
    'Low C': ['C3', 'G2', 'C2', 'G1', 'C1', 'E'],
    'Low A full step down': ['G3', 'D3', 'G2', 'D2', 'A1', 'E1'],
    'C Modal': ['C4', 'G3', 'C3', 'G2', 'C2', 'C1'],
    'C6 Modal': ['C4', 'G3', 'C3', 'G2', 'A2', 'C1'],
    'All Fourths': ['E4', 'A3', 'D3', 'G2', 'C2', 'F1'],
    'Double Drop D': ['D4', 'A3', 'D3', 'G2', 'B', 'D2'],
    'Pentatonic': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Minor Third': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Major Third': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Augmented Fourth': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Nick Drake': ['C4', 'G3', 'C3', 'G2', 'C2', 'D1'],
    'Dobro Open G': ['G4', 'D4', 'G3', 'B2', 'D2', 'G1'],
  };

  const sevenStringsData = {
    'Standard': ['B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'Open G': ['B2', 'D4', 'G3', 'B3', 'D3', 'G2', 'B1'],
    'D Modal': ['B2', 'D4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'Drop D': ['B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'Open C': ['C3', 'E4', 'G3', 'C3', 'E3', 'G2', 'C2'],
    'Drop A': ['A2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'Drop F': ['F2', 'C4', 'F3', 'A#3', 'D3', 'G2', 'C2'],
    'Drop G': ['G2', 'D4', 'G3', 'C3', 'F3', 'A#2', 'D2'],
    'Drop G#': ['G#2', 'D#4', 'G#3', 'C#3', 'F#3', 'B2', 'E2'],
    'Drop A#': ['A#2', 'F4', 'A#3', 'D#3', 'G#3', 'C#2', 'F#2'],
    'Drop B': ['B2', 'F#4', 'B3', 'E3', 'A3', 'D2', 'G2'],
    'All Fourths': ['B2', 'E4', 'A3', 'D3', 'G2', 'C2', 'F1'],
    'Russian': ['B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'Standard Choro': ['B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'Thirds': ['B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
  };

  const eightStringsData = {
    'Standard': ['F#1', 'B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'F': ['F1', 'B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'Drop E': ['E1', 'B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
    'Drop A + E': ['E1', 'B2', 'E4', 'A3', 'D3', 'G2', 'A1', 'E1'],
    'Drop D': ['D1', 'B2', 'E4', 'A3', 'D3', 'G2', 'B1', 'E1'],
  };

  const twelveStringsData = {
    'Standard': ['E4', 'E4', 'B3', 'B3', 'G3', 'G3', 'D3', 'D3', 'A2', 'A2', 'E2', 'E1'],
    'Open G': ['D4', 'D4', 'B3', 'B3', 'G3', 'G3', 'D3', 'D3', 'G2', 'G2', 'D2', 'D1'],
    'D Modal': ['D4', 'D4', 'A3', 'A3', 'D3', 'D3', 'G2', 'G2', 'A2', 'A2', 'D2', 'D1'],
    'Drop D': ['E4', 'E4', 'B3', 'B3', 'G3', 'G3', 'D3', 'D3', 'A2', 'A2', 'D2', 'D1'],
    'Open C': ['E4', 'E4', 'C4', 'C4', 'G3', 'G3', 'C3', 'C3', 'G2', 'G2', 'C2', 'C1'],
    'Drop A': ['E4', 'E4', 'A3', 'A3', 'G3', 'G3', 'D3', 'D3', 'A2', 'A2', 'E2', 'E1'],
    'Split': ['E4', 'E4', 'B3', 'B3', 'G3', 'G3', 'D3', 'D3', 'A2', 'A2', 'E2', 'E1'],
    'Open E': ['E4', 'E4', 'B3', 'B3', 'G3', 'G3', 'D3', 'D3', 'G2', 'G2', 'B2', 'E1'],
    'Full Step Down': ['D4', 'D4', 'A3', 'A3', 'F3', 'F3', 'C3', 'C3', 'G2', 'G2', 'C2', 'C1'],
  };
  

  // const strings = stringsData[selectedTuning] || []; // Get strings based on selected tuning
  const strings = {
    'Guitar 6-string': stringsData[selectedTuning] || [],
    'Guitar 7-string': sevenStringsData[selectedTuning] || [],
    'Guitar 8-string': eightStringsData[selectedTuning] || [],
    'Guitar 12-string': twelveStringsData[selectedTuning] || [],
  }[selectedInstrument] || stringsData[selectedTuning] || [];
 
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

  const handleToggleSwitch = () => {
    setAuto(!auto);
  };

  const [auto, setAuto] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isTuned, setIsTuned] = useState(false);
  const [flashing, setFlashing] = useState(false);

  // connection to flask webserver 
  // send msg
  const sendMessageToServer = (string) => {
    const messageData = {
      message: string
    };
    // use pi ip address and port number
    axios.post("http://192.168.231.3:5000/tune_string", messageData) // Example message
      .then(response => {
        // if (response.data.message === 'string tuned') {
        //   setIsTuned(true);
        // } else {
        //   setIsTuned(false);
        // }
        if (response.status === 409) {
          //already tuning
        } else if (response.status === 202) {
          //string tuned
          setIsTuned(true);
          setSelectedString(string);
        } 
        else {
          //if a random response is received
          setIsTuned(false);
        }
      })
      .catch(error => {
        setIsTuned(false); // Assume not tuned if there's an error
      });
  };

  const tuneStringsAutomatically = async () => {
    const stringsToTune = ['E2', 'A', 'D', 'G', 'B', 'E4']; // Add all your strings

    let currentIndex = 0;
    const maxIterations = 3; // Number of times to flash green for each string

    const intervalId = setInterval( async () => {
      if (currentIndex >= stringsToTune.length) {
        //all strings tuned so flash green
        clearInterval(intervalId);
        setFlashing(true);
        setTimeout(() => {
          setFlashing(false);
        }, 1000); // Adjust the time as needed
        return;
  }

  useEffect(() => {
    if (auto) {
      tuneStringsAutomatically();
    } else {
      clearInterval(intervalId); // Clear the interval if auto mode is turned off
    }
  }, [auto]);

  const currentString = stringsToTune[currentIndex];
  await sendAndTuneString(currentString);

    if (isTuned) {
      // String is tuned, move to the next one
      setCurrentIndex(currentIndex + 1);
    } else {
      // Handle if the string is not tuned, retry or handle as needed
    }
  }, 2000); // Adjust the time as needed

  setIntervalId(intervalId);
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
      height: 50,
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
        {renderTunings()}
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
          height: 50,
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
        onPress={() => {navigation.push('Instruments')}}
      >
    <Text style={{fontSize: 20, color: '#fff'}}>{selectedInstrument || 'Guitar 6-string'}</Text>
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
                backgroundColor: selectedString === string
                ? (isTuned ? (flashing ? 'green' : 'green') : '#de1d35')
                : '#fff',
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
      {renderGuitarHead()}
      </View>
    </View>

    </View>
     
  );
};


export default Tuner;