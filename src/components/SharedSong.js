// Shared Song Component
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

const SharedSong = ({ song }) => {
    const handleOpenSpotify = async () => {
        if (song.spotifyUrl) {
            try {
                await Linking.openURL(song.spotifyUrl);
            } catch (error) {
                console.error('Could not open URL:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="musical-notes" size={24} color={theme.colors.primary} />
                <Text style={styles.title}>Ortak Şarkımız</Text>
            </View>

            <View style={styles.songCard}>
                <View style={styles.albumCover}>
                    {song.albumCover ? (
                        <Image source={{ uri: song.albumCover }} style={styles.albumImage} />
                    ) : (
                        <View style={styles.placeholderAlbum}>
                            <Ionicons name="disc" size={40} color={theme.colors.primary} />
                        </View>
                    )}
                </View>

                <View style={styles.songInfo}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    <Text style={styles.artistName}>{song.artist}</Text>

                    {song.spotifyUrl && (
                        <TouchableOpacity style={styles.playButton} onPress={handleOpenSpotify}>
                            <Ionicons name="play-circle" size={20} color={theme.colors.textLight} />
                            <Text style={styles.playButtonText}>Spotify'da Aç</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.heartDecor}>
                    <Ionicons name="heart" size={20} color={theme.colors.heartRed} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.cardBg,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.sm,
        ...theme.shadows.card,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
    },
    songCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 107, 157, 0.1)',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
    },
    albumCover: {
        marginRight: theme.spacing.md,
    },
    albumImage: {
        width: 70,
        height: 70,
        borderRadius: theme.borderRadius.sm,
    },
    placeholderAlbum: {
        width: 70,
        height: 70,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: 'rgba(255, 107, 157, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    songInfo: {
        flex: 1,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    artistName: {
        fontSize: 14,
        color: theme.colors.text,
        opacity: 0.7,
        marginBottom: theme.spacing.sm,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.full,
        alignSelf: 'flex-start',
        gap: 4,
    },
    playButtonText: {
        color: theme.colors.textLight,
        fontSize: 12,
        fontWeight: '600',
    },
    heartDecor: {
        position: 'absolute',
        top: theme.spacing.sm,
        right: theme.spacing.sm,
    },
});

export default SharedSong;
