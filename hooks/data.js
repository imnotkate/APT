// import { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const getAllCustomTunings = async () => {

//   const [tunings, setTunings] = useState([]);
//   try {
//     const savedTunings = await AsyncStorage.getItem('tunings');
//     setTunings(savedTunings);
//     console.log('Tunings:', savedTunings);
//     return savedTunings;
//   } catch (e) {
//     console.error('Failed to fetch tunings:', e);
//     return [];
//   }
// };

// console.log('getAllCustomTunings:', getAllCustomTunings());

// export default getAllCustomTunings;