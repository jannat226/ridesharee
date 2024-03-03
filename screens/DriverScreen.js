import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { useNavigation } from "@react-navigation/native";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const DriverScreen = ({ route }) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
    timestamp: 0,
  });
  const [passengerCount, setPassengerCount] = useState("");
  const { db, userName } = route.params;
  console.log(db, userName);

  useEffect(() => {
    let subscription;

    (async () => {
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5,
          timeInterval: 1000,
        },
        (locationValue) => {
          console.log("location updated", locationValue);
          setLocation({
            latitude: locationValue.coords.latitude,
            longitude: locationValue.coords.longitude,
            timestamp: Timestamp.fromDate(new Date()),
          });
        }
      );
    })();

    // Clean up function to unsubscribe from location updates when the component unmounts
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    console.log(userName, location);
    setDoc(doc(db, "drivers", userName), location);
  }, [location, db]);

  const handleAcceptRide = () => {
    // Perform actions when the driver accepts the ride
    console.log(`Accepted ride with ${passengerCount} passengers`);
    // Add logic to navigate to the next screen or perform other actions

    // Navigating to "CommuterLocation" screen
    navigation.navigate("CommuterLocation", { passengerCount });
  };

  const handleCancelRide = () => {
    Alert.alert("Cancel Ride", "Are you sure you want to cancel the ride?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          // Logic for cancelling the ride
          console.log("Ride cancelled");
          // Show a confirmation pop-up
          Alert.alert("Ride Cancelled", "You have cancelled the ride.");
        },
      },
    ]);
  };

  return (
    <View style={styles.outerContainer}>
      {/* <Text>Here is my Map2Screen...</Text> */}
      <View style={tw`h-1/3`}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            key={1}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={`Passenger`}
          />
        </MapView>
      </View>
      {/* <Map></Map> */}
      <View style={tw`h-2/3`}>
        <View style={tw`h-2/3 p-4`}>
          <Text style={tw`text-xl font-bold mb-2`}>Accept Ride</Text>
          <Text style={tw`text-gray-500 mb-4`}>
            Enter the number of passengers you are willing to accept:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Number of Passengers"
            keyboardType="numeric"
            value={passengerCount}
            onChangeText={(text) => setPassengerCount(text)}
          />
          <Text style={tw`text-gray-500 mb-4`}>Enter your vehicle number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of Passengers"
            keyboardType="numeric"
            value={passengerCount}
            onChangeText={(text) => setPassengerCount(text)}
          />
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAcceptRide}
          >
            <Text style={styles.acceptButtonText}>Accept Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelRide}
          >
            <Text style={styles.cancelButtonText}>Cancel Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DriverScreen;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#d6f5d6",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height - 200,
    height: 200, // Adjust the height as needed
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
