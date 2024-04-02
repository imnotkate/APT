import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'iconoir-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
function CustomTunings() {
 const navigation = useNavigation();
 // Initialize tunings with an id and name
 const [tunings, setTunings] = useState([]);
 const [newTuning, setNewTuning] = useState('');

 const [modalVisible, setModalVisible] = useState(false);
 const [selectedInstrument, setSelectedInstrument] = useState('6 String Guitar');
 const [stringTunings, setStringTunings] = useState(Array(6).fill(''));


 // Load tunings when the component mounts
 useEffect(() => {
   const loadTunings = async () => {
     const savedTunings = await AsyncStorage.getItem('tunings');
     if (savedTunings) {
       setTunings(JSON.parse(savedTunings));
     }
   };

   loadTunings();
 }, []);

 // Save tunings whenever they change
 useEffect(() => {
   const saveTunings = async () => {
     await AsyncStorage.setItem('tunings', JSON.stringify(tunings));
   };

   saveTunings();
 }, [tunings]);


 const [customTuningName, setCustomTuningName] = useState('');


 const addTuning = () => {
   const newTuning = {
     id: tunings.length + 1,
     name: customTuningName, // Use the custom tuning name
     instrument: selectedInstrument,
     tunings: stringTunings,
   };
   setTunings([...tunings, newTuning]);
   setModalVisible(false);
   resetForm();
 };


 const [isPickerVisible, setIsPickerVisible] = useState(false);

 const resetForm = () => {
   // setSelectedInstrument('6 String Guitar');
   // setStringTunings(Array(6).fill(''));
   setModalVisible(false);
 };

 // Toggle the isEditing state of a tuning
 const toggleEdit = (id) => {
   setTunings(tunings.map(tuning => {
     if (tuning.id === id) {
       return { ...tuning, isEditing: !tuning.isEditing };
     }
     return tuning;
   }));
 };

 // Delete a tuning
 const deleteTuning = (id) => {
   setTunings(tunings.filter(tuning => tuning.id !== id));
 };

 const editTuning = (id) => {
   const tuningToEdit = tunings.find((tuning) => tuning.id === id);
   setCustomTuningName(tuningToEdit.name);
   setSelectedInstrument(tuningToEdit.instrument);
   setStringTunings(tuningToEdit.tunings);
   setIsEditMode(true);
   setTuningToEditId(id);
   setModalVisible(true);
 };

 const addOrUpdateTuning = () => {
   if (isEditMode) {
     // Update an existing tuning
     const updatedTunings
      = tunings.map((tuning) => {
       if (tuning.id === tuningToEditId) {
         return {
           ...tuning,
           name: customTuningName,
           instrument: selectedInstrument,
           tunings: stringTunings,
         };
       }
       
       return tuning;
     });
     setTunings(updatedTunings);
   } else {
     // Add a new tuning
     const newTuning = {
       id: tunings.length + 1,
       name: customTuningName,
       instrument: selectedInstrument,
       tunings: stringTunings,
     };
     setTunings([...tunings, newTuning]);
   }
   setModalVisible(false);
   resetForm();
   setIsEditMode(false);
   setTuningToEditId(null);
   setSelectedInstrument('Guitar 6-string');
   
 };

  const cancelHandle = () => {
   setModalVisible(!modalVisible);
   setIsEditMode(false);
   setStringTunings(Array(6).fill(''));
  }
 const [isEditMode, setIsEditMode] = useState(false);


 const [tuningToEditId, setTuningToEditId] = useState(null);

 const [numStrings, setNumStrings] = useState(6);


 useEffect(() => {
   switch (selectedInstrument) {
     case '6 String Guitar':
       setInstrumentName('Guitar 6-string');
       setNumStrings(6);
       setStringTunings(Array(6).fill(''));
       break;
     case '7 String Guitar':
       setInstrumentName('7 String Guitar');
       setNumStrings(7);
       setStringTunings(Array(7).fill(''));
       break;
     case 'Ukulele Soprano':
       setInstrumentName('Ukulele Soprano');
       setNumStrings(4);
       setStringTunings(Array(4).fill(''));
       break;
     // Add more cases for other instruments
     default:
       setInstrumentName('Guitar 6-string');
       setNumStrings(6);
       setStringTunings(Array(6).fill(''));
   }
 }, [selectedInstrument]);

 const [instrumentName, setInstrumentName] = useState('Guitar 6-string');

return (
 <View style={styles.container}>
   <View style={styles.header}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
       <ArrowLeft color="#de1d35" height={30} width={30} paddingLeft={50} />
     </TouchableOpacity>
     <Text style={styles.title}>Custom Tunings</Text>
     
   </View>
   <View style={styles.inputContainer}>
    
     <TextInput
       style={styles.input}
       placeholder="Enter Tuning name"
       value={customTuningName}
       onChangeText={setCustomTuningName}
     />
     <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
       <Text style={styles.addButtonText}>+</Text>
     </TouchableOpacity>
     <Modal
       animationType="slide"
       transparent={true}
       visible={modalVisible}
       onRequestClose={() => {
         setModalVisible(!modalVisible);
       }}>
       <View style={styles.centeredView}>
         <View style={styles.modalView}>
           {/* <Text style={styles.modalText}>Add New Tuning</Text> */}
           <Text style={styles.modalTuningName}>{customTuningName}</Text>
           <Text style={{ fontWeight: 'bold', marginRight: 10, marginBottom: -60 }}>Choose Instrument:</Text>
           <View style={{ alignSelf: 'stretch', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-', marginBottom: 20 }}>
       
           <View style={styles.pickerContainer}>

           <TouchableOpacity onPress={() => setIsPickerVisible(true)} style={styles.instrumentButton}>
             <Text style={styles.instrumentButtonText}>{selectedInstrument}</Text>
           </TouchableOpacity>

           {isPickerVisible && (
             <Picker
               selectedValue={selectedInstrument}
               style={styles.pickerStyle}
               onValueChange={(itemValue, itemIndex) => {
                 setSelectedInstrument(itemValue);
                 setIsPickerVisible(false); // Close the picker once an item is selected
               }}>
               <Picker.Item label="Guitar 6-string" value="Guitar 6-string" />
               {/* <Picker.Item label="7 String Guitar" value="7 String Guitar" /> */}
               <Picker.Item label="Ukulele Soprano" value="Ukulele Soprano" />
               {/* Add other instruments here */}
             </Picker>
           )}
           </View>
           </View>

         {Array.from({ length: numStrings }, (_, index) => (
 <View key={index} style={styles.stringInputContainer}>
   <Text style={{ marginRight: 5 }}>String {index + 1}:</Text>
   <TextInput
     style={styles.smallInput}
     onChangeText={(text) => {
       const newTunings = [...stringTunings];
       newTunings[index] = text;
       setStringTunings(newTunings);
     }}
     value={stringTunings[index]}
     placeholder="Tuning"
   />
 </View>
))}



<Button title={isEditMode ? 'Update Tuning' : 'Save Tuning'} onPress={addOrUpdateTuning} />
           <Button title="Cancel" onPress={cancelHandle} />
         </View>
       </View>
     </Modal>
   </View>



   {/* <Text style={styles.subTitle}>
     {tunings.length > 0 ? 'Existing Tunings' : 'None'}
   </Text> */}

<Text
  style={tunings.length > 0 ? styles.subTitle : styles.noTuningsText}>
  {tunings.length > 0 ? 'Existing Tunings' : 'Add your custom tunings here!'}
</Text>

<FlatList
 data={tunings}
 keyExtractor={(item) => item.id.toString()}
 renderItem={({ item }) => (
   <View style={styles.listItemContainer}>
     <View style={styles.listItemHeader}>
       <Text style={styles.tuningName}>{item.name}</Text>
       <Text style={styles.instrumentName}>{item.instrument}</Text>
     </View>
     <Text style={styles.tuningSettings}>{item.tunings.join(', ')}</Text>
     <View style={styles.buttonContainer}>
       <TouchableOpacity onPress={() => editTuning(item.id)}>
         <Text style={styles.editButton}>Edit</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => deleteTuning(item.id)}>
         <Text style={styles.deleteButton}>Delete</Text>
       </TouchableOpacity>
     </View>
   </View>
 )}
 style={styles.list}
/>
 </View>
);
}

const styles = StyleSheet.create({
container: {
 flex: 1,
 backgroundColor: '#f0f0f0',
},
header: {
 flexDirection: 'row',
 alignItems: 'center',
 paddingVertical: 20,
 paddingHorizontal: 10,
 backgroundColor: '#fff',
 shadowColor: "#000",
 shadowOffset: {
   width: 0,
   height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 3.84,
 elevation: 5,
 paddingTop: 60,
 paddingBottom: 30,
},
title: {
 fontSize: 24,
 fontWeight: 'bold',
 color: '#0e1c36',
 paddingLeft: 40,
},
stringInputContainer: {
 flexDirection: 'row',
 alignItems: 'center',
 justifyContent: 'space-between',
 paddingVertical: 5,
},

inputContainer: {
 flexDirection: 'row',
 padding: 20,
 backgroundColor: '#fff',
 shadowColor: "#000",
 shadowOffset: {
   width: 0,
   height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 3.84,
 elevation: 5,
},
input: {
 borderWidth: 1,
 borderColor: '#ddd',
 padding: 10,
 marginRight: 10,
 flex: 1,
 borderRadius: 5,
 
},
smallInput: {
 width: 50, // Smaller width for each input
 height: 40, // Smaller height for each input
 margin: 5, // Margin around each input for spacing
 borderWidth: 1, // Border width for the input
 borderColor: '#ddd', // Border color for the input
 textAlign: 'center', // Center text inside the input
 // Add any additional styling for the inputs here
},
addButton: {
 backgroundColor: '#de1d35',
 padding: 10,
 borderRadius: 5,
},
addButtonText: {
 color: '#fff',
 fontSize: 24,
},

subTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#0e1c36',
  paddingLeft: 20,
  paddingTop: 20,
},
noTuningsText: {
  fontSize: 18,
  color: '#0e1c36',
  paddingLeft: 20,
  paddingRight:20,
  paddingTop: 30, // Increased padding to push the text lower
  textAlign: 'center', // Center the text if you like
},
listItem: {
 backgroundColor: '#fff',
 padding: 15,
 marginVertical: 5,
 marginHorizontal: 20,
 borderRadius: 5,
 flexDirection: 'row',
 alignItems: 'center',
 justifyContent: 'space-between',
 shadowColor: "#000",
 shadowOffset: {
   width: 0,
   height: 1,
 },
 shadowOpacity: 0.22,
 shadowRadius: 2.22,
 elevation: 3,
},
tuningName: {
 fontSize: 16,
},
list: {
 marginTop: 10,
},
centeredView: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 marginTop: 22,
},
modalView: {
 width: 300,
 margin: 20,
 backgroundColor: 'white',
 borderRadius: 20,
 padding: 35,
 alignItems: 'center',
 shadowColor: '#000',
 shadowOffset: {
   width: 0,
   height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 4,
 elevation: 5,
 flexDirection: 'column', // Align children horizontally
   alignItems: 'center', // Center children vertically in the container
   flexWrap: 'wrap', // Allow items to wrap to next line if space is insufficient
},
modalText: {
 marginBottom: 15,
 textAlign: 'center',
 fontWeight: 'bold',
},
pickerStyle: {
 height: 50,
 width: 250,
 
},
modalTuningName: {
 fontSize: 20,
 fontWeight: 'bold',
 marginBottom: 10,
},
tuningSettings: {
 fontSize: 14,
 color: '#888',
},
editButton: {
 color: 'blue',
 marginRight: 10,
},
pickerContainer: {
 flex: 1,
 height: 50,

 marginBottom: 100,
},
instrumentButton: {
 borderWidth: 1,
 borderColor: '#ddd',
 padding: 10,
 borderRadius: 5,
 backgroundColor: '#f0f0f0',
 alignItems: 'center',
top: 100,
},

instrumentButtonText: {
 color: '#0e1c36',
},
listItemContainer: {
 backgroundColor: '#fff',
 padding: 15,
 marginVertical: 5,
 marginHorizontal: 20,
 borderRadius: 5,
 shadowColor: '#000',
 shadowOffset: {
   width: 0,
   height: 1,
 },
 shadowOpacity: 0.22,
 shadowRadius: 2.22,
 elevation: 3,
},
listItemHeader: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 marginBottom: 5,
},
tuningName: {
 fontSize: 18,
 fontWeight: 'bold',
},
instrumentName: {
 fontSize: 16,
 color: '#555',
},
tuningSettings: {
 fontSize: 14,
 color: '#888',
 marginBottom: 10,
},
buttonContainer: {
 flexDirection: 'row',
 justifyContent: 'flex-end',
},
editButton: {
 color: 'blue',
 marginRight: 15,
 
},
deleteButton: {
 color: 'red',
},

});

export default CustomTunings;

