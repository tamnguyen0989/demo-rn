import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  Platform,
  StyleSheet,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { CameraType } from "expo-camera/legacy";

import { spacing } from "../utils/spacings";
import { styles } from "./Signature.styles";

export const SignatureModal = ({
  isShowModal,
  onCloseModal,
  onBarcodeData,
  barcodeData,
  db,
}) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = useCameraPermissions();
  const [isTaking, setTaking] = useState(false);

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
            <View style={styles.camera}>
              <Text>SignatureModal</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
