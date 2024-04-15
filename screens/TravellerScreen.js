import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import NavigateCard from "../components/NavigateCard";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { useNavigation } from "@react-navigation/native";

// distance from the user
const distanceDelta = 500;

const TravellerScreen = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [startLocation, setStartLocation] = useState({});
  const [endLocation, setEndLocation] = useState({});
  const [rideState, setRideState] = useState({
    state: 0,
    message: "",
  });

  const navigation = useNavigation();
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    Location.getCurrentPositionAsync({}).then((res) => {
      console.log(res.coords.latitude, res.coords.longitude);
      setCurrentLocation({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      });
    });
  }, []);

  async function getLatLong(address) {
    const res = await fetch(
      `https://geocode.maps.co/search?q=${address}&api_key=65e2f7671a69c966166250vxha68cf2`
    ).catch((err) => {
      console.log(err);
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data[0];
      return data;
    }
    return null;
  }

  async function getRoute(start, end, vehicleType, timing) {
    const start_coords = await getLatLong(start);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2 seconds
    const end_coords = await getLatLong(end);

    navigation.navigate("Ride Options", {
      start: start_coords,
      end: end_coords,
      current: currentLocation,
      vehicleType: vehicleType,
      timing: timing,
    });
  }

  return (
    <View style={styles.outerContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={
          rideState.state === 2 ||
          rideState.state === 3 ||
          rideState.state === 4
        }
      >
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            {rideState.state === 4 ? (
              <Text style={styles.dialogText}>{rideState.message}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setRideState(() => ({
                  message: "",
                  state: 0,
                }))
              } // Set rideState to 0 to hide the modal
            >
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={tw`h-1/3`}>
        <MapView
          style={styles.map}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {currentLocation.latitude != 0.0 && (
            <Marker
              key={1}
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title={`Start Location`}
            />
          )}

          {startLocation?.latitude && startLocation?.longitude ? (
            <Marker
              key={1}
              coordinate={{
                latitude: startLocation?.latitude,
                longitude: startLocation?.longitude,
              }}
              title={`Start Location`}
            />
          ) : null}

          {endLocation?.latitude && endLocation?.longitude ? (
            <Marker
              key={2}
              coordinate={{
                latitude: endLocation?.latitude,
                longitude: endLocation?.longitude,
              }}
              title={`End Location`}
            />
          ) : null}
        </MapView>
      </View>

      <View style={tw`h-2/3`}>
        <NavigateCard getRoute={getRoute} />
      </View>
    </View>
  );
};

export default TravellerScreen;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#d6f5d6",
  },
  text: { alignSelf: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialogBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  dialogText: {
    color: "#000",
    fontSize: 18,
  },
  buttonText: {
    color: "red",
    fontWeight: "bold",
  },
});
