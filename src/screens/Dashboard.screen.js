import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { SafeArea } from '../component/safe-area.component';
import { styles } from './Dashboard.styles';
import XAxisChart from '../component/chart.component';
import {
  getClickedNumber,
  updateClickedNumber,
} from '../services/clicked.service';
import { ActivityIndicator, Button } from 'react-native-paper';
import { CameraPhotoModal } from './CameraPhoto.modal';
import { HeroImage } from '../component/hero-image.component';
import { FILE_URL, getFileStorage } from '../services/storage.service';

export const DashboardScreen = ({ navigation, imageUrl }) => {
  const [isLoadingChart, setLoadingChart] = useState(false);
  const [dataChart, setDataChart] = useState([]);
  const [data, setData] = useState({});
  const [imageData, setImageData] = useState('');
  const [isShowModal, setShowModal] = useState(false);
  const [isLoadingImage, setLoadingImage] = useState(false);

  const getVehicle = (label) => {
    setClickedNumber(label);
  };
  const getPerson = (label) => {
    setClickedNumber(label);
  };
  const takePhoto = async (label) => {
    setClickedNumber(label);
    setShowModal(true);
  };
  const scanQRCode = (label) => {
    setClickedNumber(label);
  };
  const signName = (label) => {
    setClickedNumber(label);
  };

  const LABEL = {
    vehicle: 'Vehicle',
    person: 'Person',
    photo: 'Photo',
    scan: 'Scan',
    signature: 'Signature',
  };

  const actionButtons = [
    {
      icon: <FontAwesome name='car' size={15} />,
      label: LABEL.vehicle,
      onPress: () => getVehicle(LABEL.vehicle),
    },
    {
      icon: <FontAwesome name='user' size={15} />,
      label: LABEL.person,
      onPress: () => getPerson(LABEL.person),
    },
    {
      icon: <AntDesign name='camera' size={15} />,
      label: LABEL.photo,
      onPress: () => takePhoto(LABEL.photo),
    },
    {
      icon: <Ionicons name='scan-circle' size={15} />,
      label: LABEL.scan,
      onPress: () => scanQRCode(LABEL.scan),
    },
    {
      icon: <FontAwesome5 name='signature' size={15} />,
      label: LABEL.signature,
      onPress: () => signName(LABEL.signature),
    },
  ];

  const setClickedNumber = async (label) => {
    const newData = { ...data };
    newData[label.toLocaleLowerCase()] += 1;
    await updateClickedNumber(newData);
    setData(newData);
  };

  const renderActionButtons = actionButtons.map(
    ({ icon, label, onPress }, index) => {
      const isFirst = index === 0;
      const isLast = index === actionButtons.length - 1;
      const styleButton = isFirst
        ? styles.buttonWrapperFirst
        : isLast
        ? styles.buttonWrapperLast
        : styles.buttonWrapper;

      return (
        <TouchableOpacity key={label} style={styleButton} onPress={onPress}>
          <Text>{icon}</Text>
          <View>
            <Text style={styles.label}>{label}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  );

  const getDataChart = (clicked) => {
    const result = [];
    actionButtons.forEach(({ label }) => {
      result.push(clicked[label.toLocaleLowerCase()]);
    });
    return result;
  };

  useEffect(() => {
    async function fetchClickedNumber() {
      setLoadingChart(true);
      const clickeds = await getClickedNumber();
      const data = getDataChart(clickeds[0]);
      setDataChart(data);
      setData(clickeds[0]);
      setLoadingChart(false);
    }
    async function fetchFile() {
      setLoadingImage(true);
      const result = await getFileStorage();
      setLoadingImage(false);
      if (result) setImageData(FILE_URL);
    }

    fetchClickedNumber();
    fetchFile();
  }, []);

  useEffect(() => {}, [imageUrl]);

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.logoutButtonWrapper}>
          <Button mode='elevated' onPress={() => navigation.navigate('Login')}>
            Logout
          </Button>
        </View>
        <View style={styles.chartWrapper}>
          {isLoadingChart ? (
            <View style={styles.indicatorChartWrapper}>
              <ActivityIndicator size={50} animating={true} />
            </View>
          ) : (
            <XAxisChart data={dataChart} />
          )}
        </View>
        <View style={styles.buttonsGroup}>{renderActionButtons}</View>
        <HeroImage imageData={imageData} isLoadingImage={isLoadingImage} />
      </View>
      <CameraPhotoModal
        isShowModal={isShowModal}
        onCloseModal={() => setShowModal(false)}
        onImageData={(uri) => setImageData(uri)}
      />
    </SafeArea>
  );
};
