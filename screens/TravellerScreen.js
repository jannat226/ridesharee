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
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState({ latitude: 0.0, longitude: 0.0 });
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
      console.log(res.coords.latitude);
      setLocation({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
      });
    });
  }, []);

  async function getNearbyDrivers() {
    console.log("reached here");

    if (startLocation != null && endLocation != null) {
      const driversRef = collection(db, "drivers");
      const new_lat_greater = addMetersToLatitude(
        startLocation.latitude,
        distanceDelta
      );
      const new_lat_smaller = addMetersToLatitude(
        startLocation.latitude,
        -1 * distanceDelta
      );

      const q = query(
        driversRef,
        where("latitude", "<", new_lat_greater),
        where("latitude", ">", new_lat_smaller),
        limit(1)
      );
      console.log(
        "new_lat_smaller,new_lat_greater",
        new_lat_smaller,
        new_lat_greater
      );
      const querySnapshot = await getDocs(q);
      // TODO: hide prompt

      console.log("reached here in traveller screen after query");
      console.log("Empty: ", querySnapshot.empty);
      if (querySnapshot.empty) {
        //TODO: show prompt that drivers not available
        setRideState({
          state: 4,
          message: "No Drivers Found",
        });
      } else {
        console.log("Empty: ", querySnapshot.empty);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().vehicleNumber);
          setRideState({
            state: 4,
            message: `Driver found:${doc.data().vehicleNumber}`,
          });
        });
      }
    }
  }

  function addMetersToLatitude(latitude, meters) {
    // One degree of latitude is approximately 111,320 meters
    const metersPerDegree = 111320;

    // Calculate the change in latitude (in degrees)
    const deltaLatitude = meters / metersPerDegree;

    // Add the change in latitude to the original latitude
    const newLatitude = latitude + deltaLatitude;

    return newLatitude;
  }

  useEffect(() => {
    if (rideState.state === 3) getNearbyDrivers();
  }, [rideState]);

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
    console.log("Called getRoute 4 args", start, end);
    const start_coords = await getLatLong(start);
    // wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const end_coords = await getLatLong(end);

    navigation.navigate("Ride Options", {
      start: start_coords,
      end: end_coords,
      vehicleType: vehicleType,
      timing: timing,
    });
  }

  async function getRoutex(start, end) {
    console.log("Called getRoute 2 args");
    if (start == null || end == null) return;
    setRideState(() => ({
      message: "Searching for nearby Drivers... Please Wait",
      state: 2,
    }));

    const start_loc = await getLatLong(start);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // delay for rate limiting
    const end_loc = await getLatLong(end);

    if (start_loc == null) {
      setStartLocation(null);
    } else {
      setStartLocation({
        latitude: parseFloat(start_loc.lat),
        longitude: parseFloat(start_loc.lon),
      });
    }
    if (end_loc == null) {
      setEndLocation(null);
    } else {
      setEndLocation({
        latitude: parseFloat(end_loc.lat),
        longitude: parseFloat(end_loc.lon),
      });
    }
    // query database to acquire drivers nearby
    setRideState((prev) => ({
      ...prev,
      state: 3,
    }));
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
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {location.latitude != 0.0 && (
            <Marker
              key={1}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
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
