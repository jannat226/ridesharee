import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const ThanksScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/images/earth2.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.thanksText}>
          Thank you for choosing RideShare!{"\n"}Every single ride is a choice
          in saving Mother Nature.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
    justifyContent: "center",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a semi-transparent white background
    padding: 16,
    borderRadius: 10,
  },
  thanksText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333", // Change the text color to a dark color for better visibility
  },
});

export default ThanksScreen;
