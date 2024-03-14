// // CommuterLocation.js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const CommuterLocation = ({ route }) => {
  const { passengerCount } = route.params;
  const passengers = Array.from({ length: parseInt(passengerCount) });
  const navigation = useNavigation();

  const handleStartRide = () => {
    navigation.navigate("RideInProgressScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commuter Location</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 12.935776615383235,
            longitude: 77.60592112615925,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {passengers.map((_, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: 12.935776615383235 + index * 0.01,
                longitude: 77.60592112615925 + index * 0.01,
              }}
              title={`Passenger ${index + 1}`}
            />
          ))}
        </MapView>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleStartRide}>
        <Text style={styles.buttonText}>Start Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CommuterLocation;
