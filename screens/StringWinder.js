import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'iconoir-react-native';
import {Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

function StringWinder() {
  const navigation = useNavigation();

  return (
    <View className="h-full w-full bg-grey ">
      {/* Title and Back Arrow */}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 90}}>
          <TouchableOpacity style={{}} onPress={() => {navigation.navigate('Tools');}}>
            <ArrowLeft color="#de1d35" height={30} width={30} />
          </TouchableOpacity>
          <Text style={{fontSize: 38, fontWeight: 'bold', color: '#0e1c36', marginLeft: 30, marginRight: 30}}>String Winder</Text>
      </View>
    </View>
  )
}

export default StringWinder