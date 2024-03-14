import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Rating } from "react-native-ratings"; // Assuming you have a package for star ratings
import { useNavigation } from "@react-navigation/native";

const ReviewScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = () => {
    // Add logic for submitting the review
    console.log("Review submitted!");
    // You can add further logic as needed

    // Navigate to ThanksScreen after submitting the review
    navigation.navigate("ThanksScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ride Completed!</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.detailsText}>Details:</Text>
        <Text>Rider Name: John Doe</Text>
        <Text>Vehicle Number: Car-123</Text>
        <Text>Department: Computer Science</Text>
        <Text>Distance: 5 miles</Text>
        <Text>Amount: $20.00</Text>
      </View>

      <View style={styles.reviewSection}>
        {/* Add any additional input fields or components for the review */}
        {/* For example: */}
        <Text>Amount Paid: 200rs to John Doe</Text>

        <Text style={styles.reviewText}>Review</Text>
        <Text style={styles.rateRiderText}>Rate the Rider:</Text>
        <Rating
          showRating
          onFinishRating={setRating}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review..."
          multiline
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleReviewSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 10,
    borderRadius: 5,
    width: 340,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  detailsSection: {
    marginBottom: 16,
    backgroundColor: "#d6f5d6",
    padding: 16,
    borderRadius: 5,
  },
  detailsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  reviewSection: {
    alignItems: "center",
    borderRadius: 15,
    marginTop: 16,
    backgroundColor: "lightgray", // Light gray background color
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
  },
  reviewText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  rateRiderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reviewInput: {
    height: 60,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    padding: 8,
  },
  submitButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ReviewScreen;
