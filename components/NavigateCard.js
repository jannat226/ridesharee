// // import React, { useState } from "react";
// // import {
// //   FlatList,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";
// // import { Button, Icon } from "react-native-elements";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import tw from "tailwind-react-native-classnames";
// // import NavFavourites from "./NavFavourites";
// // import { useNavigation } from "@react-navigation/native";

// // const NavigateCard = ({ setStartLocation, setEndLocation }) => {
// //   const [inputValue, setInputValue] = useState("");
// //   const [inputValue2, setInputValue2] = useState("");
// //   const navigation = useNavigation();
// //   const [rideState, setRideState] = useState(0);

// //   const handleInputChange = (text) => {
// //     setInputValue(text);
// //   };
// //   const handleInputChange2 = (text) => {
// //     setInputValue2(text);
// //   };

// //   const AvailableOptions = ({ options, onSelect, filterValue }) => {
// //     const res =
// //       filterValue === ""
// //         ? []
// //         : options
// //             .filter(
// //               (option) =>
// //                 option.toLowerCase() != filterValue.toLowerCase() &&
// //                 option.toLowerCase().includes(filterValue.toLowerCase())
// //             )
// //             .slice(0, 5);
// //     return (
// //       <FlatList
// //         data={res}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity onPress={() => onSelect(item)}>
// //             <Text style={styles.option}>{item}</Text>
// //           </TouchableOpacity>
// //         )}
// //         keyExtractor={(_item, index) => index.toString()}
// //       />
// //     );
// //   };

// //   async function getLatLong(address) {
// //     const res = await fetch(
// //       `https://geocode.maps.co/search?q=${address}&api_key=65e2f7671a69c966166250vxha68cf2`
// //     );
// //     if (res.ok) {
// //       const data = await res.json();
// //       if (Array.isArray(data)) return data[0];
// //       return data;
// //     }
// //     return null;
// //   }

// //   async function getRoute(start, end) {
// //     setRideState(2);
// //     const start_loc = await getLatLong(start);
// //     await new Promise((resolve) => setTimeout(resolve, 1000)); // delay for rate limiting
// //     const end_loc = await getLatLong(end);

// //     if (start_loc == null || end_loc == null) return;

// //     if (start_loc == null) {
// //       setStartLocation(null);
// //     } else {
// //       setStartLocation({
// //         latitude: parseFloat(start_loc.lat),
// //         longitude: parseFloat(start_loc.lon),
// //       });
// //     }
// //     if (end_loc == null) {
// //       setEndLocation(null);
// //     } else {
// //       setEndLocation({
// //         latitude: parseFloat(end_loc.lat),
// //         longitude: parseFloat(end_loc.lon),
// //       });
// //     }
// //   }

// //   return (
// //     <>
// //       <Modal animationType="slide" transparent={true} visible={rideState == 2}>
// //         <View style={styles.modalContainer}>
// //           <View style={styles.dialogBox}>
// //             <Text style={styles.dialogText}>
// //               Searching for Passengers... Please Wait
// //             </Text>
// //             <TouchableOpacity style={styles.closeButton}>
// //               <Text style={styles.buttonText}>Stop</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>
// //       <SafeAreaView style={tw`bg-white flex-1`}>
// //         <View style={styles.container}>
// //           <View style={tw`border-t border-gray-200 flex-shrink`}>
// //             <View>
// //               <TextInput
// //                 style={styles.input}
// //                 placeholder="Enter Your Location..."
// //                 value={inputValue}
// //                 onChangeText={handleInputChange}
// //               />
// //               <AvailableOptions
// //                 options={locations}
// //                 filterValue={inputValue}
// //                 onSelect={setInputValue}
// //               />
// //               <TextInput
// //                 style={styles.input}
// //                 placeholder="Enter Your Destination..."
// //                 value={inputValue2}
// //                 onChangeText={handleInputChange2}
// //               />

