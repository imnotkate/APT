import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, Button, Switch } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ThreePlusThreeHeadImage from '../assets/images/3+3-removebg.png';
import SixHeadImage from '../assets/images/6inline-removebg-preview.png';
import SevenString from '../assets/images/7string-removebg.png';
import EightString from '../assets/images/8string-removebg.png';
import TwelveString from '../assets/images/12string-removebg-preview.png';
import Bass4String from '../assets/images/bass-4-string.png';
import UkeSop from '../assets/images/uksop.png';

function Tuner({ route }) {

  const { selectedHead, selectedInstrument } = route.params || {};
  const tunings = ['Standard','Open G','Open D','D Modal','Drop D','Open C','Drop C','Drop B','Drop A','Half Step Down','Full Step Down','Drop C#','Drop D Flat','Drop E','Drop F','Drop G','Open E','Open A','Open B','Open F','Gsus','Asus2 Modal','New Standard','Standard C','Standard C#','Standard B-Barytone','Low C','Low A full step down','C Modal','C6 Modal','All Fourths','Double Drop D','Pentatonic','Minor Third','Major Third','Augmented Fourth','Nick Drake', 'Dobro Open G']; 
  const sevenTunings = ['Standard','Open G','D Modal','Drop D','Open C','Drop A','Drop F','Drop G','Drop G#','Drop A#','Drop B','All Fourths','Russian','Standard Choro','Thirds'];
  const eightTunings = ['Standard', 'Drop D', 'Drop A + E', 'Drop E', 'F'];
  const twelveTunings = ['Standard', 'Open G', 'D Modal', 'Drop D', 'Open C', 'Drop A', 'Split', 'Open E', 'Full Step Down'];
  const ukeSopTunings = ['Standard', 'Low G'];
  const bass4StringTunings = ['Standard', 'Drop D'];

  const renderGuitarHead = () => {
    switch (selectedHead) {
      case '3+3':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <StringButtonsLeft
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
            <Image source={ThreePlusThreeHeadImage} style={{ width: 240, height: 400 }} />
            <StringButtonsRight
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
          </View>
        );
      case '8-string':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <StringButtonsLeft
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
            <Image source={EightString} style={{ width: 220, height: 460 }} />
            <StringButtonsRight
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
          </View>
        );
      case '12-string':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <StringButtonsLeft
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
            <Image source={TwelveString} style={{ width: 230, height: 460 }} />
            <StringButtonsRight
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
          </View>
        );
      case '6-in-line':
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <StringsInLine
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
            </View>
            <Image source={SixHeadImage} style={{ width: 220, height: 450 }} />
          </View>
        );
      case '7-string':
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <StringsInLine
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
            </View>
            <Image source={SevenString} style={{ width: 210, height: 480 }} />
          </View>
        );
