import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
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
      setTuningProgress(tuningProgress + 10);
    }
  };

  const sendMessageToServer = (string) => {
    const messageData = {
      message: string
    };

    axios.post("http://192.168.231.3:5000/tune_string", messageData).then(response => {console.log('msg sent', response.data);}).catch(error => {console.error('error', error);});
  };

  return (
    <View className="bg-white h-full w-full">

    <View className='bg-white pt-20 items-center'>
      <Image
        source={require('../assets/images/logosmall.png')} 
        style={{ width: 180, height: 100}} />  
    </View>

      <View className='pt-7 pl-5 flex-row'>
        <Text className='text-lg pr-2'>Tuning</Text>
        <View className='pt-1.5'>
        <RNPickerSelect
          onValueChange={handleTuningChange}
          items={tunings.map(type => ({label: type, value: type}))}
          value={selectedTuning}
        />
        </View>
    </View>

      <View className='flex-row p-2 pt-6 items-center justify-around'>
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
            }}
          >
            <Text style={{ color: selectedString === string ? '#fff' : '#de1d35', fontSize: 18 }}>{string}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* //if it gets 404 when button clicked on next note it stays on same note  */}
      
      <View className='items-center p-20 relative'>
      <AnimatedCircularProgress
        ref={(ref) => this.circularProgress = ref}
        size={260}
        width={20}
        fill={100}
        tintColor="#de1d35"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875"
      />
      </View>



      </View>
     
  );
};


export default Tuner;