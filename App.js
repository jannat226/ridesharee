import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import * as Location from "expo-location";

import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TravellerScreen from "./screens/TravellerScreen";
import DriverScreen from "./screens/DriverScreen";
import { KeyboardAvoidingView } from "react-native";
import RideOptionsCard from "./screens/RideOptionsCard";
import RideOptionsCardTwo from "./screens/RideOptionsCardTwo";
import NavigateCard from "./components/NavigateCard";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import CommuterLocation from "./screens/CommuterLocation";
import RideInProgressScreen from "./screens/RideInProgressScreen";
import LiveScreen from "./screens/LiveScreen";
import PaymentScreen from "./screens/PaymentScreen";
import RecievePaymentReviewPassangerScreen from "./screens/RecievePaymentReviewPassangerScreen";
import DoPaymentReviewRiderScreen from "./screens/DoPaymentReviewRiderScreen";
import ReviewScreen from "./screens/ReviewScreen";
import ThanksScreen from "./screens/ThanksScreen";
import { db } from "./config/firebaseConfig";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

const auth = getAuth();

export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("asking for permmission");
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        Alert.alert("Permission to access location was denied");
        return;
      } else {
        console.log("Permission granted");
      }
    })();
  }, []);

  // splashscreen styling
  if (user === undefined) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ title: "Welcome" }}
              />
              <Stack.Screen
                name="MapScreen"
                component={TravellerScreen}
                initialParams={{ db: db, userName: user?.email }}
              />
              <Stack.Screen
                name="Map2Screen"
                component={DriverScreen}
                initialParams={{ db: db, userName: user?.email }}
              />
              <Stack.Screen
                name="RideOptionsCard"
                component={RideOptionsCard}
              />
              <Stack.Screen
                name="RideOptionsCardTwo"
                component={RideOptionsCardTwo}
              />
              <Stack.Screen name="NavigateCard" component={NavigateCard} />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                initialParams={{ auth }}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                initialParams={{ auth }}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
              <Stack.Screen
                name="CommuterLocation"
                component={CommuterLocation}
              />
              <Stack.Screen name="LiveScreen" component={LiveScreen} />
              <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
              <Stack.Screen
                name="RideInProgressScreen"
                component={RideInProgressScreen}
              />
              <Stack.Screen
                name="RecievePaymentReviewPassangerScreen"
                component={RecievePaymentReviewPassangerScreen}
              />
              <Stack.Screen
                name="DoPaymentReviewRiderScreen"
                component={DoPaymentReviewRiderScreen}
              />
              <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
              <Stack.Screen name="ThanksScreen" component={ThanksScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
}
