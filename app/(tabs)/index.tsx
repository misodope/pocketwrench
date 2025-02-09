import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import Button from '@/app/components/Button';
import ImageViewer from '@/app/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraPermissionResponse } from 'expo-camera';

const PlaceholderImage = require("@/app/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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

  const takePictureAsync = async () => {
    if (!cameraPermission) {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Camera permission is required to take pictures');
        return;
      }
      setCameraPermission(status === 'granted');
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const recordVideoAsync = async () => {
    if (!cameraPermission) {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Camera permission is required to record video');
        return;
      }
      setCameraPermission(status === 'granted');
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 60,
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage ? <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View> : <View style={styles.welcomeContainer}>
        <Text style={styles.text}>Welcome to Pocket Wrench 🔧</Text>
        <View style={styles.headerButtons}>
          <Pressable
            style={styles.loginButton}
            onPress={() => router.push('/login')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
          <Pressable
            style={[styles.loginButton, styles.mechanicButton]}
            onPress={() => router.push({ pathname: '/login', params: { type: 'mechanic' } })}>
            <Text style={[styles.loginButtonText, styles.mechanicButtonText]}>Mechanic Sign In</Text>
          </Pressable>
        </View>
      </View>}
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose from library" onPress={pickImageAsync} />
        <Button theme="primary" label="Take a picture" onPress={takePictureAsync} />
        <Button theme="primary" label="Record video" onPress={recordVideoAsync} />
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
    flex: 1 / 2,
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: '#fff',
    fontSize: 26,
    margin: 10,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#ffd33d',
    borderRadius: 8,
    padding: 8,
    minWidth: 100,
    alignItems: 'center',
    color: '#000'
  },
  headerButtons: {
    marginTop: 20,
    gap: 8,
    zIndex: 1,
  },
  mechanicButton: {
    backgroundColor: '#2c3e50',
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  mechanicButtonText: {
    color: '#fff',
  }
});
