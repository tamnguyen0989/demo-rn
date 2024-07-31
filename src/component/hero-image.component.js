import { View, Image, Platform, Text } from "react-native";
import { spacing } from "../utils/spacings";
import { ActivityIndicator } from "react-native-paper";

export const HeroImage = ({ imageData, isLoadingImage }) => {
  return (
    <View
      style={{
        padding: spacing.sm,
        width: 250,
        height: 320,
        maxWidth: Platform.OS === "web" ? "768px" : "unset",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoadingImage ? (
        <ActivityIndicator size={50} />
      ) : imageData?.uri?.length ? (
        <Image
          source={{ uri: imageData.uri }}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <Image
          source={require("../../assets/no-image.jpg")}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </View>
  );
};
