import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Dimensions,Modal, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChordChart from 'react-native-chord-charts';
import { ArrowLeft } from 'iconoir-react-native';
import { Picker } from '@react-native-picker/picker';

function CustomTunings() {
  const navigation = useNavigation();
  
  return (
    <View className="bg-grey h-full w-full">

    <Text>Custom Tunings</Text>
      
    </View>
  )
}

export default CustomTunings;