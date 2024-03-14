import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LatLng, LeafletView, MapMarker } from "react-native-leaflet-view";

const Map = () => {
  return (
    <View>
      <Text>I'm a map</Text>

      <LeafletView
        mapCenterPosition={{
          lat: 12.935776615383235,
          lng: 77.60592112615925,
        }}
        // ownPositionMarker={{
        //   position: {
        //     lat: 12.935776615383235,
        //     lng: 77.60592112615925,
        //   },
        // }}

        // ownPositionMarker={{
        //   id: "1",
        //   position: { lat: "12.935776615383235", lng: "77.60592112615925" },
        //   // icon: "❤️",
        //   // size: [24, 24],
        //   // animation: {
        //   //   name: AnimationType.BOUNCE,
        //   //   duration: ".5",
        //   //   delay: 0,
        //   //   interationCount: INFINITE_ANIMATION_ITERATIONS,
        //   // },
        // }}
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
