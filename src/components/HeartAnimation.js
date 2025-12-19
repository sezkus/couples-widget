// Floating Heart Animation Component
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const FloatingHeart = ({ delay, duration, startX, size }) => {
    const translateY = useRef(new Animated.Value(height + 50)).current;
    const translateX = useRef(new Animated.Value(startX)).current;
    const opacity = useRef(new Animated.Value(0.8)).current;
    const scale = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animate = () => {
            translateY.setValue(height + 50);
            opacity.setValue(0.8);
            scale.setValue(0.3);

            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: -100,
                    duration: duration,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: duration * 0.3,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scale, {
                        toValue: 0.6,
                        duration: duration * 0.7,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: duration * 0.2,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: duration * 0.8,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(translateX, {
                        toValue: startX + 30,
                        duration: duration * 0.5,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateX, {
                        toValue: startX - 20,
                        duration: duration * 0.5,
                        useNativeDriver: true,
                    }),
                ]),
            ]).start(() => {
                setTimeout(animate, delay);
            });
        };

        const timer = setTimeout(animate, delay);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Animated.View
            style={[
                styles.heart,
                {
                    transform: [
                        { translateY },
                        { translateX },
                        { scale },
                    ],
                    opacity,
                },
            ]}
        >
            <Ionicons
                name="heart"
                size={size}
                color={Math.random() > 0.5 ? theme.colors.heartRed : theme.colors.primary}
            />
        </Animated.View>
    );
};

const HeartAnimation = () => {
    const hearts = [
        { id: 1, delay: 0, duration: 6000, startX: width * 0.1, size: 20 },
        { id: 2, delay: 1000, duration: 7000, startX: width * 0.3, size: 16 },
        { id: 3, delay: 2000, duration: 5500, startX: width * 0.5, size: 24 },
        { id: 4, delay: 3000, duration: 6500, startX: width * 0.7, size: 18 },
        { id: 5, delay: 4000, duration: 5000, startX: width * 0.9, size: 22 },
    ];

    return (
        <View style={styles.container} pointerEvents="none">
            {hearts.map((heart) => (
                <FloatingHeart key={heart.id} {...heart} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
        overflow: 'hidden',
    },
    heart: {
        position: 'absolute',
    },
});

export default HeartAnimation;
