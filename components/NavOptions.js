import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const data = [
  {
    id: "123",
    title: "Book a ride",
    image: "assets/images/car1.png",
    screen: "Book a Ride",
  },
  {
    id: "456",
    title: "Accept a ride",
    image: "assets/images/car1.png",
    screen: "Accept a Ride",
  },
];
const NavOptions = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (auth.currentUser == null) navigation.navigate("LoginScreen");
            else navigation.navigate(item.screen);
          }}
          key={() => item.id}
        >
          <View style={tw`p-2 pb-8 pt-4 bg-gray-200 m-2 w-40 border drop-shadow-lg flex justify-center items-center`}>
            <Image
              style={{ width: 100, height: 90 }}
              source={
                item.id === "123"
                  ? require("../assets/images/BookRide.png")
                  : require("../assets/images/Accept1.jpg")
              }
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
              <Text>{item.title}</Text>
              <Icon
                style={{ padding: 1, backgroundColor: 'black', borderRadius: 20, margin: 3 }}
                type="antdesign"
                name="arrowright"
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