case 'Bass 4-string':
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <StringsInLine
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
            </View>
            <Image source={Bass4String} style={{ width: 250, height: 430 }} />
          </View>
        );
      case 'Soprano Ukulele':
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <StringButtonsLeft
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
            <Image source={UkeSop} style={{ width: 260, height: 410 }} />
            <StringButtonsRight
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
          </View>
        );
      default:
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <StringsInLine
              strings={strings}
              selectedString={selectedString}
              isTuned={isTuned}
              flashing={flashing}
              handleStringClick={handleStringClick}
            />
            </View>
            <Image source={SixHeadImage} style={{ width: 220, height: 450 }} />
          </View>
        );
    }
  };

  const getPaddingRight = () => {
    const guitarType = selectedHead;
    return guitarType === '6-in-line' ? 25 :
           guitarType === '7-string' ? 30 :
           guitarType === 'Bass 4-string' ? 5 :
           25 ; // Default value if none of the conditions match
  };

  const getPaddingLeft = () => {
    const guitarType = selectedHead;
    return guitarType === '6-in-line' ? 50 :
            guitarType === '7-string' ? 60 :
           50 ; // Default value if none of the conditions match
  };

  const getPaddingBottom = () => {
    const guitarType = selectedHead;
    return guitarType === '6-in-line' ? 60 :
            guitarType === '7-string' ? 10 :
            guitarType === '3+3' ? 70 :
            guitarType === 'Bass 4-string' ? 80 :
            guitarType === '8-string' ? 40 :
           60 ; // Default value if none of the conditions match
  };

  const getMargin = () => {
    const guitarType = selectedHead;
    return  guitarType === '12-string' ? 10 :
            guitarType === '3+3' ? 30 :
            guitarType === 'Bass 4-string' ? 50 :
            guitarType === '8-string' ? 30 :
            guitarType === 'Soprano Ukulele' ? 30 :
           10 ; // Default value if none of the conditions match
  };

  const StringsInLine = ({ strings, selectedString, isTuned, flashing, handleStringClick }) => (
    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: getPaddingBottom(), paddingLeft: getPaddingLeft(), paddingRight: getPaddingRight() }}>
          {strings.map((string, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedString(string);
                sendMessageToServer(string, selectedInstrument);
                handleTuningProgress();
                handleStringClick(string);
              }}
              style={{
                width: 52,
                height: 52,
                borderRadius: 30,
                backgroundColor: selectedString === string
                ? (isTuned ? (flashing ? 'green' : 'green') : '#de1d35')
                : '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#de1d35',
                marginBottom: 10, // Add space between circles
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 0,
                borderColor: 'transparent',
              }}
            >
              <Text style={{ color: selectedString === string ? '#fff' : '#de1d35', fontSize: 16 }}>
                {string}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
  );

  const handleStringClick = (string) => {
    setSelectedString(string);
    sendMessageToServer(string, selectedInstrument);
    handleTuningProgress();
  };

  const renderTunings = () => {
    switch (selectedInstrument) {
      case 'Guitar 6-string':
        return tunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      case 'Guitar 7-string':
        return sevenTunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      case 'Guitar 8-string':
        return eightTunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      case 'Guitar 12-string':
        return twelveTunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      case 'Bass 4-string':
        return bass4StringTunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      case 'Ukulele Soprano':
        return ukeSopTunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));
      default:
        return tunings.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ));

    }
  };
  const navigation = useNavigation();

  const [selectedTuning, setTuning] = useState('Standard');
  const [selectedString, setSelectedString] = useState(null);
  const [tuningProgress, setTuningProgress] = useState(0);

  const stringsData = {
    'Standard': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Open G': ['D4', 'G3', 'D3', 'G2', 'B1', 'D2'],
    'Open D': ['D4', 'A2', 'D3', 'F#3', 'A2', 'D2'],
    'D Modal': ['D4', 'A2', 'G2', 'D3', 'A3', 'D2'],
    'Drop D': ['D3', 'A2', 'D2', 'G2', 'B1', 'E2'],
    'Open C': ['E4', 'C4', 'G3', 'C3', 'E2', 'C2'],
    'Drop C': ['C3', 'G2', 'D3', 'C2', 'A1', 'D2'],
    'Drop B': ['B2', 'F2', 'B1', 'E2', 'Ab2', 'Db2'],
    'Drop A': ['A2', 'D3', 'A1', 'E2', 'B1', 'A1'],
    'Half Step Down': ['Eb4', 'Bb3', 'Eb3', 'Ab2', 'Db2', 'Eb2'],
    'Full Step Down': ['D4', 'A2', 'D3', 'G2', 'C2', 'D2'],
    'Drop C#': ['C#3', 'G#2', 'C#3', 'F3', 'Ab2', 'Db2'],
    'Drop D Flat': ['Db3', 'Ab2', 'Db3', 'F2', 'Ab1', 'Db2'],
    'Drop E': ['E4', 'B3', 'E2', 'B2', 'E3', 'B3'],
    'Drop F': ['F3', 'C3', 'F2', 'D2', 'A1', 'D3'],
    'Drop G': ['G3', 'D3', 'G2', 'E2', 'B1', 'E3'],
    'Open E': ['E4', 'B3', 'E2', 'B2', 'E3', 'B3'],
    'Open A': ['E4', 'C#4', 'A2', 'E3', 'A3', 'E4'],
    'Open B': ['B3', 'F#3', 'B2', 'F#2', 'B1', 'F#1'],
    'Open F': ['F4', 'C4', 'F3', 'A#2', 'C2', 'F2'],
    'Gsus': ['G4', 'D3', 'G3', 'G2', 'D2', 'G3'],
    'Asus2 Modal': ['A4', 'E2', 'D3', 'A3', 'E3', 'A2'],
    'New Standard': ['C4', 'G2', 'D3', 'G3', 'C3', 'E1'],
    'Standard C': ['C4', 'G2', 'C3', 'G3', 'C3', 'E1'],
    'Standard C#': ['C#4', 'G#2', 'C#3', 'G#3', 'C#3', 'F#1'],
    'Standard B-Barytone': ['B3', 'F#1', 'B2', 'F#2', 'B1', 'E1'],
    'Low C': ['C3', 'G1', 'C2', 'G2', 'C1', 'E1'],
    'Low A full step down': ['G3', 'D1', 'G2', 'D2', 'G1', 'E1'],
    'C Modal': ['C4', 'G2', 'C3', 'G3', 'C2', 'C1'],
    'C6 Modal': ['C4', 'A2', 'G2', 'C3', 'G3', 'C1'],
    'All Fourths': ['E4', 'A2', 'D3', 'G3', 'C2', 'F1'],
    'Double Drop D': ['D4', 'A2', 'G2', 'D3', 'A3', 'D2'],
    'Pentatonic': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Minor Third': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Major Third': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Augmented Fourth': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
    'Nick Drake': ['C4', 'G3', 'C3', 'G2', 'C2', 'D1'],
    'Dobro Open G': ['G4', 'G1', 'D2', 'B1', 'G3', 'D4']
};

