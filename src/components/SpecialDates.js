// Special Dates Component
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { formatDate, getDaysUntil } from '../utils/dateUtils';

const SpecialDates = ({ dates, startDate }) => {
    const daysUntilAnniversary = getDaysUntil(startDate);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="calendar-outline" size={24} color={theme.colors.primary} />
                <Text style={styles.title}>Özel Tarihlerimiz</Text>
            </View>

            {/* Anniversary Countdown */}
            <View style={styles.anniversaryCard}>
                <Ionicons name="heart-circle" size={32} color={theme.colors.heartRed} />
                <View style={styles.anniversaryInfo}>
                    <Text style={styles.anniversaryLabel}>Bir sonraki yıldönümü</Text>
                    {daysUntilAnniversary === 0 ? (
                        <Text style={styles.todayText}>🎉 Bugün! Kutlu olsun! 🎉</Text>
                    ) : (
                        <Text style={styles.countdownText}>
                            {daysUntilAnniversary} gün kaldı! 💕
                        </Text>
                    )}
                </View>
            </View>

            {/* Special Dates List */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.datesList}
            >
                {dates.map((item) => (
                    <View key={item.id} style={styles.dateCard}>
                        <Text style={styles.dateEmoji}>{item.emoji}</Text>
                        <Text style={styles.dateTitle}>{item.title}</Text>
                        <Text style={styles.dateValue}>{formatDate(item.date)}</Text>
                    </View>
                ))}
            </ScrollView>
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
    anniversaryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 23, 68, 0.1)',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        gap: theme.spacing.md,
    },
    anniversaryInfo: {
        flex: 1,
    },
    anniversaryLabel: {
        fontSize: 12,
        color: theme.colors.text,
        opacity: 0.7,
    },
    countdownText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.secondary,
    },
    todayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.heartRed,
    },
    datesList: {
        flexDirection: 'row',
    },
    dateCard: {
        backgroundColor: 'rgba(255, 107, 157, 0.1)',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginRight: theme.spacing.sm,
        alignItems: 'center',
        minWidth: 120,
    },
    dateEmoji: {
        fontSize: 28,
        marginBottom: theme.spacing.xs,
    },
    dateTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    dateValue: {
        fontSize: 12,
        color: theme.colors.text,
        opacity: 0.7,
    },
});

export default SpecialDates;
