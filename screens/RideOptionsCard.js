// // import React, { useState } from "react";
// // import {
// //   SafeAreaView,
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   TouchableOpacity,
// // } from "react-native";
// // import tw from "tailwind-react-native-classnames";
// // import { useNavigation } from "@react-navigation/native";
// // import { FlatList } from "react-native";

// // const data = [
// //   {
// //     id: "Car-123",
// //     location: "CarX",
// //     multiplier: 1,
// //     passengers: 4,
// //     charges: 250,
// //     image:
// //       "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80",
// //   },
// //   {
// //     id: "Car-456",
// //     location: "CarY",
// //     multiplier: 1.2,
// //     passengers: 6,
// //     charges: 200,
// //     image:
// //       "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80",
// //   },
// //   {
// //     id: "Car-789",
// //     location: "Car-LUX",
// //     multiplier: 1.5,
// //     passengers: 2,
// //     charges: 300,
// //     image:
// //       "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80",
// //   },
// // ];

// // const RideOptionsCard = ({ navigation }) => {
// //   const [selected, setSelected] = useState(null);

// //   const handleBook = (item) => {
// //     // Set the selected item
// //     setSelected(item);

// //     // Navigate to LiveScreen and pass selected item data
// //     navigation.navigate("LiveScreen", { selected });
// //   };

// //   return (
// //     <SafeAreaView style={tw`bg-white flex-1`}>
// //       <FlatList
// //         data={data}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <TouchableOpacity
// //             onPress={() => handleBook(item)}
// //             style={tw`flex-row justify-between items-center px-4 py-3 border-b border-gray-300`}
// //           >
// //             <View style={tw`flex-row items-center`}>
// //               <Image
// //                 style={tw`w-16 h-16 rounded-full`}
// //                 source={{ uri: item.image }}
// //               />
// //               <View style={tw`ml-4`}>
// //                 <Text style={tw`text-xl font-semibold`}>{item.location}</Text>
// //                 <Text>{item.passengers} Passengers</Text>
// //                 <Text>{item.multiplier}x Multiplier</Text>
// //                 <Text>{item.charges}rs Charges</Text>
// //               </View>
// //             </View>
// //             <Text style={tw`text-xl`}>Book</Text>
// //           </TouchableOpacity>
// //         )}
// //       />
// //     </SafeAreaView>
// //   );
// // };

// // export default RideOptionsCard;

// // const styles = StyleSheet.create({});

// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import tw from "tailwind-react-native-classnames";
// import { useNavigation } from "@react-navigation/native";
// import { FlatList } from "react-native";
// import ImagePicker from "react-native-image-picker";

// const data = [
//   {
//     id: "Car-123",
//     location: "CarX",
//     multiplier: 1,
//     passengers: 4,
//     charges: 200,
//     image: require("../assets/images/Cars/car1.jpg"), // Use a default image
//   },
//   {
//     id: "Car-678",
//     location: "CarZ",
//     multiplier: 1,
//     passengers: 2,
//     charges: 300,
//     image: require("../assets/images/Cars/car3.png"), // Use a default image
//   },
//   {
//     id: "Car-345",
//     location: "CarY",
//     multiplier: 1,
//     passengers: 3,
//     charges: 250,
//     image: require("../assets/images/Cars/car2.jpg"), // Use a default image
//   },

//   // ... (other data entries)
// ];

// const RideOptionsCard = ({ navigation }) => {
//   const [selected, setSelected] = useState(null);

//   const handleBook = (item) => {
//     // Set the selected item
//     setSelected(item);

//     // Navigate to LiveScreen and pass selected item data
//     navigation.navigate("LiveScreen", { selected });
//   };

//   const handleImagePicker = (item) => {
//     const options = {
//       title: "Select Image",
//       storageOptions: {
//         skipBackup: true,
//         path: "images",
//       },
//     };

//     ImagePicker.showImagePicker(options, (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.error) {
//         console.log("ImagePicker Error: ", response.error);
//       } else {
//         // Update the image URI in the data array
//         const newData = data.map((d) =>
//           d.id === item.id ? { ...d, image: { uri: response.uri } } : d
//         );

//         // Set the updated data
//         setData(newData);
//       }
//     });
//   };

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => handleBook(item)}
//               style={tw`flex-row justify-between items-center px-4 py-3 border-b border-gray-300`}
//             >
//               <View style={tw`flex-row items-center`}>
//                 <TouchableOpacity onPress={() => handleImagePicker(item)}>
//                   <Image
//                     style={tw`w-16 h-16 rounded-full`}
//                     source={item.image}
//                   />
//                 </TouchableOpacity>
//                 <View style={tw`ml-4`}>
//                   <Text style={tw`text-xl font-semibold`}>{item.location}</Text>
//                   <Text>{item.passengers} Passengers</Text>
//                   <Text>{item.multiplier}x Multiplier</Text>
//                   <Text>{item.charges}rs Charges</Text>
//                 </View>
//               </View>
//               <Text style={tw`text-xl`}>Book</Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default RideOptionsCard;