const sevenStringsData = {
  'Standard': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1'],
'Open G': ['D4', 'G3', 'D3', 'G2', 'D2', 'B1', 'B2'],
'D Modal': ['D4', 'A3', 'G2', 'D3', 'A2', 'E1', 'B1'],
'Drop D': ['E4', 'A3', 'G2', 'D3', 'A2', 'E1', 'B1'],
'Open C': ['E4', 'G3', 'E3', 'C3', 'G2', 'E2', 'C2'],
'Drop A': ['E4', 'A3', 'G2', 'D3', 'A2', 'E1', 'A1'],
'Drop F': ['C4', 'F3', 'D3', 'A#2', 'F2', 'C2', 'F1'],
'Drop G': ['D4', 'G3', 'F3', 'C3', 'G2', 'D2', 'G1'],
'Drop G#': ['D#4', 'G#3', 'F#3', 'C#3', 'G#2', 'E2', 'G#1'],
'Drop A#': ['F4', 'A#3', 'G#3', 'D#3', 'A#2', 'F#2', 'C#2'],
'Drop B': ['F#4', 'B3', 'A3', 'E3', 'B2', 'G2', 'D2'],
'All Fourths': ['E4', 'A3', 'D3', 'G2', 'C2', 'F1', 'B1'],
'Russian': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1'],
'Standard Choro': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1'],
'Thirds': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1']
};

const eightStringsData = {
'Standard': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F#1'],
'F': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F1'],
'Drop E': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'E1'],
'Drop A + E': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'A1', 'E1'],
'Drop D': ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'D1']
};

const twelveStringsData = {
  'Standard': ['E5', 'B4', 'G4', 'D4', 'G3', 'D3', 'A3', 'E3', 'B3', 'E2', 'A2', 'E1'],
  'Open G': ['D5', 'B4', 'G4', 'D4', 'G3', 'D3', 'G3', 'D2', 'B3', 'G2', 'D2', 'D1'],
  'D Modal': ['D5', 'A4', 'D4', 'A3', 'D3', 'A2', 'G3', 'D2', 'A3', 'D2', 'A2', 'D1'],
  'Drop D': ['D5', 'A4', 'D4', 'A3', 'D3', 'A2', 'G3', 'D2', 'A3', 'D2', 'A2', 'D1'],
  'Open C': ['C5', 'C4', 'G4', 'C4', 'G3', 'C3', 'G3', 'C2', 'C4', 'G2', 'C2', 'C1'],
  'Drop A': ['E5', 'A4', 'E4', 'A3', 'D4', 'G3', 'D3', 'A2', 'A3', 'E2', 'A2', 'E1'],
  'Split': ['E5', 'E2', 'B4', 'B3', 'G4', 'G3', 'D4', 'D3', 'A3', 'A2', 'E2', 'E1'],
  'Open E': ['E5', 'B4', 'G4', 'D4', 'G3', 'D3', 'G3', 'D2', 'G3', 'B2', 'E3', 'E1'],
  'Full Step Down': ['C5', 'C2', 'A4', 'A3', 'F4', 'F3', 'C4', 'C3', 'G3', 'G2', 'C2', 'C1']
};
  
