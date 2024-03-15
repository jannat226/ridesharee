import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { auth, db } from '../config/firebaseConfig';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (typeof (user) !== "undefined") {

            await SplashScreen.hideAsync();
        }
    }, [user]);

    if (typeof (user) === "undefined") {
        return null;
    }

    return (
        <FirebaseContext.Provider value={{ auth, user, db }}>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                {children}
            </View>
        </FirebaseContext.Provider>
    );
};


