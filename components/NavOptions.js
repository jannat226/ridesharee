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
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Accept a ride",
    image: "assets/images/car1.png",
    screen: "Map2Screen",
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
          <View style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
            <Image
              style={{ width: 100, height: 90 }}
              source={
                item.id === "123"
                  ? require("../assets/images/BookRide.png")
                  : require("/Users/Shared/workspace/SPD/rideshare/assets/images/Accept1.jpg")
              }
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-1 bg-black rounded-full w-10 mt-3`}
              type="antdesign"
              name="arrowright"
              color="white"
            ></Icon>
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