const bass4StringData = {
  'Standard': ['G2', 'D2', 'A1', 'E1'],
'Drop D': ['G2', 'D2', 'A1', 'D1'],
'Drop C': ['F2', 'C2', 'G1', 'C1'],
'Drop B': ['E2', 'B1', 'F#1', 'B0'],
'Drop A': ['D2', 'A1', 'E1', 'A0'],
'Piccolo': ['D4', 'A3', 'D3', 'G2'],
'Fifths': ['E3', 'A2', 'D2', 'G1'],
'All Fourths': ['G2', 'D2', 'A1', 'E1'],
'Major Thirds': ['E2', 'C2', 'G#1', 'E1'],
'Augmented': ['E2', 'C#2', 'G#1', 'E1'],
'Tenor': ['A3', 'D3', 'G2', 'C2'],
'Orchestral': ['A2', 'D2', 'G1', 'C1'],
'Dropped Fourths': ['F2', 'C2', 'G1', 'D1'],
'Tritone': ['Bb2', 'Eb2', 'Bb1', 'E1'],
'Maverick': ['A2', 'E2', 'B1', 'F#1'],
'Reversed': ['G2', 'D2', 'A1', 'E1'],
'Circle of Fifths': ['Bb2', 'F2', 'C2', 'G1'],
'All Fifths': ['E3', 'A2', 'D2', 'G1'],
'Whole Tone':['B1', 'A1', 'F#1', 'E1'],
'Chromatic': ['G1', 'F#1', 'F1', 'E1']
};

