import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function VotingScreen({ route }) {
  const { teamCode } = route?.params || {};
  const [members, setMembers] = useState([]);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase
      .from('members')
      .select('*')
      .eq('team_code', teamCode);

    setMembers(data || []);
  };

  const votePhrase = async (name) => {
    const updated = { ...votes, [name]: (votes[name] || 0) + 1 };
    setVotes(updated);
    const majority = Math.ceil(members.length / 2);

    if (updated[name] >= majority) {
      setLoading(true);
      const { error } = await supabase
        .from('team_wallet')
        .update({ balance: supabase.rpc('increment_balance', { amount: 3 }) })
        .eq('team_code', teamCode);
      if (!error) Alert.alert("+3 €", `${name} hat eine Phrase gesagt.`);
      setVotes({});
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wer hat eine Phrase gesagt?</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name}</Text>
            <Button title="Abstimmen" onPress={() => votePhrase(item.name)} disabled={loading} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
});