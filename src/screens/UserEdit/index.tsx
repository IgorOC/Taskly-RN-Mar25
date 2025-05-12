import React, {useRef, useMemo, useState,useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { calculateProgressBarWidth } from '../../utils/AnimationUtils';
import { useTheme } from '../../theme/ThemeContext';
import { Theme } from '../../theme/Theme';
import { Platform } from 'react-native';
import BackMenu from '../../components/BackButtom';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import { formatPhoneNumber, validateFullName , validatePhone } from '../../utils/validation';
import Button from '../../components/Button';
import { getRememberedEmail } from '../../storage/userStorage';
import { useNavigation } from '@react-navigation/native';
import UpdateModal from '../../components/UpdateModal';


const UserEdit: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [carregando, setCarregando] = useState(true);
  const [progressoAtual, setProgressoAtual] = useState(0);
  const progressoTotal = 100;
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const { widthInterpolation, progressPercentage } = calculateProgressBarWidth(
    animatedProgress,
    progressoAtual,
    progressoTotal,
  );
  const [phoneProgressIncremented, setPhoneProgressIncremented] = useState(false);
  const [nameProgressIncremented, setNameProgressIncremented] = useState(false);
  useEffect(() => {
    // Simulação de um processo de carregamento
    let contador = 0;
      setProgressoAtual(contador);

      if (contador >= progressoTotal) {
        setCarregando(false);
      }


  }, []);

  const initialValues = useMemo(
      () => ({
        fullName: '',
        phone: '',
      }),
      [],
    );
    const validations = useMemo(
        () => ({
          fullName: validateFullName,
          phone: validatePhone,
        }),
        [],
      );

  const {formState, handleChange, handleBlur} =
    useForm(initialValues, validations);

    const handleContinue = async () => {
      navigation.navigate('AvatarUpdate' , {
        fullName: formState.fullName.value,
      });
    };

    const handlePhoneChange = (value: string) => {
      const formattedPhone = formatPhoneNumber(value);
      handleChange('phone')(formattedPhone);
      const numericPhone = formattedPhone.replace(/\D/g, ''); // Remove caracteres não numéricos
      if (numericPhone.length === 11 && !phoneProgressIncremented) {
        handleBlur('phone')(); // Chama o blur para validação
        if (!formState.phone.error) {
          incrementProgress(); // Incrementa o progresso
          setPhoneProgressIncremented(true); // Marca como incrementado
        }
      }
    };
    const incrementProgress = () => {
      setProgressoAtual((prev) => Math.min(prev + 25, progressoTotal));
    };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
       <View>
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
      </View>



      <View style={styles.form}>
      <Input
        label="Nome Completo"
        placeholder="Nome Completo"
        value={formState.fullName.value}
        onChangeText={(value) => {
          handleChange('fullName')(value);

          // Verifica se o nome contém pelo menos duas palavras
          const nameParts = value.trim().split(' ');
          if (
            nameParts.length >= 2 &&
            nameParts.every((part) => part.length > 0) &&
            !nameProgressIncremented
          ) {
            incrementProgress(); // Incrementa o progresso
            setNameProgressIncremented(true); // Marca como incrementado
          }
        }}
        error={formState.fullName.error}
        autoCapitalize="words"
      />
            <Input
              enable={false}
              label="E-mail"
              placeholder={getRememberedEmail() ?? undefined}
              value=""
              onChangeText={() => {}}
              autoCapitalize="none"
            />
             <Input
              label="Número"
              placeholder="(DD) 9 NNNN-NNNN"
              value={formState.phone.value}
              onChangeText={handlePhoneChange}
              error={formState.phone.error}
              keyboardType="phone-pad"
            />
            <Button title="CONTINUAR" onPress={handleContinue} disabled={(progressPercentage * 100 === 50) ? false : true}/>
      </View>
    </KeyboardAvoidingView>



   
  </SafeAreaView>
  );
};

const getStyles = (theme: Theme) =>StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 20,
    backgroundColor:theme.colors.background,
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
  form:{
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop:40,
  },
});

export default UserEdit;
