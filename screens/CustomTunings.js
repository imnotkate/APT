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
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 90}}>
          <TouchableOpacity style={{}} onPress={() => {navigation.navigate('Tools');}}>
            <ArrowLeft color="#de1d35" height={30} width={30} />
          </TouchableOpacity>
          <Text style={{fontSize: 38, fontWeight: 'bold', color: '#0e1c36', paddingLeft: 20, paddingRight: 20}}>Custom Tunings</Text>
      </View>
      </View>
  )
}

export default CustomTunings;