// //               <AvailableOptions
// //                 options={locations}
// //                 filterValue={inputValue2}
// //                 onSelect={setInputValue2}
// //               />
// //               <Button
// //                 title="Click me"
// //                 onPress={() => getRoute(inputValue, inputValue2)}
// //               />
// //             </View>
// //             <NavFavourites />
// //           </View>
// //           <View
// //             style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
// //           >
// //             <TouchableOpacity
// //               onPress={() => navigation.navigate("RideOptionsCard")}
// //               style={tw`flex flex-row justify-center bg-black px-4 py-3 rounded-full`}
// //             >
// //               <Icon name="car" type="font-awesome" color="white" size={16} />
// //               <Text style={tw`text-white text-center`}>4-wheeler</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               onPress={() => navigation.navigate("RideOptionsCardTwo")}
// //               style={tw`flex flex-row bg-black px-4 py-3 rounded-full`}
// //             >
// //               <Icon
// //                 name="bicycle"
// //                 type="font-awesome"
// //                 color="white"
// //                 size={16}
// //               />
// //               <Text style={tw`text-white text-center`}>2-wheeler</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </SafeAreaView>
// //     </>
// //   );
// // };

// // export default NavigateCard;

// // const styles = StyleSheet.create({
// //   container: {
// //     margin: 15,
// //   },
// //   input: {
// //     height: 40,
// //     borderColor: "gray",
// //     borderWidth: 1,
// //     marginVertical: 10,
// //     paddingHorizontal: 10,
// //     borderRadius: 5,
// //   },
// //   option: {
// //     padding: 10,
// //     fontSize: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ccc",
// //   },
// // });

// // const locations = [
// //   "BTM LAYOUT",
// //   "JAYANAGAR",
// //   "SHANTI NAGAR",
// //   "ADUGODI",
// //   "KORAMANGALA",
// //   "HSR LAYOUT",
// //   "INDIRANAGAR",
// //   "MAJESTIC",
// //   "J C NAGAR",
// //   "LINGARAJAPURAM",
// //   "KALYAN NAGAR",
// //   "BANASWADI",
// //   "RAMAMURTHY NAGAR",
// //   "K R PURAM",
// //   "MAHADEVPURA",
// //   "MARATHAHALLI",
// //   "EJIPURA",
// //   "DOMLUR",
// //   "BANASHANKARI",
// //   "ELECTRONIC CITY",
// //   "BANNERUGHATTA",
// //   "HEBBAL",
// //   "YELAHANKA",
// //   "YESHWANTPUR",
// //   "RAJAJINAGAR",
// //   "SHIVAJI NAGAR",
// //   "JP NAGAR",
// //   "BOMMANAHALLI",
// //   "HALASURU",
// // ];

// import React, { useState } from "react";
// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Modal,
// } from "react-native";
// import { Button, Icon } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";
// import tw from "tailwind-react-native-classnames";
// import NavFavourites from "./NavFavourites";
// import { useNavigation } from "@react-navigation/native";

// const NavigateCard = ({
//   setStartLocation,
//   setEndLocation,
//   setRideState,
//   getRoute,
// }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [inputValue2, setInputValue2] = useState("");
//   const navigation = useNavigation();

//   const handleInputChange = (text) => {
//     setInputValue(text);
//   };
//   const handleInputChange2 = (text) => {
//     setInputValue2(text);
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
//         keyExtractor={(_item, index) => index.toString()}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={tw`bg-white flex-1`}>
//       <View style={styles.container}>
//         <View style={tw`border-t border-gray-200 flex-shrink`}>
//           <View>
//             <TextInput
//               style={styles.input}
//               placeholder="Christ University..."
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
//               value={inputValue2}
//               onChangeText={handleInputChange2}
//             />

//             <AvailableOptions
//               options={locations}
//               filterValue={inputValue2}
//               onSelect={setInputValue2}
//             />
//             <Button
//               title="Click me"
//               onPress={() => {
//                 if (inputValue.trim() === "" || inputValue2.trim() === "") {
//                   alert("Please enter both your location and destination.");
//                 } else {
//                   getRoute(inputValue, inputValue2);
//                 }
//               }}
//             />
//           </View>
//           <NavFavourites />
//         </View>
//         <View
//           style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
//         >
//           <TouchableOpacity
//             onPress={() => navigation.navigate("RideOptionsCard")}
//             style={tw`flex flex-row justify-center bg-black px-4 py-3 rounded-full`}
//           >
//             <Icon name="car" type="font-awesome" color="white" size={16} />
//             <Text style={tw`text-white text-center`}>4-wheeler</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("RideOptionsCardTwo")}
//             style={tw`flex flex-row bg-black px-4 py-3 rounded-full`}
//           >
//             <Icon name="bicycle" type="font-awesome" color="white" size={16} />
//             <Text style={tw`text-white text-center`}>2-wheeler</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default NavigateCard;