// const styles = StyleSheet.create({
//   container: {
//     // style={tw`bg-white flex-1`}
//     // backgroundColor: "white",
//     // flex: 1,
//     borderColor: "gray",
//     borderWidth: 10,

//     marginTop: 40,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     // shadowColor
//   },
// });

import React, { useContext, useEffect, useState } from "react";
import { runTransaction } from "firebase/firestore";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import ImagePicker from "react-native-image-picker";
import { FirebaseContext } from "../providers/FirebaseProvider";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const distanceDelta = 0.0005;

const data = [
  {
    id: "Car-123",
    location: "CarX",
    multiplier: 1,
    passengers: 4,
    charges: 200,
    image: require("../assets/images/Cars/car1.jpg"), // Use a default image
  },
  {
    id: "Car-678",
    location: "CarZ",
    multiplier: 1,
    passengers: 2,
    charges: 300,
    image: require("../assets/images/Cars/car3.png"), // Use a default image
  },
  {
    id: "Car-345",
    location: "CarY",
    multiplier: 1,
    passengers: 3,
    charges: 250,
    image: require("../assets/images/Cars/car2.jpg"), // Use a default image
  },
  // ... (other data entries)
];

const RideOptionsCard = ({ route }) => {
  const [selected, setSelected] = useState(null);
  const [drivers, setDrivers] = useState([]);

  const navigation = useNavigation();
  const { db, user } = useContext(FirebaseContext);

  const { start, end, vehicleType, timing, current } = route.params;

  // console.log(start, end, vehicleType, timing, current);
  console.log(start, "\n\n", end);

  const handleBook = (item) => {
    // Set the selected item
    setSelected(item);

    // Navigate to LiveScreen and pass selected item data
    navigation.navigate("LiveScreen", { selected });
  };
  function addMetersToLatitude(latitude, meters) {
    // One degree of latitude is approximately 111,320 meters
    const metersPerDegree = 111320;

    // Calculate the change in latitude (in degrees)
    const deltaLatitude = meters / metersPerDegree;

    // Add the change in latitude to the original latitude
    const newLatitude = latitude + deltaLatitude;

    console.log(newLatitude);

    // round of newLatitude to nearest 6 digits
    const roundedLatitude = Math.round(newLatitude * 1000000) / 1000000;
    console.log(roundedLatitude);

    return newLatitude;
  }
  const handleImagePicker = (item) => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        // Update the image URI in the data array
        const newData = data.map((d) =>
          d.id === item.id ? { ...d, image: { uri: response.uri } } : d
        );

        // Set the updated data
        setData(newData);
      }
    });
  };

  const openGoogleMaps = (latitude, longitude) => {
    console.log("Open Google Maps");
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  async function getNearbyDrivers() {
    console.log(
      "start Location is not null: ",
      start != null,
      ", End Location is not null: ",
      end != null
    );

    if (start != null && end != null) {
      const driversRef = collection(db, "drivers");

      const new_lat_greater = parseFloat(current.latitude) + distanceDelta;
      const new_lat_smaller = parseFloat(current.latitude) - distanceDelta;
      console.log(
        "Original Latitude: ",
        start.lat,
        "Smaller Latitude: ",
        new_lat_smaller,
        "Greater Latitude: ",
        new_lat_greater
      );
      const q = query(
        driversRef,
        where("latitude", "<", new_lat_greater),
        where("latitude", ">=", new_lat_smaller),
        limit(3)
      );

      const querySnapshot = await getDocs(q);
      // TODO: hide prompt

      if (querySnapshot.empty) {
        console.log("No snapshots");
      } else {
        console.log("Empty: ", querySnapshot.empty);
        let driverarray = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data().vehicleNumber);
          driverarray.push({ ...doc.data(), id: doc.id });
          console.log(driverarray);
        });
        console.log("Drivers: ", driverarray);
        setDrivers(driverarray);
      }
    } else {
      console.log("Start or end is null");
    }
  }

  useEffect(() => {
    getNearbyDrivers();
  }, []);

  const checkAndAddDocument = async (someData) => {
    try {
      const result = await runTransaction(db, async (transaction) => {
        console.log("Inside runTransaction", someData);
        const collectionRef = collection(
          db,
          `drivers/${someData.id}/travellers`
        );
        const querySnapshot = await getDocs(collectionRef);

        if (querySnapshot.empty) {
          console.log("Collection is empty, adding document");
          // If the collection is empty, add the document
          await setDoc(
            doc(db, `drivers/${someData.id}/travellers`, user.email),
            {
              ...someData,
              id: user.email,
              pickup_location: current.latitude,
              start_latitude: start.lat,
              end_latitude: end.lat,
              start_longitude: start.lon,
              end_longitude: end.lon,
            }
          );
          return true; // Return true to indicate document was added
        } else {
          console.log("Collection is not empty, skipping document addition");
          return false; // Return false to indicate document was not added
        }
      });

      console.log(result);

      // If result is false, show a pop-up message indicating no driver is available
      if (!result) {
        window.alert("Sorry! this  driver not available now");
      } else {
        openGoogleMaps(someData.latitude, someData.longitude);
      }
      return result;
    } catch (err) {
      console.log("Error Occurred: ", err);
      // Show a pop-up message indicating an error occurred
      window.alert("An error occurred. Please try again later.");
      return null;
    }
  };

  async function notifyDriver(someData) {
    // await setDoc(doc(db, `drivers/${someData.id}/travellers`, user.email), {
    //   start,
    //   end,
    //   vehicleType,
    //   timing,
    // });
    // console.log(start, end, vehicleType, timing);
    checkAndAddDocument(someData);
    // try {
    //   await runTransaction(db, async (transaction) => {
    //     // Reference to the collection
    //     const collectionRef = db.collection("your_collection_name");

    //     return transaction
    //       .get(db.collection(`drivers/${someData.id}/travellers`))
    //       .then((querySnapshot) => {
    //         // Array to store documents
    //         const documents = [];

    //         console.log("size: " + querySnapshot.data.length);
    //         // Loop through each document
    //         querySnapshot.forEach((doc) => {
    //           console.log(`${doc.id}`);
    //           // Push document data into the array
    //           // documents.push(doc.data());
    //         });

    //         // Return the array of documents
    //         return documents;
    //       });
    //   });

    //   console.log("Transaction successfully committed!");
    // } catch (e) {
    //   console.log("Transaction failed: ", e);
    // }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={drivers}
          keyExtractor={(item) => item.vehicleNumber}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                notifyDriver(item);
                // openGoogleMaps(item.latitude, item.longitude);
              }}
              style={tw`flex-row justify-between items-center px-4 py-3 border-b border-gray-300`}
            >
              <View style={tw`flex-row items-center`}>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={tw`w-16 h-16 rounded-full`}
                    source={data[0].image}
                  />
                </TouchableOpacity>
                <View style={tw`ml-4`}>
                  {/* <Text style={tw`text-xl font-semibold`}>{item.location}</Text> */}
                  <Text>{"Owner Email:\n" + item.id}</Text>
                  <Text>Vehicle Type: {item.vehicleType} </Text>
                  <Text>
                    Ride Charges:{" ₹"}
                    {calculateDistance(start.lat, start.lon, end.lat, end.lon)}
                  </Text>
                  {/* <Text>{item.charges}rs Charges</Text> */}
                </View>
              </View>
              <View style={styles.book}>
                <Text style={tw`text-xl`}>Book</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

