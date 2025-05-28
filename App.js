//import liraries
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

// create a component
const App = () => {
  console.log("Platform version", Platform.Version);
  async function requestUserPermission() {
    if (Platform.OS === "ios") {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    } else if (Platform.OS === "android") {
      if (Platform.Version >= 33) {
        // Android 13+ notification permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      } else {
        // For Android < 13, permissions are granted at install time
        console.log(
          "Notification permission granted by default on Android < 13"
        );
      }
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log("here is token= ", token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Here is my first App</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default App;
