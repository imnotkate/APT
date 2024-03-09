import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'iconoir-react-native';
import { useNavigation } from '@react-navigation/native';
import ThreePlusThreeHeadImage from '../assets/images/3+3head.jpg';
import SixHeadImage from '../assets/images/6head.jpg';
import { Dropdown } from 'react-native-element-dropdown';

function Instruments() {
    const navigation = useNavigation();

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

        {/* back arrow */}
      <View className="flex flex-row pt-20 pl-5">
        <TouchableOpacity onPress={() => navigation.push('Root')}>
          <ArrowLeft color="black" height={30} width={30} />
        </TouchableOpacity>
      </View>

        {/* guitar head styles */}
        <View className="flex flex-row justify-center">
            
        <View style={{ alignItems: 'center', padding: 20}}>
            <TouchableOpacity
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
            }}
            >
            <Image
                source={ThreePlusThreeHeadImage}
                style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'black',
                }}
            />
            </TouchableOpacity>
            <Text style={{ paddingTop: 5 }}>3+3</Text>
        </View>

        <View style={{ alignItems: 'center', padding: 20 }}>
            <TouchableOpacity
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
            }}
            >
            <Image
                source={SixHeadImage}
                style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'black',
                }}
            />
            </TouchableOpacity>
            <Text style={{ paddingTop: 5 }}>6-in-line</Text>
        </View>
        </View>


        {/* drop down menus */}
        <View className="flex justify-center flex-column">
            <Dropdown
            style={{margin: 16,
                height: 60,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 18}}
            selectedTextStyle={{fontSize: 18}}
            iconStyle={{ width: 30,
                height: 30,}}
            data={guitars}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Guitar"
            value={value}
            // onChange={item => {
            // setValue(item.value);
            // }}
        />
        <Dropdown
            style={{margin: 16,
                height: 60,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 18}}
            selectedTextStyle={{fontSize: 18}}
            iconStyle={{ width: 30,
                height: 30,}}
            data={bass}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Bass"
            value={value}
            // onChange={item => {
            // setValue(item.value);
            // }}
        />
        <Dropdown
            style={{margin: 16,
                height: 60,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 18}}
            selectedTextStyle={{fontSize: 18}}
            iconStyle={{ width: 30,
                height: 30,}}
            data={ukulele}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Ukulele"
            value={value}
            // onChange={item => {
            // setValue(item.value);
            // }}
        />
        <Dropdown
            style={{margin: 16,
                height: 60,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 18}}
            selectedTextStyle={{fontSize: 18}}
            iconStyle={{ width: 30,
                height: 30,}}
            data={mandolin}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Manolin"
            value={value}
            // onChange={item => {
            // setValue(item.value);
            // }}
        />
        <Dropdown
            style={{margin: 16,
                height: 60,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 18}}
            selectedTextStyle={{fontSize: 18}}
            iconStyle={{ width: 30,
                height: 30,}}
            data={banjo}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Banjo"
            value={value}
            // onChange={item => {
            // setValue(item.value);
            // }}
        />
        </View>

    </View>

  )
}

export default Instruments