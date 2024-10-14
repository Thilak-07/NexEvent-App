// authService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";

export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post("/auth/login/", {
            email,
            password,
        });

        const { access, refresh, user } = response.data;

        // Store tokens in AsyncStorage
        await AsyncStorage.setItem("accessToken", access);
        await AsyncStorage.setItem("refreshToken", refresh);

        return user;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
