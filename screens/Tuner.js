import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, Button, StyleSheet, Switch } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios';
import { Iconoir } from 'iconoir-react-native';

const Tuner = () => {
  const [selectedTuning, setTuning] = useState('EStandard');
  const [selectedString, setSelectedString] = useState('E2');
  const [tuningProgress, setTuningProgress] = useState(0);
  const [selectedGuitar, setGuitar] = useState('6string');

  const guitars = ['6string', '7string', '8string', '12string'];
  const tunings = ['EStandard', 'DropD', 'OpenD', 'DropC', 'OpenC', 'OpenG', 'DropB', 'OpenE', 'DropA']; 

  const stringsData = {
    EStandard: ['E2', 'A', 'D', 'G', 'B', 'E4'], 
    DropD: ['D2', 'A', 'D3', 'G', 'B', 'E'], 
    OpenD: ['D2', 'A', 'D3', 'F#', 'A', 'D4'],
    DropC: ['C2', 'G', 'C3', 'F', 'A', 'D'],
    OpenC: ['C2', 'G2', 'C3', 'G3', 'C4', 'E'],
    OpenG: ['D2', 'G2', 'D3', 'G3', 'B', 'D4'],
    DropB: ['B1', 'Gb', 'B2', 'E', 'Ab', 'Db'],
    OpenE: ['E2', 'B2', 'E3', 'G#', 'B3', 'E4'],
    DropA: ['A1', 'E', 'A2', 'D', 'F#', 'B'],
  };
  const strings = stringsData[selectedTuning] || []; // Get strings based on selected tuning

 
  const handleTuningChange = (value) => {
    setTuning(value);
  };

  const handleTuningProgress = () => {
    // Simulate tuning progress, you can replace this with actual logic
    if (tuningProgress < 100) {
      setTuningProgress(tuningProgress + 1);
    }
  };

  const handleGuitarChange = (value) => {
    setGuitar(value);
  }

   // connection to flask webserver 
  // send msg
  const sendMessageToServer = (string) => {
    const messageData = {
      message: string
    };

    axios.post("http://192.168.231.3:5000/tune_string", messageData).then(response => {console.log('msg sent', response.data);}).catch(error => {console.error('error', error);});
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1, // Use flex to take up the full screen
      justifyContent: 'flex-start', // Align children to the start vertically
      alignItems: 'flex-end', // Align children to the end horizontally
      top:20
    },
    tuningSetting: {
      flexDirection: 'row', // Layout children in a row
      alignItems: 'center', // Center children vertically in the row
      marginTop: -15, // Adjust top spacing to match your needs, considering status bar height
      marginRight: 30, // Adjust right spacing to match your needs
    },
    text: {
      fontSize: 22, // 'text-lg' equivalent
      paddingRight: 8, // 'pr-2' equivalent
      justifyContent: 'center', // Center text vertically
      alignContent: 'center', // Center text horizontally
      alignItems: 'center',
    },
    pickerContainer: {
      padding: 6, // 'pt-1.5' equivalent
      borderColor: 'red',
      borderWidth: 1,
      padding: 10,
      width: 90,
      borderRadius: 25
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

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <View className="bg-white h-full w-full bg-white">

    <View className='bg-white pt-20 items-center'>
      <Image
        source={require('../assets/images/logosmall.png')} 
        style={{ width: 130, height: 70, position: 'absolute',  top: 80, left: 30}} />  
    </View> 


    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginRight: 30,}}>
            <View style={{padding: 6, borderColor: 'red', borderWidth: 1, padding: 10, width: 90,borderRadius: 25}}>
              <RNPickerSelect
                onValueChange={handleGuitarChange}
                items={guitars.map(type => ({ label: type, value: type }))}
                value={selectedGuitar}
              />
            </View>
          </View>
    </View>

    <View style={styles.container}>
          <View style={styles.tuningSetting}>
            <Text style={styles.text}>Tuning:</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={handleTuningChange}
                items={tunings.map(type => ({ label: type, value: type }))}
                value={selectedTuning}
              />
            </View>
          </View>
    </View>

    <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left'}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 50 }}>
      <Text style={{fontSize: 18, paddingLeft: 40, paddingRight: 10}}>AUTO</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>

        

  <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 40}}>
        {/* Container for the string circles */}
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 100, paddingLeft: 40 }}>
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
          style={{width: 200, height: 440}} // Adjust size as needed
        />
      </View>
    </View>

      </View>
     
  );
};


export default Tuner;