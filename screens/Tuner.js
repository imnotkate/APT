import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Tuner = () => {
  const [selectedTuning, setTuning] = useState('EStandard');
  const [selectedString, setSelectedString] = useState('E');
  const [tuningProgress, setTuningProgress] = useState(0);
  

  const tunings = ['EStandard', 'DropD', 'OpenD', 'DropC', 'OpenC', 'OpenG', 'DropB', 'OpenE', 'DropA']; 

  const stringsData = {
    EStandard: ['E', 'A', 'D', 'G', 'B', 'E'], 
    DropD: ['D', 'A', 'D', 'G', 'B', 'E'], 
    OpenD: ['D', 'A', 'D', 'F#', 'A', 'D'],
    DropC: ['C', 'G', 'C', 'F', 'A', 'D'],
    OpenC: ['C', 'G', 'C', 'G', 'C', 'E'],
    OpenG: ['D', 'G', 'D', 'G', 'B', 'D'],
    DropB: ['B', 'Gb', 'B', 'E', 'Ab', 'Db'],
    OpenE: ['E', 'B', 'E', 'G#', 'B', 'E'],
    DropA: ['A', 'E', 'A', 'D', 'F#', 'B'],
  };
  const strings = stringsData[selectedTuning] || []; // Get strings based on selected tuning

  const handleTuningChange = (value) => {
    setTuning(value);
  };

  const handleStringChange = (value) => {
    setSelectedString(value);
  };

  const handleTuningProgress = () => {
    // Simulate tuning progress, you can replace this with actual logic
    if (tuningProgress < 100) {
      setTuningProgress(tuningProgress + 10);
    }
  };

  return (
    <View className="bg-white h-full w-full">

    <View className='bg-white pt-20 items-center'>
      <Image
        source={require('../assets/images/newlogosmall.png')} // Replace with the actual path to your image
        style={{ width: 250, height: 100}} />  
    </View>

      <View className='pt-10 pl-5 flex-row'>
        <Text className='text-lg pr-2'>Tuning</Text>
        <View className='pt-1.5'>
        <RNPickerSelect
          onValueChange={handleTuningChange}
          items={tunings.map(type => ({label: type, value: type}))}
          value={selectedTuning}
        />
        </View>
    </View>

      <View className='flex-row p-2 pt-5 items-center justify-around'>
      {strings.map((string, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              handleStringChange(string);
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