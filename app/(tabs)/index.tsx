import { View, StyleSheet, Text } from 'react-native';
import { useState } from 'react';

import Button from '@/app/components/Button';
import ImageViewer from '@/app/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require("@/app/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage ? <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View> : <View style={styles.welcomeContainer}>
        <Text style={styles.text}>Welcome to Pocket Wrench 🔧</Text>
        <Text style={{
          color: 'white',
          textAlign: 'center',
        }}>What do you need help with?</Text>
      </View>}
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Show us your problem" onPress={pickImageAsync} />
        {/* <Button label="Use this photo" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  welcomeContainer: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    margin: 10,
  }
});
