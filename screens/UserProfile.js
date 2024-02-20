import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Touchable, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//saved tuning
//left-handed mode
//callibrate
//language
//note name convention

const UserProfile = () => {
  const [leftHandedMode, setLeftHandedMode] = useState(false);

  const handleToggleSwitch = () => {
    setLeftHandedMode(!leftHandedMode);
    // Additional logic can be added here based on the state change
  };
  const navigation = useNavigation();
  return (
    <View className="h-full w-full flex-1 justify-between">
      <View className="flex items-center">
        <View className="flex items-center">
          <Text className='text-lg font-bold tracking-wider text-4xl pt-40'>Settings</Text>
        </View>
      </View> 

      <View className='flex-1 justify-center items-center'>
        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row justify-between items-center'
        >
          <Text className='text-lg'>Saved Tunings</Text>
          <Text className='text-lg'>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={true}
          className='border-t border-gray-300 py-6 px-6 w-full flex-row justify-between items-center'
        >
          <Text className='text-lg'>Left-handed Mode</Text>
          <Switch
            value={leftHandedMode}
            onValueChange={handleToggleSwitch}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row justify-between items-center'
        >
          <Text className='text-lg'>Calibrate</Text>
          <Text className='text-lg'>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row justify-between items-center'
        >
          <Text className='text-lg'>Language</Text>
          <Text className='text-lg'>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row justify-between items-center'
        >
          <Text className='text-lg'>Note Name Convention</Text>
          <Text className='text-lg'>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
