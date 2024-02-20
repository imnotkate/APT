import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Touchable} from 'react-native';

export default function Login() {
    return (
      <View className="h-full w-full flex justify-around pt-40 pb-10">
        <View className="flex items-center">
            <Text className="text-white font-bold tracking-wider text-5xl">
                Login
            </Text>
        </View>

     <View className="flex items-center mx-4 space-y-4">
        <View className="bg-black/5 p-5 rounded-2x1 w-full nb-3">
            <TextInput placeholder='Email' placeholderTextColor={'gray'} secureTextEntry/>
        </View>
        <View className="w-full">
          <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl nb-3">
            <Text className="text-xl font-bold text-white text-center">Login</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            <Text>Don't have an account? </Text>
            <TouchableOpacity>
                <Text className="text-sky-600">Sign Up</Text>
            </TouchableOpacity>
        </View>
     </View>
     </View>
    );
  };