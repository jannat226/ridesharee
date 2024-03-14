import React, { useContext, useState } from "react";
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
  FlatList,
} from "react-native";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { FirebaseContext } from "../providers/FirebaseProvider";

const HomeScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  const { user } = useContext(FirebaseContext);

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
        <AvailableOptions
          options={locations}
          filterValue={inputValue}
          onSelect={setInputValue}
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.profileText}>Profile</Text>
              <TouchableOpacity onPress={() => { setShowPopover(false) }}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.textContent}>{`User: ${user.email}`}</Text>
            <TouchableOpacity onPress={() => { }} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  outerContainer: {
    margin: 15,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  option: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  nav: {
    marginLeft: 10,
    // flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#f00',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
