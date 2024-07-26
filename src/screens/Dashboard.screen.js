import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { SafeArea } from "../component/safe-area.component";
import { styles } from "./Dashboard.styles";
import XAxisChart from "../component/chart.component";
import { getClickedNumber } from "../services/clicked.service";
import { ActivityIndicator } from "react-native-paper";

export const DashboardScreen = () => {
  const [isLoadingChart, setLoadingChart] = useState(false);
  const [dataChart, setDataChart] = useState([]);

  const getVehicle = () => {
    console.log("getVehicle");
  };
  const getPerson = () => {
    console.log("getPerson");
  };
  const takePhoto = () => {
    console.log("takePhoto");
  };
  const scanQRCode = () => {
    console.log("scanQRCode");
  };
  const signName = () => {
    console.log("signName");
  };

  const actionButtons = [
    {
      icon: <FontAwesome name='car' size={15} />,
      label: "Vehicle",
      onPress: () => getVehicle(),
    },
    {
      icon: <FontAwesome name='user' size={15} />,
      label: "Person",
      onPress: () => getPerson(),
    },
    {
      icon: <AntDesign name='camera' size={15} />,
      label: "Photo",
      onPress: () => takePhoto(),
    },
    {
      icon: <Ionicons name='scan-circle' size={15} />,
      label: "Scan",
      onPress: () => scanQRCode(),
    },
    {
      icon: <FontAwesome5 name='signature' size={15} />,
      label: "Signature",
      onPress: () => signName(),
    },
  ];

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

  // useEffect(async () => {
  //   const clickeds = await getClickedNumber();
  //   console.log(clickeds);
  // }, []);

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
      setLoadingChart(false);
    }

    fetchClickedNumber();
  }, []);

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          {isLoadingChart ? (
            <View
              style={{
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={50} animating={true} />
            </View>
          ) : (
            <XAxisChart data={dataChart} />
          )}
        </View>
        <View style={styles.buttonsGroup}>{renderActionButtons}</View>
      </View>
    </SafeArea>
  );
};
