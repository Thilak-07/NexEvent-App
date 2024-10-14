// screens/EventDetailsScreen.js
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    Button, // Import the Button component
} from "react-native";
import apiClient from "../services/apiClient";

const formatContent = (text) => {
    return text
        .replace(/\\r/g, "")
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((line, index) => (
            <Text key={index} style={styles.paragraph}>
                {line.trim()}
            </Text>
        ));
};

const EventDetailsScreen = ({ route }) => {
    const { eventId } = route.params;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await apiClient.get(`/events/${eventId}/`);
                setEvent(response.data);
            } catch (error) {
                Alert.alert("Failed to fetch event details:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.loaderContainer}>
                <Text>Event details not available</Text>
            </View>
        );
    }

    // Dummy register handler function
    const handleRegister = () => {
        Alert.alert(
            "Registration",
            "You have successfully registered for the event!"
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: event.feature_image }} style={styles.image} />
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.date}>{formatDate(event.date_time)}</Text>
            <Text style={styles.location}>{event.location}</Text>

            {/* Register Button */}
            <View style={styles.buttonContainer}>
                <Button title="Register" onPress={handleRegister} />
            </View>

            {/* About Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <View style={styles.divider} />
                {formatContent(event.description)}
            </View>

            {/* Terms and Conditions Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Terms and Conditions</Text>
                <View style={styles.divider} />
                {formatContent(event.terms_and_conditions)}
            </View>
        </ScrollView>
    );
};

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    date: {
        fontSize: 16,
        color: "#888",
        marginBottom: 8,
    },
    location: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },
    buttonContainer: {
        marginBottom: 24, // Add some margin below the button
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 8,
    },
});

export default EventDetailsScreen;
