import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera/legacy';
import { manipulateAsync } from 'expo-image-manipulator';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { SafeArea } from '../component/safe-area.component';
import { spacing } from '../utils/spacings';
import { uploadFileStorage } from '../services/storage.service';

export const CameraPhotoScreen = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 0.5,
      });
      const { uri } = await manipulateAsync(
        data.uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.7 }
      );
      const imageUrl = await uploadFileStorage(uri);
      navigation.navigate('DashboardScreen', imageUrl);
    }
  };

  const onBack = () => {
    navigation.goBack(null);
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Button mode='elevated' onPress={onBack}>
            Back
          </Button>
        </View>
        <View style={styles.cameraWrapper}>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCamera(ref)}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                {/* <Text style={styles.text}>Flip</Text> */}
                <MaterialIcons
                  name='flip-camera-android'
                  size={24}
                  color='white'
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                {/* <Text style={styles.text}>Take</Text> */}
                <AntDesign name='camera' size={24} color='white' />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      </View>
    </SafeArea>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: spacing.sm,
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 0.6,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
