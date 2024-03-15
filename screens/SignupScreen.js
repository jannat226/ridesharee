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
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FirebaseContext } from "../providers/FirebaseProvider";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const { auth } = useContext(FirebaseContext);

  const handleUsernameChange = (username) => {
    setUsername(username);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleMobileNumberChange = (mobileNumber) => {
    setMobileNumber(mobileNumber);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  const handleSubmit = () => {
    if (!username || !email || !mobileNumber || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });

    // Add your additional validation logic here

    // Add your sign-up logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Mobile Number:", mobileNumber);
    console.log("Password:", password);

    // You can navigate to the home screen or perform other actions after sign-up
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.borderContainer}>
        <Image
          source={require("../assets/images/logo.jpeg")}
          style={{ width: 100, height: 90, marginLeft: 100 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: width - 70,
  },
  submitButton: {
    backgroundColor: "green",
    padding: 10,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 5,
    width: width - 70,
    alignItems: "center",
  },
  borderContainer: {
    margin: 20,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    padding: 10,
    width: width - 40,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});
