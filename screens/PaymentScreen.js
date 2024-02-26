// import React from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// const PaymentScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Ride Completed!</Text>
//       </View>

//       <View style={styles.detailsSection}>
//         <Text style={styles.detailsText}>Details:</Text>
//         <Text>Driver Name: John Doe</Text>
//         <Text>Vehicle Number: Car-123</Text>
//         <Text>Department: Computer Science</Text>
//         <Text>Distance: 5 miles</Text>
//         <Text>Amount: $20.00</Text>
//       </View>

//       <View style={styles.paymentMethodsSection}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>Payment Methods</Text>
//         </View>

//         <TouchableOpacity style={styles.paymentMethodButton}>
//           <Text>Cash</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.paymentMethodButton}>
//           <Text>UPI</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.paymentMethodButton}>
//           <Text>Net Banking</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     alignItems: "center",
//     backgroundColor: "green",
//     paddingVertical: 10,
//     borderRadius: 5,
//     width: 340,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "white",
//   },
//   detailsSection: {
//     marginBottom: 16,
//     backgroundColor: "#d6f5d6",
//     padding: 16,
//     borderRadius: 5,
//   },
//   detailsText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//     color: "black",
//   },
//   paymentMethodsSection: {
//     alignItems: "center",
//     // paddingVertical: 10,
//     borderRadius: 15,
//     marginTop: 16,
//     backgroundColor: "lightgray", // Light gray background color
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     alignContent: "center",
//   },
//   paymentMethodsText: {
//     borderRadius: 15,
//     alignContent: "center",
//     backgroundColor: "green",
//     fontSize: 24,
//     width: 345,
//     fontWeight: "bold",
//     color: "white",

//     borderRadius: 15,
//     padding: 12,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   paymentMethodButton: {
//     marginTop: 10,
//     backgroundColor: "#d6f5d6",
//     padding: 10,
//     width: 340,
//     borderRadius: 5,
//     marginBottom: 8,
//     alignItems: "center",
//   },
// });

// export default PaymentScreen;
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PaymentScreen = () => {
  const navigation = useNavigation();

  const handlePaymentMethodPress = () => {
    // Add logic for handling payment method press
    // For now, navigate to the ReviewScreen
    navigation.navigate("ReviewScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ride Completed!</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.detailsText}>Details:</Text>
        <Text>Driver Name: John Doe</Text>
        <Text>Vehicle Number: Car-123</Text>
        <Text>Department: Computer Science</Text>
        <Text>Distance: 5 miles</Text>
        <Text>Amount: $20.00</Text>
      </View>

      <View style={styles.paymentMethodsSection}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Payment Methods</Text>
        </View>

        <TouchableOpacity
          style={styles.paymentMethodButton}
          onPress={handlePaymentMethodPress}
        >
          <Text>Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentMethodButton}
          onPress={handlePaymentMethodPress}
        >
          <Text>UPI</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentMethodButton}
          onPress={handlePaymentMethodPress}
        >
          <Text>Net Banking</Text>
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
  paymentMethodsSection: {
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
    alignContent: "center",
  },
  paymentMethodsText: {
    borderRadius: 15,
    alignContent: "center",
    backgroundColor: "green",
    fontSize: 24,
    width: 345,
    fontWeight: "bold",
    color: "white",

    borderRadius: 15,
    padding: 12,
    fontSize: 18,
    fontWeight: "bold",
  },
  paymentMethodButton: {
    marginTop: 10,
    backgroundColor: "#d6f5d6",
    padding: 10,
    width: 340,
    borderRadius: 5,
    marginBottom: 8,
    alignItems: "center",
  },
});

export default PaymentScreen;
