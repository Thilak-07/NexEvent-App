// screens/LoginScreen.js
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { loginUser } from "../services/authService";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        if (email == "test@example.com" && password == "admin") {
            navigation.navigate("Home");
            setLoading(false);
        } else {
            try {
                const user = await loginUser(email, password);
                if (user) {
                    navigation.navigate("Home");
                }
            } catch (error) {
                Alert.alert("Login Failed", "Invalid credentials");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>NexEvent</Text>
            <Text style={styles.title}>Login</Text>
            <View style={styles.box}>
                <Text style={styles.label}>Email</Text>
                <View
                    style={[
                        styles.inputContainer,
                        emailFocused && styles.inputFocused,
                    ]}
                >
                    <MaterialIcons
                        name="email"
                        size={24}
                        color="#ccc"
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        onFocus={() => setEmailFocused(true)} // Set focus state
                        onBlur={() => setEmailFocused(false)} // Reset focus state
                    />
                </View>
                <Text style={styles.label}>Password</Text>
                <View
                    style={[
                        styles.inputContainer,
                        passwordFocused && styles.inputFocused,
                    ]}
                >
                    <MaterialIcons
                        name="lock"
                        size={24}
                        color="#ccc"
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        secureTextEntry={!passwordVisible} // Toggle visibility
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setPasswordFocused(true)} // Set focus state
                        onBlur={() => setPasswordFocused(false)} // Reset focus state
                    />
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <MaterialIcons
                            name={
                                passwordVisible
                                    ? "visibility-off"
                                    : "visibility"
                            }
                            size={24}
                            color="#007bff"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.linkText}>
                        New to NexEvent? Create an account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    appTitle: {
        fontSize: 36,
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
    },
    title: {
        fontSize: 25,
        marginBottom: 30,
        textAlign: "center",
        fontWeight: "light",
    },
    box: {
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "bold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
    },
    inputFocused: {
        borderColor: "#007bff",
        borderWidth: 2,
    },
    button: {
        height: 50,
        borderRadius: 5,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    linksContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    linkText: {
        color: "#007bff",
        fontSize: 16,
        marginVertical: 1,
    },
});

export default LoginScreen;
