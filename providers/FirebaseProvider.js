// FirebaseContext.js
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

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

    if (user === undefined)
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );

    return (
        <FirebaseContext.Provider value={{ auth, user, db }}>
            {children}
        </FirebaseContext.Provider>
    );
};
