import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { CenterAlign } from 'iconoir-react-native';
const Guide = () => {

const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
      <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeftIcon size={24} color="#0e1c36" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Manual</Text>
        
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.sectionText}>
          The Auto Guitar Tuner is a cutting-edge mobile app designed to make tuning your guitar a breeze. With its advanced audio processing capabilities, this app can accurately detect the pitch of each string and guide you through the tuning process with visual and auditory feedback.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Getting Started</Text>
        <Text style={styles.sectionText}>
          1. Launch the Auto Guitar Tuner app on your mobile device.
        </Text>
        <Text style={styles.sectionText}>
          2. Grant the app permission to access your device's microphone when prompted.
        </Text>
        <Image
          source={require('../assets/images/home-page-app.jpg')}
          style={styles.image}
        />
        <Text style={styles.sectionText}>
          3. The app will display the tuner interface, showing the target pitch and the current pitch of the string you're tuning.
        </Text>
      </View>

      {/* Add more sections as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 58,
    alignContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
    marginVertical: 16,
  },
});

export default Guide;