const ukeSopData = {
    'Standard':['G4', 'C4', 'E4', 'A4'],
'D Tuning (Reentrant)':['A4', 'D4', 'F#4', 'B4'],
'Open G': ['G4', 'C4', 'F4', 'A4'], 
 'Open G Minor':['G4', 'C4', 'F4', 'Bb4'],
'D Tuning (Linear)':['A4', 'D4', 'F#4', 'A4'],
'Low G':['Bb4', 'D4', 'F4', 'Bb4'],
'Fiji C': ['G4', 'G4', 'C4', 'E4']
};
  // const strings = stringsData[selectedTuning] || []; // Get strings based on selected tuning
  const strings = {
    'Guitar 6-string': stringsData[selectedTuning] || [],
    'Guitar 7-string': sevenStringsData[selectedTuning] || [],
    'Guitar 8-string': eightStringsData[selectedTuning] || [],
    'Guitar 12-string': twelveStringsData[selectedTuning] || [],
'Bass 4-string': bass4StringData[selectedTuning] || [],
    'Ukulele Soprano': ukeSopData[selectedTuning] || [],
  }[selectedInstrument] || stringsData[selectedTuning] || [];

  const StringButtonsRight = ({ strings, selectedString, isTuned, flashing, handleStringClick }) => (
    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: getPaddingBottom() }}>
      {strings.slice(0, strings.length / 2).reverse().map((string, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {setSelectedString(string);
            sendMessageToServer(string, selectedInstrument);
            handleTuningProgress();
            handleStringClick(string);}}
          style={{
            width: 52,
            height: 52,
            borderRadius: 30,
            backgroundColor: selectedString === string
              ? (isTuned ? (flashing ? 'green' : 'green') : '#de1d35')
              : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#de1d35',
            marginBottom: getMargin(),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderColor: 'transparent',
          }}
        >
          <Text style={{ color: selectedString === string ? '#fff' : '#de1d35', fontSize: 16 }}>
            {string}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  // Component for rendering string buttons on the right side
  const StringButtonsLeft = ({ strings, selectedString, isTuned, flashing, handleStringClick }) => (
    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: getPaddingBottom() }}>
      {strings.slice(strings.length / 2).map((string, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {setSelectedString(string);
            sendMessageToServer(string, selectedInstrument);
            handleTuningProgress();
            handleStringClick(string);}}
          style={{
            width: 52,
            height: 52,
            borderRadius: 30,
            backgroundColor: selectedString === string
              ? (isTuned ? (flashing ? 'green' : 'green') : '#de1d35')
              : '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#de1d35',
            marginBottom: getMargin(),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderWidth: 0,
            borderColor: 'transparent',
          }}
        >
          <Text style={{ color: selectedString === string ? '#fff' : '#de1d35', fontSize: 16 }}>
            {string}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
 
  const handleTuningChange = (value) => {
    setTuning(value);
    setTuningPickerVisible(false);
  };

  const handleTuningProgress = () => {
    // Simulate tuning progress, you can replace this with actual logic
    if (tuningProgress < 100) {
      setTuningProgress(tuningProgress + 1);
    }
  };

  const [showTuningModal, setShowTuningModal] = useState(false);

  const handleToggleSwitch = () => {
    setAuto(!auto);
  };

  const [auto, setAuto] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isTuned, setIsTuned] = useState(false);
  const [flashing, setFlashing] = useState(false);

  // connection to flask webserver 
  // send msg
  const sendMessageToServer = (string, selectedInstrument) => {
    const messageData = {
      message: string,
      instrument: selectedInstrument
    };
    // use pi ip address and port number
    axios.post("http://192.168.4.3:5000/tune_string", messageData) // Example message
      .then(response => {
        if (response.status === 409) {
          //already tuning
        } else if (response.status === 202) {
          //string tuned
          setIsTuned(true);
          setSelectedString(string);
        } 
        else {
          //if a random response is received
          setIsTuned(false);
        }
      })
      .catch(error => {
        setIsTuned(false); // Assume not tuned if there's an error
      });
  };

  //send 205 stop tuning 
  //post to /stop_tuning

  const tuneStringsAutomatically = async () => {
    const stringsToTune = ['E2', 'A', 'D', 'G', 'B', 'E4']; // Add all your strings

    let currentIndex = 0;
    const maxIterations = 3; // Number of times to flash green for each string

    const intervalId = setInterval( async () => {
      if (currentIndex >= stringsToTune.length) {
        //all strings tuned so flash green
        clearInterval(intervalId);
        setFlashing(true);
        setTimeout(() => {
          setFlashing(false);
        }, 1000); // Adjust the time as needed
        return;
  }

  useEffect(() => {
    if (auto) {
      tuneStringsAutomatically();
    } else {
      clearInterval(intervalId); // Clear the interval if auto mode is turned off
    }
  }, [auto]);

  const currentString = stringsToTune[currentIndex];
  await sendAndTuneString(currentString);

    if (isTuned) {
      // String is tuned, move to the next one
      setCurrentIndex(currentIndex + 1);
    } else {
      // Handle if the string is not tuned, retry or handle as needed
    }
  }, 2000); // Adjust the time as needed

  setIntervalId(intervalId);
};

  const pickerTextStyle = {
    fontSize: 20, // Adjust the font size as needed
    textAlign: 'center', // Center the text
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#de1d35',
    color: '#de1d35',
    padding: 10,
    borderRadius: 25,
    width: 150,
    backgroundColor: '#fff',
  };
 

  const [isGuitarPickerVisible, setGuitarPickerVisible] = useState(false);
  const [isTuningPickerVisible, setTuningPickerVisible] = useState(false);


  return (
    <View className="bg-grey h-full w-full">
    {/* Logo and AUTO */}
    <View style={{paddingTop: 90, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
      <Image
        source={require('../assets/images/logosmall-removebg-preview.png')}
        style={{ width: 160, height: 80, marginLeft: 20}}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', paddingRight: 30}}>
        <Text style={{ fontSize: 20, marginRight: 10, color: '#0e1c36'}}>AUTO</Text>
        <Switch
          value={auto}
          onValueChange={handleToggleSwitch}
      />
      </View>
    </View>


    {/* Tuning and Instrument buttons */}
    <View style={{flex: 1, paddingTop:50, flexDirection: 'row', justifyContent: 'left', paddingLeft: 20}}>
<TouchableOpacity
  style={[
    {
      flexDirection: 'row',
      alignItems: 'center', // This will center the text vertically
      justifyContent: 'center', // This will center the text horizontally
      backgroundColor: '#de1d35',
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 0,
      borderColor: 'transparent',
      width: 150,
      height: 50,
    },
  ]}
  onPress={() => setShowTuningModal(true)}
>
  <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
    {selectedTuning}
  </Text>
</TouchableOpacity>

<Modal
  visible={showTuningModal}
  animationType="slide"
  transparent={true}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '90%' }}>
      <Picker
        selectedValue={selectedTuning}
        onValueChange={(itemValue) => {
          handleTuningChange(itemValue);
          setShowTuningModal(false);
        }}
        itemStyle={{ color: '#de1d35', fontSize: 18 }}
      >
        {renderTunings()}
      </Picker>
      <Button title="Cancel" onPress={() => setShowTuningModal(false)} />
    </View>
  </View>
</Modal>

    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', paddingLeft: 10 }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          borderRadius: 25,
          fontSize: 20,
          width: 190,
          height: 50,
          borderWidth: 1,
          borderColor: '#de1d35',
          backgroundColor: '#de1d35',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4, 
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderWidth: 0,
          borderColor: 'transparent',
        }}
        onPress={() => {navigation.push('Instruments')}}
      >
    <Text style={{fontSize: 18, color: '#fff'}}>{selectedInstrument || 'Guitar 6-string'}</Text>
      </TouchableOpacity>
      </View>
      </View>

      {/* Container for the guitar head image */}
      {renderGuitarHead()}
        

    </View>
     
  );
};


export default Tuner;