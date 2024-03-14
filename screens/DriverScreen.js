import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../providers/FirebaseProvider";

const options = ["two-wheeler", "four-wheeler"];

const DriverScreen = () => {
  const [location, setLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
    timestamp: 0,
  });
  const [passengerCount, setPassengerCount] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [rideState, setRideState] = useState(0);
  const [vehicleType, setVehicleType] = useState(null);

  const { db } = useContext(FirebaseContext);

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
          setLocation({
            latitude: locationValue.coords.latitude,
            longitude: locationValue.coords.longitude,
            timestamp: Timestamp.fromDate(new Date()),
          });
        }
      );
    })();

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (rideState === 2) {
      setDoc(doc(db, "drivers", userName), {
        ...location,
        state: "accepting",
        passengerCount,
        vehicleNumber,
        vehicleType,
      });
    }
  }, [location, db, rideState]);

  const handleAcceptRide = () => {
    if (!passengerCount || !vehicleNumber || !vehicleType) {
      alert("Please fill in all fields.");
      return;
    }
    setRideState(2);
  };

  const handleCancelRide = () => {
    setRideState(0);
    updateDoc(doc(db, "drivers", userName), {
      ...location,
      state: "not-accepting",
    });
  };

  const placeholder = {
    label: "Select your vehicle type ...",
    value: null,
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={rideState === 2}
        onRequestClose={handleCancelRide}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            <Text style={styles.dialogText}>
              Searching for Passengers... Please Wait
            </Text>
            <TouchableOpacity
              onPress={handleCancelRide}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.outerContainer}>
        <View style={styles.mapContainer}>
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
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Accept Ride</Text>
          <Text style={styles.label}>
            Enter the number of passengers you are willing to accept:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Number of Passengers"
            keyboardType="numeric"
            value={passengerCount}
            onChangeText={(text) => setPassengerCount(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Vehicle Number"
            value={vehicleNumber}
            onChangeText={(text) => setVehicleNumber(text)}
          />
          <SelectDropdown
            data={options}
            onSelect={(selectedItem, index) => setVehicleType(selectedItem)}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            rowTextForSelection={(item, index) => item}
            renderCustomizedButton={({
              selectedItem,
              defaultText,
              onPress,
            }) => (
              <TouchableOpacity style={styles.dropdownButton} onPress={onPress}>
                <Text style={styles.dropdownButtonText}>
                  {selectedItem || defaultText}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button
            title="Accept Ride"
            onPress={handleAcceptRide}
            color="#00ff00"
          />
          <Button
            title="Cancel Ride"
            onPress={handleCancelRide}
            color="#ff0000"
          />
        </View>
      </View>
    </>
  );
};

export default DriverScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#d6f5d6",
  },
  mapContainer: {
    flex: 1,
    height: 250,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownButton: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialogBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  dialogText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
