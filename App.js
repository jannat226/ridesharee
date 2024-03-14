import { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";

import { FirebaseProvider } from "./providers/FirebaseProvider";

import HomeScreen from "./screens/HomeScreen";
import TravellerScreen from "./screens/TravellerScreen";
import DriverScreen from "./screens/DriverScreen";
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

const Stack = createNativeStackNavigator();


export default function App() {

  useEffect(() => {
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

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <FirebaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
              />
              <Stack.Screen
                name="Book a Ride"
                component={TravellerScreen}
              />
              <Stack.Screen
                name="Accept a Ride"
                component={DriverScreen}
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
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
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
        </FirebaseProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
