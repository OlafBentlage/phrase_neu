import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function LoginScreen({ onLogin }) {
  const [teamCode, setTeamCode] = useState('');
  const [teamName, setTeamName] = useState('');

  const handleLogin = async () => {
    if (!teamCode || !teamName) {
      Alert.alert("Fehler", "Bitte Teamcode und Namen eingeben");
      return;
    }

    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('code', teamCode)
      .single();

    if (error || !data) {
      Alert.alert("Team nicht gefunden", "Prüfe den Code");
    } else {
      onLogin({ teamCode, teamName });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team beitreten</Text>
      <TextInput
        placeholder="Teamcode"
        value={teamCode}
        onChangeText={setTeamCode}
        style={styles.input}
      />
      <TextInput
        placeholder="Dein Name"
        value={teamName}
        onChangeText={setTeamName}
        style={styles.input}
      />
      <Button title="Beitreten" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
});