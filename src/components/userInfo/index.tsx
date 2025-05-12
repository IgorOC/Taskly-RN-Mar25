import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Theme } from '../../theme/Theme';
import { useTheme } from '../../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfile } from '../../services/api';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  picture?: string;
}

interface UserInfoCardProps {
  userData: UserInfo | null;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ userData }) => {
  const [profile, setProfile] = useState<any | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
        setError('Não foi possível carregar o perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  if (!userData) {
    return null;
  }
  if (error) {
    return <Text>{error}</Text>;
  }

  console.log(loading);
  console.log(profile?.phone);

  return (
    <SafeAreaView style={styles.container}>
      {userData.picture && (
        <Image source={{ uri: userData.picture }} style={styles.profileImage} />
      )}
       <Image source={require(`../../assets/menu/profileImage.png`)} style={styles.profileImage} />
      <Text style={styles.name}>{profile?.name}</Text>
      <Text style={styles.email}>{profile?.email}</Text>
      <Text style={styles.phone}>{profile?.phone}</Text>
    </SafeAreaView>
  );
};

const getStyles = (theme: Theme) =>  StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 10,
    margin: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    ...theme.typography.subtitle,
    color: theme.colors.mainText,
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    ...theme.typography.regular,
    color: theme.colors.mainText,
    marginBottom: 5,
    textAlign: 'center',
},
phone: {
    textAlign: 'center',
    ...theme.typography.regular,
    color: theme.colors.mainText,
  },
});