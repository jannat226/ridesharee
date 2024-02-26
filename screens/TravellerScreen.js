import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
// import { LatLng, LeafletView, MapMarker } from "react-native-leaflet-view";
import NavigateCard from "../components/NavigateCard";
import MapView, { Marker } from "react-native-maps";
// import { MapMarker } from "react-native-maps";
import * as Location from "expo-location";

const TravellerScreen = () => {
  const [location, setLocation] = useState({ latitude: 0.0, longitude: 0.0 });

  useEffect(() => {
    (async () => {
      const locationValue = await Location.getCurrentPositionAsync({});
      // setLocation(locationValue);
      console.log(locationValue);
      setLocation({
        latitude: locationValue.coords.latitude,
        longitude: locationValue.coords.longitude,
      });
    })();
  }, []);

  // console.log(locationValue);

  return (
    <View style={styles.outerContainer}>
      {/* <Text>Here is my MapScreen...</Text> */}
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
        <NavigateCard />
      </View>
    </View>
  );
};

export default TravellerScreen;

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
