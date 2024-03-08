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
        { label: '6 strings', value: '6' },
        { label: '7 strings', value: '7' },
        { label: '8 strings', value: '8' },
        { label: '12 strings', value: '12' },
      ];

      const bass = [
        { label: '4 strings', value: '4' },
        { label: '5 strings', value: '5' },
      ];

      const ukulele = [
        { label: 'Soprano', value: 's' },
        { label: 'Concert', value: 'c' },
        { label: 'Tenor', value: 't' },
        { label: 'Baritone', value: 'b' },
      ];

      const mandolin = [
        { label: '8 strings', value: '8' },
      ];

      const banjo = [
        { label: '4 strings', value: '4' },
        { label: '5 strings', value: '5' },
        { label: '6 strings', value: '6' },
      ];

      const [value, setValue] = useState(null);

  return (
    <View className="bg-grey h-full w-full">

        {/* back arrow */}
      <View className="flex flex-row pt-20 pl-10">
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
                height: 50,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            iconStyle={{ width: 20,
                height: 20,}}
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
                height: 50,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            iconStyle={{ width: 20,
                height: 20,}}
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
                height: 50,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            iconStyle={{ width: 20,
                height: 20,}}
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
                height: 50,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            iconStyle={{ width: 20,
                height: 20,}}
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
                height: 50,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,}}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            iconStyle={{ width: 20,
                height: 20,}}
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