import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/legacy';
import db from '../setup/sqlite.setup';

import { spacing } from '../utils/spacings';
import { styles } from './CameraPhoto.styles';
import { uploadFile } from '../services/storage.service';

export const CameraBarcodeModal = ({
  isShowModal,
  onCloseModal,
  onBarcodeData,
  barcodeData,
}) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = useCameraPermissions();
  const [isTaking, setTaking] = useState(false);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleBarCodeScanned = ({ type, data }) => {
    const newBarcodeData = {
      ...barcodeData,
      uri: data,
    };

    onBarcodeData(newBarcodeData);
    uploadFile(db, newBarcodeData);
    onCloseModal();
  };

  const onBack = () => {
    onCloseModal();
  };

  return (
    <Modal animationType='fade' transparent={true} visible={isShowModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.backWrapper}>
            <Pressable style={{ margin: spacing.md }} onPress={onBack}>
              <AntDesign name='left' size={20} color='black' />
            </Pressable>
          </View>
          <View style={styles.cameraWrapper}>
            {!permission ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>No access to camera</Text>
              </View>
            ) : !permission.granted ? (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', marginBottom: spacing.md }}>
                  We need your permission to show the camera
                </Text>
                <Button mode='elevated' onPress={requestPermission}>
                  Grant permission
                </Button>
              </View>
            ) : (
              <CameraView
                style={styles.camera}
                facing={type}
                onBarcodeScanned={handleBarCodeScanned}
              >
                <View style={styles.buttonContainer}>
                  {isTaking ? (
                    <View style={styles.indicator}>
                      <ActivityIndicator color='white' />
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                      >
                        <MaterialIcons
                          name='flip-camera-android'
                          size={24}
                          color='white'
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </CameraView>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
