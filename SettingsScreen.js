import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function SettingsScreen({ route }) {
  const { teamCode } = route?.params || {};
  const [amount, setAmount] = useState('3');

  const updateAmount = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      Alert.alert("Ungültiger Betrag");
      return;
    }
    const { error } = await supabase
      .from('team_wallet')
      .update({ default_amount: value })
      .eq('team_code', teamCode);

    if (!error) Alert.alert("Betrag aktualisiert");
  };

  const clearBalance = async () => {
    const { error } = await supabase
      .from('team_wallet')
      .update({ balance: 0 })
      .eq('team_code', teamCode);
    if (!error) Alert.alert("Kasse geleert");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin-Einstellungen</Text>
      <TextInput
        placeholder="Betrag (€)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <Button title="Betrag speichern" onPress={updateAmount} />
      <View style={{ height: 20 }} />
      <Button title="Kasse leeren" onPress={clearBalance} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
});