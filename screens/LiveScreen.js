import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LeafletView } from "react-native-leaflet-view";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const LiveScreen = () => {

  const selectedData = {
    id: "Car-123",
    location: "CarX",
    passengers: 4,
    time: 20,
    charges: 250,
  };

  const navigation = useNavigation();

  const handleRideOptionSelect = () => {
    // For simplicity, navigate to PaymentScreen with a placeholder QR code
    navigation.navigate("PaymentScreen", { qrCode: "RANDOM_QR_CODE" });
  };

  return (
    <View style={tw`flex-1 p-4`}>
      {/* Map Section */}
      <View style={tw`h-1/3 mb-4`}>
        <LeafletView
          mapCenterPosition={{
            lat: 12.935776615383235,
            lng: 77.60592112615925,
          }}
        />
      </View>

      <View style={tw`bg-white p-4 rounded-md shadow-md mb-4`}>
        <Text style={tw`text-xl font-bold mb-2`}>Vehicle Details</Text>
        <Text style={tw`text-gray-500`}>Vehicle Number: {selectedData.id}</Text>
        <Text style={tw`text-gray-500`}>Location: {selectedData.location}</Text>
        <Text style={tw`text-gray-500`}>
          Passengers: {selectedData.passengers}
        </Text>
        <Text style={tw`text-gray-500`}>Time: {selectedData.time} mins</Text>
        <Text style={tw`text-gray-500`}>Charges: {selectedData.charges}rs</Text>
      </View>

      {/* Ride Option Section */}
      <View style={tw`bg-white p-4 rounded-md  `}>
        {/* <Text style={tw`text-xl font-bold `}>Ride Complete </Text> */}
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => navigation.navigate("PaymentScreen")}
        >
          <Text style={styles.buttonText}>Ride Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LiveScreen;

const styles = StyleSheet.create({
  paymentButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    // width: width - 40,
    alignItems: "center",
    marginVertical: 10,
    // width: width - 70,
    marginLeft: 6,
  },
});
