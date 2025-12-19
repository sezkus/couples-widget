// Main App Entry Point
import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [refreshCallback, setRefreshCallback] = useState(null);

  const handleOpenSettings = (refreshFn) => {
    setRefreshCallback(() => refreshFn);
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    if (refreshCallback) {
      refreshCallback();
    }
  };

  return (
    <>
      <HomeScreen onOpenSettings={handleOpenSettings} />

      <Modal
        visible={showSettings}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SettingsScreen
          onClose={handleCloseSettings}
          onSave={handleSaveSettings}
        />
      </Modal>
    </>
  );
}
