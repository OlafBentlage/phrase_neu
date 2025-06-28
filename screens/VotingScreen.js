import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabaseClient';

export default function VotingScreen() {
  const [teamId, setTeamId] = useState('demo-team'); // Platzhalter
  const [userId, setUserId] = useState('user-123');  // Platzhalter
  const [votes, setVotes] = useState([]);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .eq('team_id', teamId);

    if (error) {
      console.error(error);
    } else {
      setVotes(data);
    }
  };

  const submitVote = async () => {
    if (voted) {
      Alert.alert("Schon abgestimmt");
      return;
    }

    const { error } = await supabase.from('votes').insert([
      { team_id: teamId, user_id: userId }
    ]);

    if (error) {
      console.error(error);
    } else {
      setVoted(true);
      Alert.alert("Deine Stimme wurde gezählt!");
      fetchVotes();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hat jemand eine Phrase gesagt?</Text>
      <Button title="Ja, Stimme abgeben" onPress={submitVote} />
      <Text style={styles.count}>Aktuelle Stimmen: {votes.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  count: { marginTop: 20, fontSize: 16, textAlign: 'center' }
});
