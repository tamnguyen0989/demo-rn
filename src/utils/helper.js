import { Platform } from "react-native";

export function createGuid() {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + s4() + s4() + s4() + s4();
}

export function isMobile() {
  return Platform.OS !== "web";
}

export function getWebSto(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setWebSto(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
