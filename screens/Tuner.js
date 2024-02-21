import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import { Picker } from  '@react-native-picker/picker';
// import React, { useState } from 'react';
const Tuner = () => {
  // return (
  //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //     <Text>Tuer</Text>
  //   </View>
  // );
  // 
  const [selectedGuitarType, setSelectedGuitarType] = useState('Electric');
  const [selectedString, setSelectedString] = useState('E');
  const [tuningProgress, setTuningProgress] = useState(0);

  const guitarTypes = ['Electric', 'Acoustic', 'Classical']; // Add more guitar types if needed
  // const strings = ['E2', 'A', 'D', 'G', 'B', 'E4']; // Tuning notes for standard guitar strings
  const stringsData = {
    Electric: ['E2', 'A', 'D', 'G', 'B', 'E4'], // Tuning notes for standard electric guitar strings
    Acoustic: ['S2', 'A', 'D', 'G', 'B', 'E4'], // Tuning notes for standard acoustic guitar strings
    Classical: ['E2', 'A', 'D', 'G', 'B', 'E4'], // Tuning notes for standard classical guitar strings
  };
  const strings = stringsData[selectedGuitarType] || []; // Get strings based on selected guitar type

  const handleGuitarTypeChange = (value) => {
    setSelectedGuitarType(value);
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

  
  const pickerSelectStyles = {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tuner</Text>
      {/* <RNPickerSelect
        
        onValueChange={handleGuitarTypeChange}
        items={guitarTypes.map(type => ({label: type, value: type}))}
        value={selectedGuitarType}
        style={pickerSelectStyles}
      /> */}
      <View style={styles.pickerContainer}>
  <Text style={styles.label}>Guitar type:</Text>
  <RNPickerSelect
    onValueChange={handleGuitarTypeChange}
    items={guitarTypes.map(type => ({label: type, value: type}))}
    value={selectedGuitarType}
    style={pickerSelectStyles}
  />
</View>
      {/* <View style={styles.stringSelector}>
        {strings.map((string, index) => (
          <TouchableOpacity key={index} onPress={() => handleStringChange(string)} style={[styles.string, selectedString === string && styles.selectedString]}>
            <Text style={styles.stringText}>{string}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
      <View style={styles.stringSelector}>
      {strings.map((string, index) => (
        <TouchableOpacity key={index} onPress={() => handleStringChange(string)} style={[styles.string, selectedString === string && styles.selectedString]}>
          <Text style={styles.stringText}>{string}</Text>
        </TouchableOpacity>
      ))}
    </View>
      <View style={styles.tuningProgressContainer}>
        <TouchableOpacity onPress={handleTuningProgress}>
          <View style={[styles.bigCircle, {transform: [{scale: tuningProgress / 100}]}]} />
        </TouchableOpacity>
        {/* <AnimatedCircularProgress
        ref={(ref) => this.circularProgress = ref}
  size={120}
  width={15}
  fill={100}
  tintColor="#00e0ff"
  onAnimationComplete={() => console.log('onAnimationComplete')}
  backgroundColor="#3d5875" /> */}
      <View style={styles.circularContainer}>
      <Text style={styles.label}>Currently Tuning </Text>
  {/* <AnimatedCircularProgress
    ref={(ref) => this.circularProgress = ref}
    size={120}
    width={15}
    fill={100}
    tintColor="#00e0ff"
    onAnimationComplete={() => console.log('onAnimationComplete')}
    backgroundColor="#3d5875"
  /> */}<Progress.Bar progress={0.3} width={200} />
<Progress.Pie progress={0.4} size={50} />
<Progress.Circle size={30} indeterminate={true} />
  <Text style={styles.stringLetter}>E</Text>
    </View>
    </View>
    </View>
    
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 15,
    
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Arial', 
    
  },
  circularContainer: {
    position: 'relative'
    
  },
  stringLetter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: 0 }, { translateY: 0 }], // Adjust based on the size of the letter
    fontSize: 16,
    color: 'black',
  },
  stringSelector: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
  },
  string: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  selectedString: {
    backgroundColor: 'pink',
  },
  stringText: {
    fontSize: 14,
    color: 'black',
  },
  tuningProgressContainer: {
    alignItems: 'center',
  },
  bigCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
});



export default Tuner;