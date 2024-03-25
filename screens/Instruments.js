import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft } from 'iconoir-react-native';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import ThreePlusThreeHeadImage from '../assets/images/3+3head.jpg';
import SixHeadImage from '../assets/images/6head.jpg';
import { Dropdown } from 'react-native-element-dropdown';

function Instruments({route}) {
  const navigation = useNavigation();

  const [selectedHead, setSelectedHead] = useState(route.params.selectedHead);
  const [selectedInstrument, setSelectedInstrument] = useState(route.params.selectedInstrument);

  const navigateToTuner = (selectedHead, selectedInstrument) => {
    navigation.navigate('Tune', { selectedHead, selectedInstrument });
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelectedHead(selectedHead);
      setSelectedInstrument(selectedInstrument);
    }, [navigation])
  );

  const guitars = [
    { label: 'Guitar 6-string', value: '6-in-line' },
    { label: 'Guitar 7-string', value: '7-string' },
    { label: 'Guitar 8-string', value: '8-string' },
    { label: 'Guitar 12-string', value: '12-string' },
  ];

  const bass = [
    { label: 'Bass 4-string', value: 'Bass 4-string' },
    { label: 'Bass 5-string', value: 'Bass 5-string' },
  ];

  const ukulele = [
    { label: 'Ukulele Soprano', value: 'Soprano Ukulele' },
    { label: 'Ukulele Concert', value: 'Concert Ukulele' },
    { label: 'Ukulele Tenor', value: 'Tenor Ukulele' },
    { label: 'Ukulele Baritone', value: 'Baritone Ukulele' },
  ];

  const mandolin = [
    { label: 'Mandolin 8-string', value: 'Mandolin 8-string' },
  ];

  const banjo = [
    { label: 'Banjo 4-string', value: 'Banjo 4-string' },
    { label: 'Banjo 5-string', value: 'Banjo 5-string' },
    { label: 'Banjo 6-string', value: 'Banjo 6-string' },
  ];

  const [value, setValue] = useState(null);

  return (
    <View className="bg-grey h-full w-full">
      {/* Back arrow */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingLeft: 20 }}>
      <TouchableOpacity style={{marginRight: 20, marginLeft: 10}} onPress={() => {console.log(selectedHead, selectedInstrument), navigation.navigate('Tune', {selectedHead, selectedInstrument});}}>
            <ArrowLeft color="#de1d35" height={30} width={30} />
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
            onPress={() => navigateToTuner('3+3')} // Call the handleHeadSelect function with '3+3' as the argument
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
            onPress={() => navigateToTuner('6-in-line')} // Call the handleHeadSelect function with '6-in-line' as the argument
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
            selectedTextStyle={{ fontSize: 16, color: '#de1d35', marginLeft: 16}}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333', marginRight: 12}}
            data={guitars}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Guitar"
            value={value}
            scrollEnabled={true}
            onChange={(item) => {
              if (item.value !== value) { // Check if the selected value is different from the current value
                setSelectedHead(item.value);
                setSelectedInstrument(item.label);
                setValue(item.value); // Update the value state only if the selected value is different
                navigation.setParams({ selectedHead: item.value, selectedInstrument: item.label}); // Update the navigation params
                navigateToTuner(item.value, item.label);
              }}}
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
            selectedTextStyle={{ fontSize: 16, color: '#de1d35', marginLeft: 16}}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333', marginRight: 12  }}
            data={bass}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Bass"
            value={value}
            scrollEnabled={true}
            onChange={(item) => {
              if (item.value !== value) { // Check if the selected value is different from the current value
                setSelectedHead(item.value);
                setSelectedInstrument(item.label);
                setValue(item.value); // Update the value state only if the selected value is different
                navigation.setParams({ selectedHead: item.value, selectedInstrument: item.label}); // Update the navigation params
                navigateToTuner(item.value, item.label);
              }}}
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
            selectedTextStyle={{ fontSize: 16, color: '#de1d35', marginLeft: 16}}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333', marginRight: 12  }}
            data={ukulele}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Ukulele"
            value={value}
            scrollEnabled={true}
            onChange={(item) => {
              if (item.value !== value) { // Check if the selected value is different from the current value
                setSelectedHead(item.value);
                setSelectedInstrument(item.label);
                setValue(item.value); // Update the value state only if the selected value is different
                navigation.setParams({ selectedHead: item.value, selectedInstrument: item.label}); // Update the navigation params
                navigateToTuner(item.value, item.label);
              }}}
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
            selectedTextStyle={{ fontSize: 16, color: '#de1d35', marginLeft: 16}}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333', marginRight: 12 }}
            data={mandolin}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Mandolin"
            value={value}
            scrollEnabled={true}
            onChange={item => {
            setValue(item.value);
            }}
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
            selectedTextStyle={{ fontSize: 16, color: '#de1d35', marginLeft: 16}}
            iconStyle={{ width: 24, height: 24, tintColor: '#333333' , marginRight: 12 }}
            data={banjo}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Banjo"
            value={value}
            scrollEnabled={true}
            onChange={item => {
            setValue(item.value);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Instruments;