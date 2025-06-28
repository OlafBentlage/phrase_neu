
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whncdupzgukzaelbwbki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobmNkdXB6Z3VremFlbGJ3YmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNDE0NDYsImV4cCI6MjA2NjYxNzQ0Nn0.z1HgamDkl330SbqbtABjzCflGwaI-QrFEcGBmwesX_I';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [teamCode, setTeamCode] = useState('');
  const [teamId, setTeamId] = useState(null);
  const [error, setError] = useState(null);

  const handleJoinTeam = async () => {
    const { data, error } = await supabase
      .from('teams')
      .select('id')
      .eq('code', teamCode)
      .single();

    if (error) {
      setError('Teamcode nicht gefunden');
      setTeamId(null);
    } else {
      setTeamId(data.id);
      setError(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phrasenschwein</Text>
      <TextInput
        style={styles.input}
        placeholder="Teamcode eingeben"
        value={teamCode}
        onChangeText={setTeamCode}
      />
      <Button title="Team beitreten" onPress={handleJoinTeam} />
      {teamId && <Text style={styles.success}>Team-ID: {teamId}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, width: '100%', marginBottom: 12 },
  success: { marginTop: 12, color: 'green' },
  error: { marginTop: 12, color: 'red' },
});
