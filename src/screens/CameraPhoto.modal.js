import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  Platform,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { Camera, CameraType } from "expo-camera/legacy";
import { manipulateAsync } from "expo-image-manipulator";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { spacing } from "../utils/spacings";
import { uploadFile } from "../services/storage.service";
import { styles } from "./CameraPhoto.styles";
import db from "../setup/sqlite.setup";

export const CameraPhotoModal = ({
  isShowModal,
  onCloseModal,
  onImageData,
  imageData,
}) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [isTaking, setTaking] = useState(false);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (camera) {
      setTaking(true);
      const data = await camera.takePictureAsync({
        quality: 0.5,
      });
      const { uri } = await manipulateAsync(
        data.uri,
        [{ resize: { width: 1024 } }],
        { compress: 0.7 }
      );
      const newImageData = {
        ...imageData,
        uri,
      };

      await uploadFile(db, newImageData);
      setTaking(false);
      onImageData(newImageData);
      onCloseModal();
    }
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
            {!permission || Platform.OS === "web" ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>No access to camera</Text>
              </View>
            ) : !permission.granted ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: "center", marginBottom: spacing.md }}>
                  We need your permission to show the camera
                </Text>
                <Button mode='elevated' onPress={requestPermission}>
                  Grant permission
                </Button>
              </View>
            ) : (
              <Camera
                style={styles.camera}
                type={type}
                ref={(ref) => setCamera(ref)}
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
                      <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                      >
                        <AntDesign name='camera' size={24} color='white' />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </Camera>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
