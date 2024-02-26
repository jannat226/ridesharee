import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo icons
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const HomeScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.outerContainer}>
        <View style={styles.header}>
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.logo}
          />

          <TouchableOpacity
            onPress={() => {
              console.log(auth.currentUser);
              if (auth.currentUser == null) navigation.navigate("LoginScreen");
              else setShowPopover(true);
            }}
          >
            <View style={styles.login}>
              <Ionicons name="person" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Your Destination..."
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <View style={styles.nav}>
          <NavOptions />
          <NavFavourites />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPopover}
        onRequestClose={() => {
          setShowPopover(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Logged In</Text>
            <Button
              title="Logout"
              color="#F00"
              onPress={() => {
                handleLogout();
                setShowPopover(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  outerContainer: {},
  container: {
    flex: 1,
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width - 20,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  logoContainer: {
    flex: 1,
    alignItems: "",
  },
  logo: {
    width: 100,
    height: 90,
    margin: 4,
  },
  login: {
    paddingRight: 10,
  },
  input: {
    height: 40,

    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: width - 40, // Set the width to 100% of the device width with some padding
  },
  container: {
    flex: 1,
    paddingTop: 50,
    margin: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
  },
  nav: {
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
