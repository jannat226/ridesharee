// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Button,
//   Modal,
// } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
// import React, { useContext, useEffect, useState } from "react";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
// import { FirebaseContext } from "../providers/FirebaseProvider";
// import { Icon } from "react-native-elements";

// const options = ["two-wheeler", "four-wheeler"];

// const DriverScreen = () => {
//   const [location, setLocation] = useState({
//     latitude: 0.0,
//     longitude: 0.0,
//     timestamp: 0,
//   });

//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [rideState, setRideState] = useState(0);
//   const [vehicleType, setVehicleType] = useState(null);

//   const { db, user } = useContext(FirebaseContext);

//   useEffect(() => {
//     let subscription;

//     (async () => {
//       subscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           distanceInterval: 5,
//           timeInterval: 1000,
//         },
//         (locationValue) => {
//           setLocation({
//             latitude: locationValue.coords.latitude,
//             longitude: locationValue.coords.longitude,
//             timestamp: Timestamp.fromDate(new Date()),
//           });
//         }
//       );
//     })();

//     return () => subscription?.remove();
//   }, []);

//   useEffect(() => {
//     if (rideState === 2) {
//       setDoc(doc(db, "drivers", user.email), {
//         ...location,
//         state: "accepting",
//         vehicleNumber,
//         vehicleType,
//       });
//     }
//   }, [location, db, rideState]);

//   const handleAcceptRide = () => {
//     if (!vehicleNumber || !vehicleType) {
//       alert("Please fill in all fields.");
//       return;
//     }
//     setRideState(2);
//   };

//   const handleCancelRide = () => {
//     setRideState(0);
//     updateDoc(doc(db, "drivers", user.email), {
//       ...location,
//       state: "not-accepting",
//     });
//   };
//   const handleVehicleType = (type) => {
//     setVehicleType(type); // Set the selected vehicle type
//   };

//   const placeholder = {
//     label: "Select your vehicle type ...",
//     value: null,
//   };

//   return (
//     <>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={rideState === 2}
//         onRequestClose={handleCancelRide}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.dialogBox}>
//             <Text style={styles.dialogText}>
//               Searching for Passengers... Please Wait
//             </Text>
//             <TouchableOpacity
//               onPress={handleCancelRide}
//               style={styles.closeButton}
//             >
//               <Text style={styles.buttonText}>Stop</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <View style={styles.outerContainer}>
//         <View style={styles.mapContainer}>
//           <MapView
//             style={styles.map}
//             region={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//               latitudeDelta: 0.05,
//               longitudeDelta: 0.05,
//             }}
//           >
//             <Marker
//               key={1}
//               coordinate={{
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//               }}
//               title={`Passenger`}
//             />
//           </MapView>
//         </View>
//         <View style={styles.inputContainer}>
//           <Text style={styles.title}>Accept Ride</Text>
//           <Text style={styles.label}>Enter Vehicle Number:</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Enter Your Vehicle Number"
//             value={vehicleNumber}
//             onChangeText={(text) => setVehicleNumber(text)}
//           />
//           <View style={styles.vehicleTypeContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.vehicleTypeButton,
//                 vehicleType === "four-wheeler" && styles.selectedButton,
//               ]}
//               onPress={() => handleVehicleType("four-wheeler")}
//             >
//               <Icon name="car" type="font-awesome" color="white" size={16} />
//               <Text style={styles.vehicleTypeButtonText}>4-wheeler</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.vehicleTypeButton,
//                 vehicleType === "two-wheeler" && styles.selectedButton,
//               ]}
//               onPress={() => handleVehicleType("two-wheeler")}
//             >
//               <Icon
//                 name="bicycle"
//                 type="font-awesome"
//                 color="white"
//                 size={16}
//               />
//               <Text style={styles.vehicleTypeButtonText}>2-wheeler</Text>
//             </TouchableOpacity>
//           </View>
//           {/* <SelectDropdown
//             data={options}
//             onSelect={(selectedItem, index) => setVehicleType(selectedItem)}
//             buttonTextAfterSelection={(selectedItem, index) => selectedItem}
//             rowTextForSelection={(item, index) => item}
//             renderCustomizedButton={({
//               selectedItem,
//               defaultText,
//               onPress,
//             }) => (
//               <TouchableOpacity style={styles.dropdownButton} onPress={onPress}>
//                 <Text style={styles.dropdownButtonText}>
//                   {selectedItem || defaultText}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           /> */}
//           <Button
//             title="Accept Ride"
//             onPress={handleAcceptRide}
//             color="#00ff00"
//           />
//           <Button
//             title="Cancel Ride"
//             onPress={handleCancelRide}
//             color="#ff0000"
//           />
//         </View>
//       </View>
//     </>
//   );
// };

// export default DriverScreen;

