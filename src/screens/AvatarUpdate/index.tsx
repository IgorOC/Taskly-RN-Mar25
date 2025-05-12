import React, { useRef,useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import axios from 'axios';
import { useTheme } from '../../theme/ThemeContext';
import { Theme } from '../../theme/Theme';
import { useRoute } from '@react-navigation/native';

const updateAvatar = async (data: { picture: string }, token: string) => {
    const response = await axios.put(
        'http://15.229.11.44:3000/profile/avatar',
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};
import { useAuth } from '../../context/AuthContext'; // Para obter o token do usuário
import BackMenu from '../../components/BackButtom';
import { calculateProgressBarWidth } from '../../utils/AnimationUtils';
import { updateProfileName } from '../../services/api';

const avatars = [
  { id: 1, source: require('../../assets/avatarr1.png') },
  { id: 2, source: require('../../assets/avatarr2.png') },
  { id: 3, source: require('../../assets/avatarr3.png') },
  { id: 4, source: require('../../assets/avatarr4.png') },
  { id: 5, source: require('../../assets/avatarr5.png') },
];

const AvatarUpdate: React.FC = () => {
  const { idToken } = useAuth(); // Obtém o token do usuário autenticado
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [progressoAtual, setProgressoAtual] = useState(0);
  const progressoTotal = 100;
  const [carregando, setCarregando] = useState(true);
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const { widthInterpolation, progressPercentage } = calculateProgressBarWidth(
      animatedProgress,
      progressoAtual,
      progressoTotal,
    );

    //Recebendo parametros
    const route = useRoute();
    const { fullName } = route.params as { fullName: string };
    console.log("teste route "+fullName);

    //enviando parametros
    const navigation = useNavigation();

useEffect(() => {
    // Simulação de um processo de carregamento
    let contador = 50;
      setProgressoAtual(contador);

      if (contador >= progressoTotal) {
        setCarregando(false);
      }


  }, []);

  const incrementProgress = () => {
    setProgressoAtual((prev) => Math.min(prev + 50, progressoTotal));
  };


  const handleSelectAvatar = (id: number) => {
    setSelectedAvatarId(id);
    incrementProgress();
  };

  const handleConfirmSelection = async () => {
    if (selectedAvatarId === null) {

      Alert.alert('Aviso', 'Por favor, selecione um avatar para continuar.');
      return;
    }
    try {
      setLoading(true);
  
      // Atualiza o avatar
      const avatarId = `avatar_${selectedAvatarId}`;
      await updateAvatar({ picture: avatarId }, idToken); // Chama a API para atualizar o avatar
  
      // Atualiza o nome do perfil
      await updateProfileName(fullName); // Chama a API para atualizar o nome do perfil
  
      // Chamada do modal da tela menu
      navigation.navigate('Home', { avatarUpdated: true });
      Alert.alert('Sucesso', 'Avatar e nome atualizados com sucesso!');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error.message || 'Falha ao atualizar o avatar e o nome');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View>
          <BackMenu text="EDIÇÂO DE PERFIL" />
      </View>
      <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                { width: widthInterpolation },
              ]}
                        />
          </View>
        </View>



      <View style={styles.container}>
        <Text style={styles.title}>ATUALIZE SEU AVATAR</Text>
        <Text style={styles.subtitle}>(Escolha somente um)</Text>
        <View style={styles.avatarContainer}>
          {avatars.map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              style={[
                styles.avatarButton,
                selectedAvatarId === avatar.id && styles.selectedAvatarButton,
              ]}
              onPress={() => handleSelectAvatar(avatar.id)}
              activeOpacity={0.7}
            >
              <Image
                source={avatar.source}
                style={[
                  styles.avatarImage,
                  selectedAvatarId !== null &&
                    selectedAvatarId !== avatar.id &&
                    styles.opaqueAvatar,
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>





        <Button

          title="CONFIRMAR SELEÇÃO"
          onPress={handleConfirmSelection}
          loading={loading}
          disabled={loading || selectedAvatarId === null}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme: Theme) =>StyleSheet.create({
  safeArea: {
     flex: 1,
     backgroundColor:theme.colors.background,
     paddingTop: 40,
     paddingBottom:20,

    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.mainText,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.secondaryText,
    marginBottom: 32,
    textAlign: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
  },
  avatarButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatarButton: { borderColor: '#6200EE' },
  avatarImage: { width: '100%', height: '100%' },
  opaqueAvatar: { opacity: 0.4 },
  btn:{
    color:theme.colors.mainText,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop:40,
  },
  progressBarBackground: {
    backgroundColor: theme.colors.primaryLight,
    height: 8,
    flex: 1,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: theme.colors.primary,
    height: '100%',
    paddingTop:40,
  },
});

export default AvatarUpdate;