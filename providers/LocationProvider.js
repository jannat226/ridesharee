import React, { createContext, useCallback, useEffect, useState } from 'react';
import * as Location from "expo-location";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({
        latitude: 0.0,
        longitude: 0.0,
        hasPermission: false,
    });

    useEffect(() => {
        Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High },
            (loc) => {
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    hasPermission: true,
                });
            }
        );
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log("asking for permmission");
            if (status !== "granted") {
                setLocation((prev) => ({ ...prev, hasPermission: false }))
                console.log("Permission to access location was denied");
                Alert.alert("Permission to access location was denied");
                return;
            } else {
                console.log("Permission granted");
            }
        })();
    }, []);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    );
};