// const styles = StyleSheet.create({
//   outerContainer: {
//     flex: 1,
//     backgroundColor: "#d6f5d6",
//   },
//   mapContainer: {
//     flex: 1,
//     height: 250,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   inputContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     backgroundColor: "white",
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   vehicleTypeButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "black",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 20,
//   },
//   vehicleTypeButtonText: {
//     color: "white",
//     marginLeft: 5,
//   },
//   dropdownButton: {
//     height: 40,
//     borderColor: "gray",
//     backgroundColor: "white",
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//     justifyContent: "center",
//   },
//   dropdownButtonText: {
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   dialogBox: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   vehicleTypeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//   },
//   selectedButton: {
//     backgroundColor: "green", // Example color to indicate selection
//   },
//   dialogText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   closeButton: {
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 5,
//   },

//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Modal,
  Linking,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { Icon } from "react-native-elements";

const options = ["two-wheeler", "four-wheeler"];

// create an enum for application states
const RideState = Object.freeze({
  Started: 0,
  Loading: 1,
  Waiting: 2,
  RideRecieved: 3,
  Cancelled: 4,
});

const DriverScreen = () => {
  const [location, setLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
    timestamp: 0,
  });

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [rideState, setRideState] = useState(RideState.Started);
  const [vehicleType, setVehicleType] = useState(null);
  const [rideDetails, setRideDetails] = useState(null);

  const { db, user } = useContext(FirebaseContext);

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
    let unsub;
    if (rideState === RideState.Waiting) {
      setDoc(doc(db, "drivers", user.email), {
        ...location,
        state: "accepting",
        vehicleNumber,
        vehicleType,
      });

      // const q = query(collection(db, `drivers/`));
      const q = query(collection(db, `drivers/${user.email}/travellers`));
      console.log(`drivers/${user.email}/travellers`);
      unsub = onSnapshot(q, (querySnapshot) => {
        const cities = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          setRideState(RideState.RideRecieved);
          setRideDetails({ ...doc.data(), id: doc.id });
        });
        console.log("Current cities in CA: ", cities.join(", "));
      });
    } else {
      unsub?.();
    }
    return unsub;
  }, [location, db, rideState]);

  const handleAcceptRide = () => {
    if (!vehicleNumber || !vehicleType) {
      alert("Please fill in all fields.");
      return;
    }
    startListener();
    setRideState(RideState.Waiting);
  };

  const startListener = async () => {};

  const handleShowOnMap = () => {
    console.log(rideDetails);
    // const openGoogleMaps = (latitude, longitude) => {
    console.log("Open Google Maps");
    const url = `https://www.google.com/maps/dir/?api=1&destination=${rideDetails?.latitude},${rideDetails?.longitude}&travelmode=driving`;
    Linking.openURL(url);
    // };
  };

  const handleCancelWaiting = () => {
    setRideState(0);
    updateDoc(doc(db, "drivers", user.email), {
      ...location,
      state: "not-accepting",
    });
  };

  const handleVehicleType = (type) => {
    setVehicleType(type); // Set the selected vehicle type
  };

  const placeholder = {
    label: "Select your vehicle type ...",
    value: null,
  };

  console.log(rideDetails);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={rideState === RideState.Waiting}
        onRequestClose={handleCancelWaiting}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            <Text style={styles.dialogText}>
              Searching for Passengers... Please Wait
            </Text>
            <TouchableOpacity
              onPress={handleCancelWaiting}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={rideState === RideState.RideRecieved}
        // onRequestClose={handleCancelRide}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            <Text style={styles.dialogHeaderText}>Passenger Details</Text>
            <Text style={styles.dialogText}>
              Passenger Email: {rideDetails?.id}
            </Text>
            <Text style={styles.dialogText}>
              Pickup: {rideDetails?.start?.display_name}
            </Text>
            {/* <Text style={styles.dialogText}>Passenger Details</Text> */}
            <TouchableOpacity
              onPress={handleShowOnMap}
              style={styles.openMapsButton}
            >
              <Text style={styles.buttonText}>Show on Map</Text>
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
          <Text style={styles.label}>Enter Vehicle Number:</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Your Vehicle Number"
            value={vehicleNumber}
            onChangeText={(text) => setVehicleNumber(text)}
          />
          <View style={styles.vehicleTypeContainer}>
            <TouchableOpacity
              style={[
                styles.vehicleTypeButton,
                vehicleType === "four-wheeler" && styles.selectedButton,
              ]}
              onPress={() => handleVehicleType("four-wheeler")}
            >
              <Icon name="car" type="font-awesome" color="white" size={16} />
              <Text style={styles.vehicleTypeButtonText}>4-wheeler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.vehicleTypeButton,
                vehicleType === "two-wheeler" && styles.selectedButton,
              ]}
              onPress={() => handleVehicleType("two-wheeler")}
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
          {/* <SelectDropdown
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
          /> */}
          <Button
            title="Accept Ride"
            onPress={handleAcceptRide}
            color="#00ff00"
          />
          <Button
            title="Cancel Ride"
            onPress={handleShowOnMap}
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
  vehicleTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: "green", // Example color to indicate selection
  },
  dialogText: {
    fontSize: 18,
    marginBottom: 20,
  },
  dialogHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  openMapsButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
