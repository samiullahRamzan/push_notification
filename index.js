// import messaging from "@react-native-firebase/messaging";
import { registerRootComponent } from "expo";
import App from "./App";

// messaging.setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Background message received:", remoteMessage);
//   // You can show notifications here or update state
// });

registerRootComponent(App);
