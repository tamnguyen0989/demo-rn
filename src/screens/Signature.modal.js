import { useRef, useState } from 'react';
import { View, Pressable, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SignatureScreen from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';

import { spacing } from '../utils/spacings';
import { styles } from './Signature.styles';
import { uploadFile } from '../services/storage.service';
import { createGuid } from '../utils/helper';

export const SignatureModal = ({
  isShowModal,
  onCloseModal,
  onImageData,
  imageData,
  db,
}) => {
  const ref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    const uid = createGuid();
    const path = `${FileSystem.cacheDirectory}sign.png?v=${uid}`;
    FileSystem.writeAsStringAsync(
      path,
      signature.replace('data:image/png;base64,', ''),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(() => {
        FileSystem.getInfoAsync(path);
      })
      .then((data) => {
        const newImageData = {
          ...imageData,
          uri: path,
        };
        uploadFile(db, newImageData);
        onImageData(newImageData);
        onCloseModal();
      })
      .catch(console.error);

    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {};

  // Called after ref.current.clearSignature()
  const handleClear = () => {};

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
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
            <SignatureScreen
              ref={ref}
              onEnd={handleEnd}
              onOK={handleOK}
              onEmpty={handleEmpty}
              onClear={handleClear}
              onGetData={handleData}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
