// Couple Photo Component with Heart Frame
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

const CouplePhoto = ({ photo, partnerName }) => {
    return (
        <View style={styles.container}>
            <View style={styles.heartFrame}>
                {/* Decorative hearts */}
                <View style={[styles.floatingHeart, styles.heart1]}>
                    <Ionicons name="heart" size={16} color={theme.colors.heartRed} />
                </View>
                <View style={[styles.floatingHeart, styles.heart2]}>
                    <Ionicons name="heart" size={12} color={theme.colors.primary} />
                </View>
                <View style={[styles.floatingHeart, styles.heart3]}>
                    <Ionicons name="heart" size={14} color={theme.colors.secondary} />
                </View>

                {/* Photo or placeholder */}
                <View style={styles.photoContainer}>
                    {photo ? (
                        <Image source={{ uri: photo }} style={styles.photo} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Ionicons name="heart" size={60} color={theme.colors.primary} />
                            <Text style={styles.placeholderText}>Fotoğraf Ekle</Text>
                        </View>
                    )}
                </View>

                {/* Heart border decoration */}
                <View style={styles.heartBorder}>
                    <Ionicons name="heart" size={20} color={theme.colors.heartRed} />
                </View>
            </View>

            <Text style={styles.partnerName}>
                Ben & {partnerName} 💕
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
        marginHorizontal: theme.spacing.md,
    },
    heartFrame: {
        position: 'relative',
        width: 180,
        height: 180,
    },
    photoContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 4,
        borderColor: theme.colors.primary,
        overflow: 'hidden',
        position: 'absolute',
        top: 10,
        left: 10,
        ...theme.shadows.card,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        flex: 1,
        backgroundColor: 'rgba(255, 107, 157, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: theme.colors.primary,
        fontSize: 12,
        marginTop: theme.spacing.sm,
    },
    floatingHeart: {
        position: 'absolute',
        zIndex: 10,
    },
    heart1: {
        top: 0,
        right: 10,
    },
    heart2: {
        top: 30,
        left: 0,
    },
    heart3: {
        bottom: 20,
        right: 0,
    },
    heartBorder: {
        position: 'absolute',
        bottom: 0,
        right: 30,
        backgroundColor: theme.colors.textLight,
        borderRadius: 20,
        padding: 6,
        ...theme.shadows.card,
    },
    partnerName: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.text,
        marginTop: theme.spacing.md,
    },
});

export default CouplePhoto;
