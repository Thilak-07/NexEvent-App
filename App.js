// App.js
import React from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";

const Stack = createStackNavigator();

const App = () => {
    const handleLogout = async (navigation) => {
        // Confirmation alert before logging out
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            // Clear tokens and other stored data
                            await AsyncStorage.removeItem("accessToken");
                            await AsyncStorage.removeItem("refreshToken");
                            // Navigate back to the login screen
                            navigation.replace("Login");
                        } catch (error) {
                            Alert.alert("Logout failed:", error.message);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ title: "Create Account" }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <Icon
                                name="sign-out"
                                size={24}
                                color="black"
                                onPress={() => handleLogout(navigation)}
                                style={{ marginRight: 10 }}
                            />
                        ),
                    })}
                />
                <Stack.Screen
                    name="EventDetails"
                    component={EventDetailsScreen}
                    options={{ title: "Event Details" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
