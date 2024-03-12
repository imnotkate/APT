import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
    return (
      <View className="bg-white h-full w-full">
        <StatusBar style='light' />
       
      <View className="w-full flex justify-around pt-20">
        <View className="flex items-center">
        <Image
        source={require('../assets/images/APT.png')} // Replace with the actual path to your image
        style={{ width: 400, height: 400 }} />      
        </View>

     <View className="flex items-center mx-5 space-y-4">
      <View className="bg-black/5 p-5 rounded-2x1 w-full nb-3">
            <TextInput placeholder='Username' placeholderTextColor={'gray'}/>
        </View>

        <View className="bg-black/5 p-5 rounded-2x1 w-full nb-3">
            <TextInput placeholder='Email' placeholderTextColor={'gray'}/>
        </View>

        <View className="bg-black/5 p-5 rounded-2x1 w-full nb-3">
            <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry/>
        </View>

        <View className="w-full">
          <TouchableOpacity className="w-full p-3 bg-blue-900 rounded-2xl nb-3" >
            <Text className="text-xl font-bold text-white text-center">Register</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
                <Text className="text-blue-900">Log In</Text>
            </TouchableOpacity>
        </View>

     </View>
     </View>
     </View>
    );
  };