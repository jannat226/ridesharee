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
  Alert,
} from "react-native";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const isEmailValid = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    // Basic validation
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    // Email validation
    if (!isEmailValid(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Add your additional validation logic here

    // Show message and reset email input
    Alert.alert("Success", "Checking your inbox to reset the password");
    setEmail("");
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
          placeholder="Enter Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

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
    marginTop: 50,
    marginLeft: 8,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: width - 70,
    // marginVertical: 50,
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
    alignContent: "center",
    marginVertical: 50,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});
