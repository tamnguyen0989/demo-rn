import { Text } from "react-native";

import { colors } from "../utils/colors";
import { fontWeights, fontSizes } from "../utils/fonts";

const defaultTextStyles = {
  fontWeight: `${fontWeights.regular}`,
  color: colors.text.primary,
  flexWrap: "wrap",
  marginTop: 0,
  marginBottom: 0,
};

const body = { fontSize: `${fontSizes.body}` };
const hint = { fontSize: `${fontSizes.body}` };
const error = { color: `${colors.text.error}` };

const caption = {
  fontSize: `${fontSizes.caption}`,
  fontWeight: `${fontWeights.bold}`,
};

const label = {
  fontSize: `${fontSizes.body}`,
  fontWeight: `${fontWeights.medium}`,
};

const variants = {
  body,
  label,
  caption,
  error,
  hint,
};

export const Typography = ({ variant, children }) => {
  const value = variants[variant];
  return <Text style={{ ...value }}>{children}</Text>;
};
