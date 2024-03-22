  import React, {useState} from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Pressable, Dimensions,Modal, Button} from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import ChordChart from 'react-native-chord-charts';
  import { ArrowLeft } from 'iconoir-react-native';
  import { Picker } from '@react-native-picker/picker';

  function ChordLib() {
    const navigation = useNavigation();

    const [keys, setSelectedKeys] = useState(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);
    
    const [selectedKey, setSelectedKey] = useState("C");
    const [selectedChord, setSelectedChord] = useState("major");
    const [showKeysModal, setShowKeysModal] = useState(false);
    const [showChordsModal, setShowChordsModal] = useState(false);
    const [showFlats, setShowFlats] = useState(false);

    
    

    const chords = ['major', 'minor', '5', '7', 'maj7', 'm7'];
    
    const renderKeys = () => {
      return keys.map((key, index) => (
        <Picker.Item key={index} label={key} value={key} />
      ));
    };
    
    const renderChords = () => {
      return chords.map((chord, index) => (
        <Picker.Item key={index} label={chord} value={chord} />
      ));
    };

    const renderChordChart = () => {
      if (selectedChord == 'major'){
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ChordChart
                        chordKey={selectedKey}
                        color="black"
                        showTuning
                        width={200}
                        height={200}
                    />
          </View>
        );
      } else if (selectedChord == 'minor'){
        const chordName = selectedKey + 'm';
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ChordChart
                        chordKey={chordName}
                        color="black"
                        showTuning
                        width={200}
                        height={200}
                    />
          </View>
        );
      } else if (selectedChord == '5'){
        const chordName = selectedKey + '5';
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ChordChart
                        chordKey={chordName}
                        color="black"
                        showTuning
                        width={200}
                        height={200}
                    />
          </View>
        );
      } else if (selectedChord == '7'){
        const chordName = selectedKey + '7';
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ChordChart
                        chordKey={chordName}
                        color="black"
                        showTuning
                        width={200}
                        height={200}
                    />
          </View>
        );
      } else if (selectedChord == 'maj7'){
        const chordName = selectedKey + 'maj7';
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ChordChart
                        chordKey={chordName}
                        color="black"
                        showTuning
                        width={200}
                        height={200}
                    />
          </View>
        );
      } else if (selectedChord == 'm7'){
        const chordName = selectedKey + 'm7';
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ChordChart
                        chordKey={chordName}
                        color="black"
                        showTuning
                        width={200}
                        height={200}
                    />
          </View>
        );
      }
    
  }
  

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
    });
    
    return (
      <View style={styles.container}>

        {/* Title and Back Button */}
        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 90, paddingLeft: 10, }}>
            <TouchableOpacity style={{marginRight: 20, marginLeft: 25}} onPress={() => {navigation.navigate('Tools');}}>
              <ArrowLeft color="#de1d35" height={30} width={30} />
            </TouchableOpacity>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#0e1c36', marginLeft: 20, paddingLeft: 20}}>Chord Library</Text>
        </View>

        {/* Key and Chord Buttons */}
        <View style={{paddingTop:50, flexDirection: 'row', justifyContent: 'left', paddingLeft: 40, paddingBottom: 30}}>
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
            onPress={() => setShowKeysModal(true)}
          >
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
            {selectedKey}
          </Text>
        </TouchableOpacity>
        
          <Modal
            visible={showKeysModal}
            animationType="slide"
            transparent={true}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '90%'}}>
                <Picker
                  selectedValue={selectedKey}
                  onValueChange={(itemValue) => {
                    setSelectedKey(itemValue);
                    setShowKeysModal(false);
                  }}
                  itemStyle={{ color: '#de1d35', fontSize: 20 }}
                >
                  {renderKeys()}
                </Picker>
                <Button title="Cancel" onPress={() => setShowKeysModal(false)} />
              </View>
            </View>
          </Modal>
          
          <View style={{paddingLeft: 20}}>
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
            onPress={() => setShowChordsModal(true)}
          >
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
            {selectedChord}
          </Text>

        </TouchableOpacity>
        </View>

          <Modal
            visible={showChordsModal}
            animationType="slide"
            transparent={true}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: '90%' }}>
                <Picker
                  selectedValue={selectedChord}
                  onValueChange={(itemValue) => {
                    setSelectedChord(itemValue);
                    setShowChordsModal(false);
                  }}
                  itemStyle={{ color: '#de1d35', fontSize: 20 }}
                >
                  {renderChords()}
                </Picker>
                <Button title="Cancel" onPress={() => setShowChordsModal(false)} />
              </View>
            </View>
          </Modal>
        </View>

        {renderChordChart()}
        
      </View>
    )
  }

  export default ChordLib