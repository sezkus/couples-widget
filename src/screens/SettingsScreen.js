// Settings Screen - Customize widget data
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../styles/theme';
import { loadData, saveData } from '../utils/storage';
import { formatDate } from '../utils/dateUtils';

const SettingsScreen = ({ onClose, onSave }) => {
    const [data, setData] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentDateField, setCurrentDateField] = useState(null);
    const [tempDate, setTempDate] = useState(new Date());

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const savedData = await loadData();
        setData(savedData);
    };

    const handleSave = async () => {
        const success = await saveData(data);
        if (success) {
            Alert.alert('Başarılı', 'Ayarlar kaydedildi! 💕');
            if (onSave) onSave();
            onClose();
        } else {
            Alert.alert('Hata', 'Ayarlar kaydedilemedi.');
        }
    };

    const openDatePicker = (field, currentValue) => {
        setCurrentDateField(field);
        setTempDate(new Date(currentValue));
        setShowDatePicker(true);
    };

    const handleDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }

        if (selectedDate && currentDateField) {
            const dateString = selectedDate.toISOString().split('T')[0];

            if (currentDateField === 'startDate') {
                setData({ ...data, startDate: dateString });
            } else if (currentDateField.startsWith('special_')) {
                const index = parseInt(currentDateField.split('_')[1]);
                const newDates = [...data.specialDates];
                newDates[index] = { ...newDates[index], date: dateString };
                setData({ ...data, specialDates: newDates });
            }
        }
    };

    const addSpecialDate = () => {
        const newDate = {
            id: Date.now().toString(),
            title: 'Yeni Tarih',
            date: new Date().toISOString().split('T')[0],
            emoji: '❤️',
        };
        setData({ ...data, specialDates: [...data.specialDates, newDate] });
    };

    const removeSpecialDate = (index) => {
        const newDates = data.specialDates.filter((_, i) => i !== index);
        setData({ ...data, specialDates: newDates });
    };

    const updateSpecialDate = (index, field, value) => {
        const newDates = [...data.specialDates];
        newDates[index] = { ...newDates[index], [field]: value };
        setData({ ...data, specialDates: newDates });
    };

    if (!data) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={28} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ayarlar</Text>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Kaydet</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Partner Name */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💕 Partner Adı</Text>
                    <TextInput
                        style={styles.input}
                        value={data.partnerName}
                        onChangeText={(text) => setData({ ...data, partnerName: text })}
                        placeholder="Partner adını girin"
                        placeholderTextColor={theme.colors.text + '80'}
                    />
                </View>

                {/* Start Date */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📅 İlişki Başlangıç Tarihi</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => openDatePicker('startDate', data.startDate)}
                    >
                        <Text style={styles.dateButtonText}>{formatDate(data.startDate)}</Text>
                        <Ionicons name="calendar" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Song Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🎵 Ortak Şarkımız</Text>
                    <TextInput
                        style={styles.input}
                        value={data.song.title}
                        onChangeText={(text) =>
                            setData({ ...data, song: { ...data.song, title: text } })
                        }
                        placeholder="Şarkı adı"
                        placeholderTextColor={theme.colors.text + '80'}
                    />
                    <TextInput
                        style={[styles.input, styles.inputMargin]}
                        value={data.song.artist}
                        onChangeText={(text) =>
                            setData({ ...data, song: { ...data.song, artist: text } })
                        }
                        placeholder="Sanatçı"
                        placeholderTextColor={theme.colors.text + '80'}
                    />
                    <TextInput
                        style={[styles.input, styles.inputMargin]}
                        value={data.song.spotifyUrl}
                        onChangeText={(text) =>
                            setData({ ...data, song: { ...data.song, spotifyUrl: text } })
                        }
                        placeholder="Spotify URL (isteğe bağlı)"
                        placeholderTextColor={theme.colors.text + '80'}
                        autoCapitalize="none"
                    />
                </View>

                {/* Special Dates */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>🎉 Özel Tarihler</Text>
                        <TouchableOpacity onPress={addSpecialDate} style={styles.addButton}>
                            <Ionicons name="add-circle" size={28} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {data.specialDates.map((item, index) => (
                        <View key={item.id} style={styles.specialDateCard}>
                            <View style={styles.specialDateInputs}>
                                <TextInput
                                    style={[styles.input, styles.emojiInput]}
                                    value={item.emoji}
                                    onChangeText={(text) => updateSpecialDate(index, 'emoji', text)}
                                    placeholder="😊"
                                />
                                <TextInput
                                    style={[styles.input, styles.titleInput]}
                                    value={item.title}
                                    onChangeText={(text) => updateSpecialDate(index, 'title', text)}
                                    placeholder="Başlık"
                                    placeholderTextColor={theme.colors.text + '80'}
                                />
                                <TouchableOpacity
                                    onPress={() => removeSpecialDate(index)}
                                    style={styles.deleteButton}
                                >
                                    <Ionicons name="trash-outline" size={20} color="#FF4444" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => openDatePicker(`special_${index}`, item.date)}
                            >
                                <Text style={styles.dateButtonText}>{formatDate(item.date)}</Text>
                                <Ionicons name="calendar" size={20} color={theme.colors.primary} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <View style={styles.spacer} />
            </ScrollView>

            {/* Date Picker Modal */}
            {showDatePicker && (
                <View style={styles.datePickerContainer}>
                    <View style={styles.datePickerHeader}>
                        <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                            <Text style={styles.datePickerButton}>Tamam</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePicker
                        value={tempDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        locale="tr-TR"
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    closeButton: {
        padding: theme.spacing.xs,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
    },
    saveButtonText: {
        color: theme.colors.textLight,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: theme.spacing.md,
    },
    section: {
        marginTop: theme.spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    input: {
        backgroundColor: theme.colors.cardBg,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontSize: 16,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 157, 0.3)',
    },
    inputMargin: {
        marginTop: theme.spacing.sm,
    },
    dateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.cardBg,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 107, 157, 0.3)',
    },
    dateButtonText: {
        fontSize: 16,
        color: theme.colors.text,
    },
    addButton: {
        marginBottom: theme.spacing.md,
    },
    specialDateCard: {
        backgroundColor: 'rgba(255, 107, 157, 0.1)',
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    specialDateInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
        gap: theme.spacing.sm,
    },
    emojiInput: {
        width: 60,
        textAlign: 'center',
    },
    titleInput: {
        flex: 1,
    },
    deleteButton: {
        padding: theme.spacing.sm,
    },
    datePickerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.cardBg,
        borderTopLeftRadius: theme.borderRadius.lg,
        borderTopRightRadius: theme.borderRadius.lg,
        ...theme.shadows.card,
    },
    datePickerHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    datePickerButton: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    spacer: {
        height: 100,
    },
});

export default SettingsScreen;
