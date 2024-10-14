// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
} from "react-native";
import apiClient from "../services/apiClient";

const HomeScreen = ({ navigation }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get("/events/");
                setEvents(response.data);
            } catch (error) {
                Alert.alert("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const renderEventCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.feature_image }} style={styles.image} />
            <Text style={styles.date}>{formatDate(item.date_time)}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>{item.location}</Text>
        </View>
    );

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Explore the Best Events Happening Around You
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={events}
                    renderItem={renderEventCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        color: "#333",
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    date: {
        fontSize: 14,
        color: "#888",
        marginTop: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 4,
    },
    location: {
        fontSize: 16,
        color: "#555",
        marginTop: 4,
    },
});

export default HomeScreen;
