import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function StatisticsScreen({ route }) {
  const { teamCode } = route?.params || {};
  const [balance, setBalance] = useState(0);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: wallet } = await supabase
      .from('team_wallet')
      .select('balance')
      .eq('team_code', teamCode)
      .single();

    const { data: memberData } = await supabase
      .from('members')
      .select('name, paid')
      .eq('team_code', teamCode)
      .order('paid', { ascending: false });

    setBalance(wallet?.balance || 0);
    setMembers(memberData || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teamkasse: {balance.toFixed(2)} €</Text>
      <FlatList
        data={members}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name}</Text>
            <Text>{item.paid.toFixed(2)} €</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
});