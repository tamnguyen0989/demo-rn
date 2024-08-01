import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { SafeArea } from "../component/safe-area.component";
import { styles } from "./Dashboard.styles";
import XAxisChart from "../component/chart.component";
import {
  getClickedNumber,
  updateClickedNumber,
} from "../services/clicked.service";
import { ActivityIndicator, Button } from "react-native-paper";
import db from "../setup/sqlite.setup";

import { CameraPhotoModal } from "./CameraPhoto.modal";
import { HeroImage } from "../component/hero-image.component";
import { getBarcodeData, getFiles } from "../services/storage.service";
import { BarCodeContent } from "../component/bar-code-content.component";
import { CameraBarcodeModal } from "./CameraBarcode.modal";
import { SignatureModal } from "./Signature.modal";

export const DashboardScreen = ({ navigation, imageUrl }) => {
  const [isLoadingChart, setLoadingChart] = useState(false);
  const [dataChart, setDataChart] = useState([]);
  const [data, setData] = useState({});
  const [imageData, setImageData] = useState({
    id: 1,
    uri: "",
  });
  const [isShowModal, setShowModal] = useState(false);
  const [isLoadingImage, setLoadingImage] = useState(false);
  const [isShowModalBarcode, setShowModalBarcode] = useState(false);
  const [barcodeData, setBarcodeData] = useState({
    id: 2,
    uri: "",
  });
  const [isLoadingBarcode, setLoadingBarcodeImage] = useState(false);
  const [isShowModalSignature, setShowModalSignature] = useState(false);

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
    setShowModalBarcode(true);
  };
  const signName = (label) => {
    setClickedNumber(label);
    setShowModalSignature(true);
  };

  const LABEL = {
    vehicle: "Vehicle",
    person: "Person",
    photo: "Photo",
    scan: "Scan",
    signature: "Signature",
  };

  const actionButtons = [
    {
      icon: <FontAwesome name='car' size={20} />,
      label: LABEL.vehicle,
      onPress: () => getVehicle(LABEL.vehicle),
    },
    {
      icon: <FontAwesome name='user' size={20} />,
      label: LABEL.person,
      onPress: () => getPerson(LABEL.person),
    },
    {
      icon: <AntDesign name='camera' size={20} />,
      label: LABEL.photo,
      onPress: () => takePhoto(LABEL.photo),
    },
    {
      icon: <Ionicons name='scan-circle' size={20} />,
      label: LABEL.scan,
      onPress: () => scanQRCode(LABEL.scan),
    },
    {
      icon: <FontAwesome5 name='signature' size={20} />,
      label: LABEL.signature,
      onPress: () => signName(LABEL.signature),
    },
  ];

  const setClickedNumber = async (label) => {
    const newData = { ...data };
    newData[label.toLocaleLowerCase()] += 1;
    setData(newData);
    const newDataChard = getDataChart(newData);
    setDataChart(newDataChard);
    await updateClickedNumber(db, newData);
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
    async function onGetClickedNumber() {
      setLoadingChart(true);
      const clickeds = await getClickedNumber(db);
      setLoadingChart(false);
      const data = getDataChart(clickeds[0]);
      setDataChart(data);
      setData(clickeds[0]);
    }
    async function onGetfiles() {
      setLoadingImage(true);
      const files = await getFiles(db);
      setLoadingImage(false);
      if (files.length) setImageData(files[0]);
    }
    async function onGetBarcodes() {
      setLoadingBarcodeImage(true);
      const barcodes = await getBarcodeData(db);
      setLoadingBarcodeImage(false);
      if (barcodes.length) setBarcodeData(barcodes[0]);
    }

    onGetClickedNumber();
    onGetfiles();
    onGetBarcodes();
  }, []);

  return (
    <SafeArea>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoutButtonWrapper}>
            <Button
              mode='elevated'
              onPress={() => navigation.navigate("Login")}
            >
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
          <HeroImage imageData={imageData} isLoadingImage={isLoadingImage} />
          <BarCodeContent
            barcodeData={barcodeData}
            isLoadingBarcode={isLoadingBarcode}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonGroupWrapper}>
        <View style={styles.buttonsGroup}>{renderActionButtons}</View>
      </View>
      <CameraPhotoModal
        isShowModal={isShowModal}
        imageData={imageData}
        onCloseModal={() => setShowModal(false)}
        onImageData={(newImageData) => setImageData(newImageData)}
      />
      <CameraBarcodeModal
        isShowModal={isShowModalBarcode}
        barcodeData={barcodeData}
        onCloseModal={() => setShowModalBarcode(false)}
        onBarcodeData={(newBarcodeData) => setBarcodeData(newBarcodeData)}
      />
      <SignatureModal
        isShowModal={isShowModalSignature}
        imageData={imageData}
        onCloseModal={() => setShowModalSignature(false)}
        onImageData={(newImageData) => setImageData(newImageData)}
      />
    </SafeArea>
  );
};
