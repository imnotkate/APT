import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, Button, StyleSheet, Switch } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios';

const Tuner = () => {
  const [selectedTuning, setTuning] = useState('EStandard');
  const [selectedString, setSelectedString] = useState('E2');
  const [tuningProgress, setTuningProgress] = useState(0);
  
  // connection to flask webserver 
  // send msg
 
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
      marginRight: 40
    },
    tuningSetting: {
      flexDirection: 'row', // Layout children in a row
      alignItems: 'center', // Center children vertically in the row
      marginTop: -15, // Adjust top spacing to match your needs, considering status bar height
      marginRight: 30, // Adjust right spacing to match your needs
    },
    text: {
      fontSize: 28, // 'text-lg' equivalent
      paddingRight: 8, // 'pr-2' equivalent
      justifyContent: 'center', // Center text vertically
      alignContent: 'center', // Center text horizontally
      alignItems: 'center',
    },
    pickerContainer: {
      padding: 6, // 'pt-1.5' equivalent
      borderColor: 'red',
      borderWidth: 1,
      paddingTop: 10,
      width: 90,
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
    <View className="bg-white h-full w-full">

    <View className='bg-white pt-20 items-center'>
      <Image
        source={require('../assets/images/logosmall.png')} 
        style={{ width: 70, height: 40, borderRadius: 0, borderColor: 'red', borderWidth: 0, position: 'absolute',  top: 60, left: 20}} />  
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

    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', padding: 10  }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>{isEnabled ? 'Auto-tuning  ' : 'Autotune is OFF '}</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ marginRight: 10 }} // Adjust spacing between the switch and the text as needed
        />
        
      </View>
    </View>

        

  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 150}}>
        {/* Container for the string circles */}
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 10, paddingLeft: 30 }}>
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems: 'center' , paddingRight: 90}}>
        <Image
          source={require('../assets/images/guitar-head.jpeg')} // Update with your actual image path
          style={{ width: 180, height: 400, marginLeft: 20 }} // Adjust size as needed
        />
      </View>
    </View>

      </View>
     
  );
};


export default Tuner;