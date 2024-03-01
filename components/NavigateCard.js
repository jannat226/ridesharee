import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import NavFavourites from "./NavFavourites";
import { useNavigation } from "@react-navigation/native"; // import
// import { OpenStreetMapProvider } from "leaflet-geosearch";

const NavigateCard = () => {
  const [search, setSearch] = useState("Hello");
  const navigation = useNavigation();
  // setup
  // const provider = new OpenStreetMapProvider();

  // search
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View stye={styles.outerContainer}>
        <Text style={tw`text-center py-5`}>Greetings User!</Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <GooglePlacesAutocomplete
              placeholder="From?"
              styles={toInputBoxStyles}
              nearbyPlacesAPI="GooglePlacesSearch"

              // debounce={400}
            />
            <GooglePlacesAutocomplete
              placeholder="Where to ?"
              styles={toInputBoxStyles}
              nearbyPlacesAPI="GooglePlacesSearch"

              // debounce={400}
            />
            <TextInput
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
            />
          </View>
          <NavFavourites />
        </View>
        <View
          style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
        >
          <TouchableOpacity
            //   onPress={() => navigation.navigate("LoginScreen")}
            onPress={() => navigation.navigate("RideOptionsCard")}
            //   onPress={() => navigation.navigate("SignupScreen")}
            style={tw`flex flex-row  justify-center bg-black px-4 py-3 rounded-full`}
          >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>4-wheeler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //   onPress={() => navigation.navigate("RideOptionsCard")}
            onPress={() => navigation.navigate("RideOptionsCardTwo")}
            style={tw`flex flex-row bg-black  px-4 py-3 rounded-full`}
          >
            <Icon name="bicycle" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>2-wheeler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    // <View>
    //   <Text>NavigateCard</Text>
    // </View>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});
const toInputBoxStyles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#d6f5d6",
  },
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
