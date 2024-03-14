// export default RideInProgressScreen;
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

import { LatLng, LeafletView, MapMarker } from "react-native-leaflet-view";

const RideInProgressScreen = () => {
  const navigation = useNavigation();
  const handleCompleteRide = () => {
    navigation.navigate("RecievePaymentReviewPassangerScreen");
  };

  const handleCancel = () => {
    navigation.navigate("HomeScreen");
  };
  return (
    <View style={styles.container}>
      <View style={tw`h-1/3`}>
        <LeafletView
          mapCenterPosition={{
            lat: 12.935776615383235,
            lng: 77.60592112615925,
          }}
        />
      </View>

      <View style={tw`h-2/3`}>
        <TouchableOpacity style={styles.button} onPress={handleCompleteRide}>
          <Text style={styles.buttonText}>Complete Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideInProgressScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
    marginHorizontal: 20,

    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  button: {
    backgroundColor: "green",
    padding: 10,
    marginLeft: 6,
    borderRadius: 10,
    // width: width - 40,
    alignItems: "center",
    marginVertical: 10,
    // width: width - 70,
  },
});
