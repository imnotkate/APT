import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Button, Switch } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThreePlusThreeHeadImage from '../assets/images/3plus3guitar.png';
import SixHeadImage from '../assets/images/guitar-head-removebg-preview.png';

function Metronome() {
  return (
    <Text style={{color: 'black'}}>Metronome</Text>
    
  )
}

export default Metronome