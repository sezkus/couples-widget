// Home Screen - Main widget display
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { loadData } from '../utils/storage';
import RelationshipCounter from '../components/RelationshipCounter';
import SharedSong from '../components/SharedSong';
import SpecialDates from '../components/SpecialDates';
import CouplePhoto from '../components/CouplePhoto';
import HeartAnimation from '../components/HeartAnimation';

const HomeScreen = ({ onOpenSettings }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const savedData = await loadData();
        setData(savedData);
    };

    // Refresh data when coming back from settings
    const refreshData = async () => {
        await loadUserData();
    };

    if (!data) {
        return (
            <View style={styles.loadingContainer}>
                <Ionicons name="heart" size={60} color={theme.colors.primary} />
                <Text style={styles.loadingText}>Yükleniyor...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                style={styles.gradient}
            >
                <HeartAnimation />

                <SafeAreaView style={styles.safeArea}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>❤️ Bizim Hikayemiz ❤️</Text>
                        <TouchableOpacity
                            style={styles.settingsButton}
                            onPress={() => onOpenSettings(refreshData)}
                        >
                            <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Couple Photo */}
                        <CouplePhoto
                            photo={data.photo}
                            partnerName={data.partnerName}
                        />

                        {/* Relationship Counter */}
                        <RelationshipCounter startDate={data.startDate} />

                        {/* Shared Song */}
                        <SharedSong song={data.song} />

                        {/* Special Dates */}
                        <SpecialDates
                            dates={data.specialDates}
                            startDate={data.startDate}
                        />

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Aşk ile yapıldı 💕
                            </Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.gradientStart,
    },
    loadingText: {
        marginTop: theme.spacing.md,
        fontSize: 16,
        color: theme.colors.text,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        position: 'relative',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    settingsButton: {
        position: 'absolute',
        right: theme.spacing.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.cardBg,
        borderRadius: theme.borderRadius.full,
        ...theme.shadows.card,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xl,
    },
    footer: {
        alignItems: 'center',
        marginTop: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    footerText: {
        fontSize: 14,
        color: theme.colors.text,
        opacity: 0.6,
    },
});

export default HomeScreen;
