import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Arc3dCenterPoint, MusicNote, Globe, RefreshCircle, PeaceHand } from 'iconoir-react-native';

const UserProfile = () => {
  const [leftHandedMode, setLeftHandedMode] = useState(false);

  const handleToggleSwitch = () => {
    setLeftHandedMode(!leftHandedMode);
    // Additional logic can be added here based on the state change
  };

  const navigation = useNavigation();
  
  return (
    <View className="h-full w-full flex-1 justify-between bg-white">
      <View className="flex items-center">
        <View className="flex items-center">
          <Text className='text-lg font-bold tracking-wider text-4xl pt-40'>Settings</Text>
        </View>
      </View> 

      <View className='flex-1 justify-center items-center'>
        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1'>Saved Tunings</Text>
          <Arc3dCenterPoint color="black" height={25} width={32} />
        </TouchableOpacity>

        <TouchableOpacity disabled={true}
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1'>Left-handed Mode</Text>
          <PeaceHand color="black" height={25} width={32} />
          <View style={{ paddingLeft: 90 }}>
          <Switch 
            value={leftHandedMode}
            onValueChange={handleToggleSwitch}
            style={{ paddingLeft: 40 }}
          />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1'>Calibrate</Text>
          <RefreshCircle color="black" height={25} width={32}/>
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1'>Language</Text>
          <Globe color="black" height={25} width={32} />
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1'>Note Name Convention</Text>
          <MusicNote color="black" height={25} width={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
