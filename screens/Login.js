import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
    return (
      <View className="bg-white h-full w-full">
        <StatusBar style='light' />
       
      <View className="h-full w-full flex justify-around pt-20 pb-10">
        <View className="flex items-center">
         
        </View>

     <View className="flex items-center mx-5 space-y-4">
        <View className="bg-black/5 p-5 rounded-2x1 w-full nb-3">
            <TextInput placeholder='Email' placeholderTextColor={'gray'}/>
        </View>

        <View className="bg-black/5 p-5 rounded-2x1 w-full nb-3">
            <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry/>
        </View>

        <View className="w-full">
          <TouchableOpacity className="w-full p-3 bg-blue-900 rounded-2xl nb-3" >
            <Text className="text-xl font-bold text-white text-center">Login</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('Register')}>
                <Text className="text-blue-900">Sign Up</Text>
            </TouchableOpacity>
        </View>

     </View>
     </View>
     </View>
    );
  };