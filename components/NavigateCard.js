import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import NavFavourites from "./NavFavourites";
import { useNavigation } from "@react-navigation/native";

const NavigateCard = ({ setStartLocation, setEndLocation }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const navigation = useNavigation();

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const handleInputChange2 = (text) => {
    setInputValue2(text);
  };

  const AvailableOptions = ({ options, onSelect, filterValue }) => {
    const res =
      filterValue === ""
        ? []
        : options
            .filter(
              (option) =>
                option.toLowerCase() != filterValue.toLowerCase() &&
                option.toLowerCase().includes(filterValue.toLowerCase())
            )
            .slice(0, 5);
    return (
      <FlatList
        data={res}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Text style={styles.option}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(_item, index) => index.toString()}
      />
    );
  };

  async function getLatLong(address) {
    const res = await fetch(
      `https://geocode.maps.co/search?q=${address}&api_key=65e2f7671a69c966166250vxha68cf2`
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data[0];
      return data;
    }
    return null;
  }

  async function getRoute(start, end) {
    const start_loc = await getLatLong(start);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // delay for rate limiting
    const end_loc = await getLatLong(end);

    if (start_loc == null || end_loc == null) return;

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
  }

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={styles.container}>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Location..."
              value={inputValue}
              onChangeText={handleInputChange}
            />
            <AvailableOptions
              options={locations}
              filterValue={inputValue}
              onSelect={setInputValue}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Destination..."
              value={inputValue2}
              onChangeText={handleInputChange2}
            />

            <AvailableOptions
              options={locations}
              filterValue={inputValue2}
              onSelect={setInputValue2}
            />
            <Button
              title="Click me"
              onPress={() => getRoute(inputValue, inputValue2)}
            />
          </View>
          <NavFavourites />
        </View>
        <View
          style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("RideOptionsCard")}
            style={tw`flex flex-row justify-center bg-black px-4 py-3 rounded-full`}
          >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>4-wheeler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("RideOptionsCardTwo")}
            style={tw`flex flex-row bg-black px-4 py-3 rounded-full`}
          >
            <Icon name="bicycle" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>2-wheeler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  option: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

const locations = [
  "BTM LAYOUT",
  "JAYANAGAR",
  "SHANTI NAGAR",
  "ADUGODI",
  "KORAMANGALA",
  "HSR LAYOUT",
  "INDIRANAGAR",
  "MAJESTIC",
  "J C NAGAR",
  "LINGARAJAPURAM",
  "KALYAN NAGAR",
  "BANASWADI",
  "RAMAMURTHY NAGAR",
  "K R PURAM",
  "MAHADEVPURA",
  "MARATHAHALLI",
  "EJIPURA",
  "DOMLUR",
  "BANASHANKARI",
  "ELECTRONIC CITY",
  "BANNERUGHATTA",
  "HEBBAL",
  "YELAHANKA",
  "YESHWANTPUR",
  "RAJAJINAGAR",
  "SHIVAJI NAGAR",
  "JP NAGAR",
  "BOMMANAHALLI",
  "HALASURU",
];
