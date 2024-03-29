import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'iconoir-react-native';
import {Text, View, TouchableOpacity, StyleSheet, Platform, Button } from 'react-native';

function StringWinder() {
  const navigation = useNavigation();

  const handlePress = () => {
    // Add logic to start the string winder
    
  }

  return (
    <View className="h-full w-full bg-grey ">
      {/* Title and Back Arrow */}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 90}}>
          <TouchableOpacity style={{}} onPress={() => {navigation.navigate('Tools');}}>
            <ArrowLeft color="#de1d35" height={30} width={30} />
          </TouchableOpacity>
          <Text style={{fontSize: 38, fontWeight: 'bold', color: '#0e1c36', marginLeft: 30, marginRight: 30}}>String Winder</Text>
      </View>

      {/* String Winder */}
      <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 170}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 100,
          borderRadius: 300,
          fontSize: 50,
          width: 300,
          height: 300,
          borderWidth: 1,
          borderColor: '#de1d35',
          backgroundColor: '#de1d35',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4, 
          borderWidth: 0,
          borderColor: 'transparent',
        }}
        onPress={handlePress}
      >
    <Text style={{fontSize: 30, color: '#fff'}}>Start</Text>
      </TouchableOpacity>
      
      </View>
    </View>
  )
}

export default StringWinder