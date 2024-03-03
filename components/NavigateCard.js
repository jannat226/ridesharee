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

const NavigateCard = () => {
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
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  async function getLatLong(address) {
    fetch(
      `https://geocode.maps.co/search?q=${address}&api_key=65e2f7671a69c966166250vxha68cf2`
    )
      .then((res) => res.json().then((data) => console.log(data)))
      .catch((err) => console.log(err));
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
            <Button title="Click me" onPress={() => getLatLong("BTM LAYOUT")} />
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

// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import { Icon } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";
// import tw from "tailwind-react-native-classnames";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import NavFavourites from "./NavFavourites";
// import { useNavigation } from "@react-navigation/native"; // import
// // import { OpenStreetMapProvider } from "leaflet-geosearch";

// const NavigateCard = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [search, setSearch] = useState("Hello");
//   const navigation = useNavigation();
//   const handleInputChange = (text) => {
//     setInputValue(text);
//   };

//   const AvailableOptions = ({ options, onSelect, filterValue }) => {
//     const res =
//       filterValue === ""
//         ? []
//         : options
//             .filter(
//               (option) =>
//                 option.toLowerCase() != filterValue.toLowerCase() &&
//                 option.toLowerCase().includes(filterValue.toLowerCase())
//             )
//             .slice(0, 5);
//     return (
//       <FlatList
//         data={res}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => onSelect(item)}>
//             <Text style={styles.option}>{item}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     );
//   };
//   // setup
//   // const provider = new OpenStreetMapProvider();

//   // search
//   return (
//     <SafeAreaView style={tw`bg-white flex-1`}>
//       <View stye={styles.outerContainer}>
//         <View style={tw`border-t border-gray-200 flex-shrink`}>
//           <View>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Your Location..."
//               value={inputValue}
//               onChangeText={handleInputChange}
//             />
//             <AvailableOptions
//               options={locations}
//               filterValue={inputValue}
//               onSelect={setInputValue}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Your Destination..."
//               value={inputValue}
//               onChangeText={handleInputChange}
//             />
//             <AvailableOptions
//               options={locations}
//               filterValue={inputValue}
//               onSelect={setInputValue}
//             />
//           </View>
//           <NavFavourites />
//         </View>
//         <View
//           style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
//         >
//           <TouchableOpacity
//             //   onPress={() => navigation.navigate("LoginScreen")}
//             onPress={() => navigation.navigate("RideOptionsCard")}
//             //   onPress={() => navigation.navigate("SignupScreen")}
//             style={tw`flex flex-row  justify-center bg-black px-4 py-3 rounded-full`}
//           >
//             <Icon name="car" type="font-awesome" color="white" size={16} />
//             <Text style={tw`text-white text-center`}>4-wheeler</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             //   onPress={() => navigation.navigate("RideOptionsCard")}
//             onPress={() => navigation.navigate("RideOptionsCardTwo")}
//             style={tw`flex flex-row bg-black  px-4 py-3 rounded-full`}
//           >
//             <Icon name="bicycle" type="font-awesome" color="white" size={16} />
//             <Text style={tw`text-white text-center`}>2-wheeler</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//     // <View>
//     //   <Text>NavigateCard</Text>
//     // </View>
//   );
// };

// export default NavigateCard;

// const styles = StyleSheet.create({});
// const toInputBoxStyles = StyleSheet.create({
//   outerContainer: {
//     backgroundColor: "#d6f5d6",
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginLeft: 30,
//     paddingLeft: 30,
//     paddingRight: 10,
//     width: 40, // Set the width to 100% of the device width with some padding
//   },
//   container: {
//     backgroundColor: "white",
//     paddingTop: 20,
//     flex: 0,
//   },
//   textInput: {
//     backgroundColor: "#DDDDDF",
//     borderRadius: 0,
//     fontSize: 18,
//   },
//   textInputContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 0,
//   },
//   outerContainer: {
//     margin: 15,
//   },
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logoContainer: {
//     flex: 1,
//     alignItems: "",
//   },
//   logo: {
//     width: 100,
//     height: 90,
//     margin: 4,
//   },
//   login: {
//     paddingRight: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginLeft: 10,
//     paddingLeft: 10,
//     paddingRight: 10,
//     width: 40, // Set the width to 100% of the device width with some padding
//   },
//   option: {
//     padding: 10,
//     fontSize: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   nav: {
//     marginLeft: 10,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
// });

// const locations = [
//   "BTM LAYOUT",
//   "JAYANAGAR",
//   "SHANTI NAGAR",
//   "ADUGODI",
//   "KORAMANGALA",
//   "HSR LAYOUT",
//   "INDIRANAGAR",
//   "MAJESTIC",
//   "J C NAGAR",
//   "LINGARAJAPURAM",
//   "KALYAN NAGAR",
//   "BANASWADI",
//   "RAMAMURTHY NAGAR",
//   "K R PURAM",
//   "MAHADEVPURA",
//   "MARATHAHALLI",
//   "EJIPURA",
//   "DOMLUR",
//   "BANASHANKARI",
//   "ELECTRONIC CITY",
//   "BANNERUGHATTA",
//   "HEBBAL",
//   "YELAHANKA",
//   "YESHWANTPUR",
//   "RAJAJINAGAR",
//   "SHIVAJI NAGAR",
//   "JP NAGAR",
//   "BOMMANAHALLI",
//   "HALASURU",
// ];
