import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  Modal,
  TouchableNativeFeedback,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
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
  const [passengerCount, setPassengerCount] = useState(0);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [rideState, setRideState] = useState(0);
  const [vehicleType, setVehicleType] = useState(null);

  const { db, userName } = route.params;

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
          console.log("vehicleType: ", vehicleType);
          setLocation({
            latitude: locationValue.coords.latitude,
            longitude: locationValue.coords.longitude,
            timestamp: Timestamp.fromDate(new Date()),
            passengerCount,
            vehicleNumber,
            vehicleType,
          });
        }
      );
    })();

    // Clean up function to unsubscribe from location updates when the component unmounts
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (rideState == 2)
      setDoc(doc(db, "drivers", userName), { ...location, state: "accepting" });
  }, [location, db, rideState]);

  const handleAcceptRide = () => {
    // TODO: Validation logic

    setRideState(2);
  };

  const handleCancelRide = () => {
    setRideState(0);
    setDoc(doc(db, "drivers", userName), {
      ...location,
      state: "not-accepting",
    });
  };

  const placeholder = {
    label: "Select an option...",
    value: null,
  };

  const options = [
    { label: "2-wheeler", value: "2-wheeler" },
    { label: "4-wheeler", value: "4-wheeler" },
  ];
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={rideState == 2}
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
            <TextInput
              style={styles.input}
              placeholder="Enter Your Vehicle Number"
              value={vehicleNumber}
              onChangeText={(text) => setVehicleNumber(text)}
            />
            <View>
              <Text>Select your vehicle type:</Text>
              <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => setVehicleType(value)}
                value={vehicleType}
                style={{
                  inputIOS: {
                    fontSize: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 4,
                    color: "black",
                    paddingRight: 30, // to ensure the text is never behind the icon
                  },
                  inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderWidth: 0.5,
                    borderColor: "purple",
                    borderRadius: 8,
                    color: "black",
                    paddingRight: 30, // to ensure the text is never behind the icon
                  },
                }}
              />

              {/* {selectedValue && <Text>Selected : {selectedValue}</Text>} */}
            </View>

            <Button
              title="Accept Ride"
              onPress={handleAcceptRide}
              color="#00ff00"
              style={styles.acceptButton}
            />

            <Button
              title="Cancel Ride"
              onPress={handleCancelRide}
              color="#ff0000"
              style={styles.cancelButton}
            />

            {/* <View style={styles.container}>
            <TouchableNativeFeedback
              onPress={() => {}}
              background={TouchableNativeFeedback.Ripple("grey", false)}
            >
              <View style={styles.touchable}>
                <Text style={styles.text}>TouchableNativeFeedback</Text>
              </View>
            </TouchableNativeFeedback>
          </View> */}
          </View>
        </View>
      </View>
    </>
  );
};

export default DriverScreen;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#d6f5d6",
  },

  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
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
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
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
  input: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: StatusBar.currentHeight,
    height: 100,
    backgroundColor: "#ecf0f1",
    padding: 10,
    margin: 10,
  },
  touchable: { flex: 1, borderColor: "black", borderWidth: 1 },
  text: { alignSelf: "center" },
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
});
