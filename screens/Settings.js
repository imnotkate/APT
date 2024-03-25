import React, { useState } from 'react';
import { View, Modal, Button, StyleSheet, Text, TouchableOpacity, Switch} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BookSolid, MusicNote, Globe, RefreshCircle, PeaceHand } from 'iconoir-react-native';
import { useLanguage } from './LanguageContext';
import { LanguageProvider } from './LanguageContext';
import { Picker } from '@react-native-picker/picker';
import { useLeftHanded } from './Context';

const Settings = () => {
  const [leftHandedMode, setLeftHandedMode] = useState(false);

  const handleToggleSwitch = () => {
    setLeftHandedMode(!leftHandedMode);
    // Additional logic can be added here based on the state change
  };

  const navigation = useNavigation();

  const { language ,setLanguage } = useLanguage();
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (selectedValue) => {
    setSelectedLanguage(selectedValue);
  };

  const handleSelectPress = () => {
    setLanguage(selectedLanguage); // Update the global language state
    setModalVisible(false); // Close the modal
  };

  const handleGuidePress = () => {
    navigation.navigate('Guide');
  };


  const { isLeftHanded, toggleLeftHanded } = useLeftHanded();

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    // Add more styles if needed
  });
  

  return (
      <View className="h-full w-full flex-1 justify-between bg-grey">
      <View className="flex items-center">
        <View className="flex items-center">
          <Text className='text-lg font-bold tracking-wider text-4xl pt-40' style={{color: '#0e1c36'}}>Settings</Text>
        </View>
      </View> 

      <View className='flex-1 justify-center items-center'>
        <TouchableOpacity
          onPress={handleGuidePress}
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1' style={{color: '#0e1c36'}}>Guide</Text>
          <BookSolid color="black" height={25} width={32} />
        </TouchableOpacity>

        <TouchableOpacity disabled={true}
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1' style={{color: '#0e1c36'}}>Left-handed Mode</Text>
          <PeaceHand color="black" height={25} width={32} />
          <View style={{ paddingLeft: 90 }}>
          <Switch 
            value={isLeftHanded}
            onValueChange={toggleLeftHanded}
            style={{ paddingLeft: 40 }}
          />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1' style={{color: '#0e1c36'}}>Calibrate</Text>
          <RefreshCircle color="black" height={25} width={32}/>
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text className='text-lg px-1' style={{color: '#0e1c36'}}>Language</Text>
          <Globe color="black" height={25} width={32} />
          {/* {showPicker && (
        <View>
          <Picker
        selectedValue={language}
        onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
        style={{height: 50, width: 100}} // Adjust the styling as needed
      >
        
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Français" value="fr" />
       
      </Picker>
        </View> )}*/}
         <View style={styles.centeredView}>      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) => 
                handleLanguageChange(itemValue)
                 // Close modal after selection
              }
              style={{ width: 250}} // Adjust width as necessary
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Français" value="fr" />
              <Picker.Item label="Español" value="es" />
              <Picker.Item label="Deutsch" value="de" />
              <Picker.Item label="Italiano" value="it" />
              <Picker.Item label="Português" value="pt" />
              <Picker.Item label="Русский" value="ru" />
              <Picker.Item label="中文" value="zh" />
              <Picker.Item label="日本語" value="ja" />
              <Picker.Item label="한국어" value="ko" />
              <Picker.Item label="العربية" value="ar" />
              <Picker.Item label="हिन्दी" value="hi" />
              <Picker.Item label="বাংলা" value="bn" />
              {/* Add more languages as needed */}
            </Picker>
            <Button title="Select" onPress={handleSelectPress} />
          </View>
        </View>
      </Modal>
    </View>
      
        </TouchableOpacity>

        <TouchableOpacity
          className='border-t border-gray-300 py-6 px-6 w-full flex-row space-between items-center'
        >
          <Text className='text-lg px-1' style={{color: '#0e1c36'}}>Note Name Convention</Text>
          <MusicNote color="#0e1c36" height={25} width={32} />
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

export default Settings;
