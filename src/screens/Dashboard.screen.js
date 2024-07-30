import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { SafeArea } from "../component/safe-area.component";
import { styles } from "./Dashboard.styles";
import XAxisChart from "../component/chart.component";
import {
  getClickedNumber,
  initData,
  updateClickedNumber,
} from "../services/clicked.service";
import { ActivityIndicator, Button } from "react-native-paper";
import { CameraPhotoModal } from "./CameraPhoto.modal";
import { HeroImage } from "../component/hero-image.component";
import { getFiles } from "../services/storage.service";
import * as SQLite from "expo-sqlite";
import { AppDataSource } from "../typeorm/data-source";
import { User } from "../typeorm/entity/User";
import { getDataSource } from "../typeorm/index";
import { Clicked } from "../typeorm/entity/Clicked";

export const DashboardScreen = ({ navigation, imageUrl }) => {
  const [isLoadingChart, setLoadingChart] = useState(false);
  const [dataChart, setDataChart] = useState([]);
  const [data, setData] = useState({});
  const [imageData, setImageData] = useState("");
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
    vehicle: "Vehicle",
    person: "Person",
    photo: "Photo",
    scan: "Scan",
    signature: "Signature",
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

  const setClickedNumber = (label) => {
    const newData = { ...data };
    newData[label.toLocaleLowerCase()] += 1;
    setData(newData);
    updateClickedNumber(newData);
    const newDataChard = getDataChart(newData);
    setDataChart(newDataChard);
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
    // function onGetClickedNumber(clickeds) {
    //   const data = getDataChart(clickeds[0]);
    //   setDataChart(data);
    //   setData(clickeds[0]);
    // }
    // function onGetfiles(files) {
    //   if (files.length) setImageData(files[0]);
    // }
    // initData(db);
    // setLoadingChart(true);
    // getClickedNumber(db, onGetClickedNumber);
    // setLoadingChart(false);
    // setLoadingImage(true);
    // getFiles(db, onGetfiles);
    // setLoadingImage(false);
    // return () => {
    //   db.closeSync();
    // };

    async function getClickeds() {
      setLoadingChart(true);
      const clickeds = await getClickedNumber();
      const data = getDataChart(clickeds[0]);
      setDataChart(data);
      setData(clickeds[0]);
      setLoadingChart(false);
    }

    getClickeds();
  }, []);

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.logoutButtonWrapper}>
          <Button mode='elevated' onPress={() => navigation.navigate("Login")}>
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
        imageData={imageData}
        onCloseModal={() => setShowModal(false)}
        onImageData={(newImageData) => setImageData(newImageData)}
      />
    </SafeArea>
  );
};