// const styles = StyleSheet.create({
//   container: {
//     margin: 15,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   option: {
//     padding: 10,
//     fontSize: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   dialogBox: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   dialogText: {
//     color: "#000",
//     fontSize: 18,
//   },
//   buttonText: {
//     color: "red",
//     fontWeight: "bold",
//   },
// });

// const locations = [
//   "CHRIST UNIVERSITY",
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
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import NavFavourites from "./NavFavourites";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

const options = ["Morning", "Evening"];
const optionsCount = ["1", "2", "3"];
const NavigateCard = ({ getRoute }) => {
  const [startLocationValue, setStartLocationValue] = useState("");
  const [endLocationValue, setEndLocationValue] = useState("");
  const [vehicleType, setVehicleType] = useState(""); // State to store the selected vehicle type
  const [timing, setTiming] = useState("");

  const handleStartLocationChange = (text) => {
    setStartLocationValue(text);
  };

  const handleEndLocationChange = (text) => {
    setEndLocationValue(text);
  };

  const handleVehicleTypeChange = (type) => {
    setVehicleType(type);
  };

  const validate = () => {
    if (!timing) {
      alert("Please select timing");
    } else if (!vehicleType) {
      alert("Please select a vehicle type");
    } else if (
      (timing == options[0] && startLocationValue.trim() === "") ||
      (timing == options[1] && endLocationValue.trim() === "")
    ) {
      alert("Please enter both your location and destination.");
    } else {
      getRoute(
        timing == "Evening" ? "Christ University" : startLocationValue,
        timing == "Evening" ? endLocationValue : "Christ University",
        vehicleType,
        timing
      );
    }
  };
  const AvailableOptionsForStart = ({ options, onSelect, filterValue }) => {
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

  const AvailableOptionsForEnd = ({ options, onSelect, filterValue }) => {
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

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={styles.container}>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <View style={styles.rowContainer}>
              <Text>Choose your timing</Text>
              <SelectDropdown
                data={options}
                onSelect={(selectedItem, _) => setTiming(selectedItem)}
                buttonTextAfterSelection={(selectedItem, _) => selectedItem}
                rowTextForSelection={(item, _) => item}
                renderCustomizedButton={({
                  selectedItem,
                  defaultText,
                  onPress,
                }) => (
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={onPress}
                  >
                    <Text style={styles.dropdownButtonText}>
                      {selectedItem || defaultText}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Christ University..."
              value={
                timing === options[1] ? "Christ University" : startLocationValue
              }
              onChangeText={handleStartLocationChange}
            />
            <AvailableOptionsForStart
              options={locations}
              filterValue={startLocationValue}
              onSelect={handleStartLocationChange}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Your Destination..."
              value={
                timing === options[0] ? "Christ University" : endLocationValue
              }
              onChangeText={handleEndLocationChange}
            />

            <AvailableOptionsForEnd
              options={locations}
              filterValue={endLocationValue}
              onSelect={handleEndLocationChange}
            />

            <View style={styles.vehicleTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.vehicleTypeButton,
                  vehicleType === "four-wheeler" && styles.selectedButton,
                ]}
                onPress={() => handleVehicleTypeChange("four-wheeler")}
              >
                <Icon name="car" type="font-awesome" color="white" size={16} />
                <Text style={styles.vehicleTypeButtonText}>4-wheeler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.vehicleTypeButton,
                  vehicleType === "two-wheeler" && styles.selectedButton,
                ]}
                onPress={() => handleVehicleTypeChange("two-wheeler")}
              >
                <Icon
                  name="bicycle"
                  type="font-awesome"
                  color="white"
                  size={16}
                />
                <Text style={styles.vehicleTypeButtonText}>2-wheeler</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <NavFavourites /> */}
        </View>
        <View
          style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
        >
          <Button title="Search Rides" onPress={validate} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flex: 1,
  },
  dropdownButton: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically in the center
    marginBottom: 10, // Add margin at the bottom for spacing
  },

  option: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  vehicleTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  vehicleTypeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  vehicleTypeButtonText: {
    color: "white",
    marginLeft: 5,
  },
  selectedButton: {
    backgroundColor: "green", // Example color to indicate selection
  },
});

const locations = [
  "CHRIST UNIVERSITY",
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
