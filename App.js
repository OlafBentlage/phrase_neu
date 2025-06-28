import * as React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LoginScreen from './LoginScreen';
import VotingScreen from './VotingScreen';
import StatisticsScreen from './StatisticsScreen';
import SettingsScreen from './SettingsScreen';
import { lightTheme, darkTheme } from './theme';

function HomeScreen({ route }) {
  const { teamName } = route?.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Willkommen beim Phrasenschwein</Text>
      <Image source={require('./assets/welcome.png')} style={styles.image} />
      <Text style={styles.subtitle}>Team: {teamName || 'Unbekannt'}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = React.useState(null);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Start') iconName = 'home';
              else if (route.name === 'Abstimmen') iconName = 'comment-check';
              else if (route.name === 'Statistik') iconName = 'chart-bar';
              else if (route.name === 'Einstellungen') iconName = 'cog';
              return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Start" children={() => <HomeScreen route={{ params: user }} />} />
          <Tab.Screen name="Abstimmen" children={() => <VotingScreen route={{ params: user }} />} />
          <Tab.Screen name="Statistik" children={() => <StatisticsScreen route={{ params: user }} />} />
          <Tab.Screen name="Einstellungen" children={() => <SettingsScreen route={{ params: user }} />} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});