{
  /* <FlatList
data={data}
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
  <TouchableOpacity
    onPress={() => handleBook(item)}
    style={tw`flex-row justify-between items-center px-4 py-3 border-b border-gray-300`}
  >
    <View style={tw`flex-row items-center`}>
      <TouchableOpacity onPress={() => handleImagePicker(item)}>
        <Image
          style={tw`w-16 h-16 rounded-full`}
          source={item.image}
        />
      </TouchableOpacity>
      <View style={tw`ml-4`}>
        <Text style={tw`text-xl font-semibold`}>{item.location}</Text>
        <Text>{item.passengers} Passengers</Text>
        <Text>{item.multiplier}x Multiplier</Text>
        <Text>{item.charges}rs Charges</Text>
      </View>
    </View>
    <View style={styles.book}>
      <Text style={tw`text-xl`}>Book</Text>
    </View>
  </TouchableOpacity>
)}
/> */
}

export default RideOptionsCard;

const styles = StyleSheet.create({
  container: {
    borderColor: "gray",
    borderWidth: 10,
    marginTop: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 3, // Added border radius
  },
  book: {
    backgroundColor: "green",

    margin: 5,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
});

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // Distance in km
  return calculatePrice(distance).toFixed(2);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculatePrice(distance) {
  const price = distance * 20;

  return price;
}
