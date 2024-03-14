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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from "../providers/FirebaseProvider";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState({ visible: false, message: "" });

  const { auth } = useContext(FirebaseContext);

  const navigation = useNavigation();

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setIsLoading({ visible: true, message: "Signing In" });
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User Signed In");
        setIsLoading({ visible: false, message: "" });
        navigation.navigate("HomeScreen", {
          user,
        });
      })
      .catch((e) => {
        setIsLoading({ visible: false, message: "" });
        Alert.alert("Error", e.message);
        console.log("Invalid username or Password");
      });

  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading.visible && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      <View style={styles.borderContainer}>
        <Image
          source={require("../assets/images/logo.jpeg")}
          style={{
            width: 100,
            height: 90,
            paddingLeft: 0,
            marginLeft: 0,
            marginTop: 10,
            justifyContent: "center",
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username (Valid Email)"
          value={username}
          onChangeText={(text) => setUsername(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.smallText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
  },
  header: {
    position: "absolute",
    margin: 20,
    top: 10,
    right: 10,
  },
  formContainer: {
    marginTop: 30,
  },
  input: {
    height: 40,
    width: width - 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: width - 60,
  },
  loginButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    width: width - 40,
    alignItems: "center",
    marginVertical: 10,
    width: width - 70,
    marginLeft: 6,
  },
  borderContainer: {
    alignItems: "center",
    padding: 10,
    width: width - 40,
  },
  signupButton: {
    backgroundColor: "green",
    padding: 10,
    marginLeft: 6,
    borderRadius: 10,
    width: width - 40,
    alignItems: "center",
    marginVertical: 10,
    width: width - 70,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  forgotPasswordButton: {
    backgroundColor: "transparent",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  smallText: {
    fontSize: 12,
    marginTop: 5,
    color: "green",
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 18,
  },
});
