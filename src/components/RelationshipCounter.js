// Relationship Counter Component - Shows time together
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { calculateTimeTogether } from '../utils/dateUtils';
import { theme } from '../styles/theme';

const RelationshipCounter = ({ startDate }) => {
    const [time, setTime] = useState(calculateTimeTogether(startDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTimeTogether(startDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <LinearGradient
            colors={[theme.colors.primary, theme.colors.secondary]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.iconRow}>
                <Ionicons name="heart" size={24} color={theme.colors.textLight} />
                <Text style={styles.title}>Birlikte</Text>
                <Ionicons name="heart" size={24} color={theme.colors.textLight} />
            </View>

            <View style={styles.mainTimeRow}>
                {time.years > 0 && (
                    <View style={styles.timeBlock}>
                        <Text style={styles.bigNumber}>{time.years}</Text>
                        <Text style={styles.label}>Yıl</Text>
                    </View>
                )}
                {(time.years > 0 || time.months > 0) && (
                    <View style={styles.timeBlock}>
                        <Text style={styles.bigNumber}>{time.months}</Text>
                        <Text style={styles.label}>Ay</Text>
                    </View>
                )}
                <View style={styles.timeBlock}>
                    <Text style={styles.bigNumber}>{time.days}</Text>
                    <Text style={styles.label}>Gün</Text>
                </View>
            </View>

            <View style={styles.detailTimeRow}>
                <View style={styles.smallTimeBlock}>
                    <Text style={styles.smallNumber}>{String(time.hours).padStart(2, '0')}</Text>
                    <Text style={styles.smallLabel}>Saat</Text>
                </View>
                <Text style={styles.separator}>:</Text>
                <View style={styles.smallTimeBlock}>
                    <Text style={styles.smallNumber}>{String(time.minutes).padStart(2, '0')}</Text>
                    <Text style={styles.smallLabel}>Dakika</Text>
                </View>
                <Text style={styles.separator}>:</Text>
                <View style={styles.smallTimeBlock}>
                    <Text style={styles.smallNumber}>{String(time.seconds).padStart(2, '0')}</Text>
                    <Text style={styles.smallLabel}>Saniye</Text>
                </View>
            </View>

            <Text style={styles.totalDays}>
                Toplam {time.totalDays.toLocaleString('tr-TR')} gün 💕
            </Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.sm,
        alignItems: 'center',
        ...theme.shadows.card,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.textLight,
        letterSpacing: 1,
    },
    mainTimeRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    timeBlock: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        minWidth: 80,
    },
    bigNumber: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.colors.textLight,
    },
    label: {
        fontSize: 14,
        color: theme.colors.textLight,
        opacity: 0.9,
    },
    detailTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        gap: theme.spacing.xs,
    },
    smallTimeBlock: {
        alignItems: 'center',
    },
    smallNumber: {
        fontSize: 24,
        fontWeight: '600',
        color: theme.colors.textLight,
    },
    smallLabel: {
        fontSize: 10,
        color: theme.colors.textLight,
        opacity: 0.8,
    },
    separator: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.textLight,
        marginHorizontal: theme.spacing.xs,
    },
    totalDays: {
        fontSize: 14,
        color: theme.colors.textLight,
        fontStyle: 'italic',
    },
});

export default RelationshipCounter;
