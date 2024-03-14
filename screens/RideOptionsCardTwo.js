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

// const data = [
//   {
//     id: "Bike-123",
//     location: "BikeX",
//     multiplier: 1,

//     charges: 100,
//     image:
//       "https://media.zigcdn.com/media/model/2022/Dec/tvs-raider-right-side-view_270x180.jpg",
//   },
//   {
//     id: "Bike-456",
//     location: "BikeY",
//     multiplier: 1.2,

//     charges: 80,
//     image:
//       "https://media.zigcdn.com/media/model/2022/Dec/tvs-raider-right-side-view_270x180.jpg",
//   },
//   {
//     id: "Bike-789",
//     location: "Bike-LUX",
//     multiplier: 1.5,

//     charges: 120,
//     image:
//       "https://media.zigcdn.com/media/model/2022/Dec/tvs-raider-right-side-view_270x180.jpg",
//   },
// ];

// const RideOptionsCardTwo = () => {
//   const navigation = useNavigation();
//   const [selected, setSelected] = useState(null);
//   const handleBook = (item) => {
//     // Set the selected item
//     setSelected(item);

//     // Navigate to LiveScreen and pass selected item data
//     navigation.navigate("LiveScreen", { selected });
//   };

//   return (
//     <SafeAreaView style={tw`bg-white flex-1`}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => handleBook(item)}
//             style={tw`flex-row justify-between items-center px-4 py-3 border-b border-gray-300`}
//           >
//             <View style={tw`flex-row items-center`}>
//               <Image
//                 style={tw`w-16 h-16 rounded-full`}
//                 source={{ uri: item.image }}
//               />
//               <View style={tw`ml-4`}>
//                 <Text style={tw`text-xl font-semibold`}>{item.location}</Text>
//                 {/* <Text>{item.passengers} Passenger</Text> */}
//                 <Text>{item.multiplier}x Multiplier</Text>
//                 <Text>{item.charges}rs Charges</Text>
//               </View>
//             </View>
//             <Text style={tw`text-xl`}>Book</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </SafeAreaView>
//   );
// };

// export default RideOptionsCardTwo;

// const styles = StyleSheet.create({});

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import ImagePicker from "react-native-image-picker";

const data = [
  {
    id: "Bike-123",
    location: "BikeX",

    charges: 80,
    // Use a default image
    image: require("../assets/images/Bikes/bike1.jpg"),
  },
  {
    id: "Bike-678",
    location: "BikeZ",

    charges: 100,
    // Use a default image
    image: require("../assets/images/Bikes/bike2.jpg"),
  },
  {
    id: "Bike-345",
    location: "BikeY",

    charges: 90,
    // Use a default image
    image: require("../assets/images/Bikes/bike3.jpg"),
  },
  // ... (other data entries)
];

const RideOptionsCard = ({ navigation }) => {
  const [selected, setSelected] = useState(null);

  const handleBook = (item) => {
    // Set the selected item
    setSelected(item);

    // Navigate to LiveScreen and pass selected item data
    navigation.navigate("LiveScreen", { selected });
  };

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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
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

                  <Text>{item.charges}rs Charges</Text>
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
