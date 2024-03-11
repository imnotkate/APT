import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'iconoir-react-native';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import ThreePlusThreeHeadImage from '../assets/images/3+3head.jpg';
import SixHeadImage from '../assets/images/6head.jpg';
import { Dropdown } from 'react-native-element-dropdown';

function Instruments() {
  const navigation = useNavigation();

  const [selectedHead, setSelectedHead] = useState('6-in-line'); // Add state for selected guitar head

  const handleHeadSelect = (headType) => {
    setSelectedHead(headType);
    navigation.setParams({ selectedHead: headType }); // Update the navigation params
  };

  const navigateToTuner = () => {
    navigation.navigate('Tune', { head: { selectedHead } });
  };


  const guitars = [
    { label: '6 strings', value: 'Guitar 6-string' },
    { label: '7 strings', value: 'Guitar 7-string' },
    { label: '8 strings', value: 'Guitar 8-string' },
    { label: '12 strings', value: 'Guitar 12-string' },
  ];

  const bass = [
    { label: '4 strings', value: 'Bass 4-string' },
    { label: '5 strings', value: 'Bass 5-string' },
  ];

  const ukulele = [
    { label: 'Soprano', value: 'Soprano Ukulele' },
    { label: 'Concert', value: 'Concert Ukulele' },
    { label: 'Tenor', value: 'Tenor Ukulele' },
    { label: 'Baritone', value: 'Baritone Ukulele' },
  ];

  const mandolin = [
    { label: '8 strings', value: 'Mandolin 8-string' },
  ];

  const banjo = [
    { label: '4 strings', value: 'Banjo 4-string' },
    { label: '5 strings', value: 'Banjo 5-string' },
    { label: '6 strings', value: 'Banjo 6-string' },
  ];

  const [value, setValue] = useState(null);

  return (
    <View className="bg-grey h-full w-full">
      {/* Back arrow */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingLeft: 20 }}>
        <TouchableOpacity  onPress={navigateToTuner}>
          <ArrowLeft color="#000" height={30} width={30} />
        </TouchableOpacity>
      </View>

      {/* Guitar head styles */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <TouchableOpacity
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
              opacity: selectedHead === '3+3' ? 1 : 0.5, // Apply opacity based on selected head
            }}
            onPress={() => handleHeadSelect('3+3')} // Call the handleHeadSelect function with '3+3' as the argument
          >
            <Image
              source={ThreePlusThreeHeadImage}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#333333',
              }}
            />
          </TouchableOpacity>
          <Text style={{ paddingTop: 5, color: '#000' }}>3+3</Text>
        </View>

        <View style={{ alignItems: 'center', padding: 20 }}>
          <TouchableOpacity
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
              opacity: selectedHead === '6-in-line' ? 1 : 0.5, // Apply opacity based on selected head
            }}
            onPress={() => handleHeadSelect('6-in-line')} // Call the handleHeadSelect function with '6-in-line' as the argument
          >
            <Image
              source={SixHeadImage}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#333333',
              }}
            />
          </TouchableOpacity>
          <Text style={{ paddingTop: 5, color: '#000' }}>6-in-line</Text>
        </View>
      </View>

      {/* Drop down menus */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Dropdown
            style={{
              marginHorizontal: 20,
              height: 60,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: '#ffffff',
              width: 350,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
            placeholderStyle={{
                fontSize: 16,
                color: '#de1d35',
                marginLeft: 16, // Add margin to the left
              }}
              contentContainerStyle={{
                justifyContent: 'center', // Centers the content vertically
              }}
            selectedTextStyle={{ fontSize: 16, color: '#de1d35' }}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333', marginRight: 12}}
            data={guitars}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Guitar"
            value={value}
            scrollEnabled={true}
            // onChange={item => {
            // setValue(item.value);
            // }}
          />
          <Dropdown
            style={{
              marginHorizontal: 20,
              marginTop: 22,
              height: 60,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: '#ffffff',
              width: 350,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
            placeholderStyle={{
                fontSize: 16,
                color: '#de1d35',
                marginLeft: 16, // Add margin to the left
              }}
              contentContainerStyle={{
                justifyContent: 'center', // Centers the content vertically
              }}
            selectedTextStyle={{ fontSize: 16, color: '#de1d35', }}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333', marginRight: 12  }}
            data={bass}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Bass"
            value={value}
            scrollEnabled={true}
            // onChange={item => {
            // setValue(item.value);
            // }}
          />
          <Dropdown
            style={{
              marginHorizontal: 20,
              marginTop: 22,
              height: 60,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: '#ffffff',
              width: 350,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
            placeholderStyle={{
                fontSize: 16,
                color: '#de1d35',
                marginLeft: 16, // Add margin to the left
              }}
              contentContainerStyle={{
                justifyContent: 'center', // Centers the content vertically
              }}
            selectedTextStyle={{ fontSize: 16, color: '#de1d35'}}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333', marginRight: 12  }}
            data={ukulele}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Ukulele"
            value={value}
            scrollEnabled={true}
            // onChange={item => {
            // setValue(item.value);
            // }}
          />
          <Dropdown
            style={{
              marginHorizontal: 20,
              marginTop: 22,
              height: 60,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: '#ffffff',
              width: 350,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
            placeholderStyle={{
                fontSize: 16,
                color: '#de1d35',
                marginLeft: 16, // Add margin to the left
              }}
              contentContainerStyle={{
                justifyContent: 'center', // Centers the content vertically
              }}
            selectedTextStyle={{ fontSize: 16, color: '#de1d35'}}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333', marginRight: 12 }}
            data={mandolin}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Mandolin"
            value={value}
            scrollEnabled={true}
            // onChange={item => {
            // setValue(item.value);
            // }}
          />
          <Dropdown
            style={{
              marginHorizontal: 20,
              marginTop: 22,
              height: 60,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: '#ffffff',
              width: 350,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
            placeholderStyle={{
                fontSize: 16,
                color: '#de1d35',
                marginLeft: 16, // Add margin to the left
              }}
              contentContainerStyle={{
                justifyContent: 'center', // Centers the content vertically
              }}
            selectedTextStyle={{ fontSize: 16, color: '#de1d35'}}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333' , marginRight: 12 }}
            data={banjo}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Banjo"
            value={value}
            scrollEnabled={true}
            // onChange={item => {
            // setValue(item.value);
            // }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Instruments;