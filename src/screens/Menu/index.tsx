import React, { useState,useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { UserInfoCard } from '../../components/userInfo';
import MenuOption from '../../components/menuOption';
import CarouselItem, { CarouselItemProps } from '../../components/carouselItem'; 
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { Theme } from '../../theme/Theme';
import { useAuth } from '../../context/AuthContext';
import Icon from '@react-native-vector-icons/feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UpdateModal from '../../components/UpdateModal';
import { useRoute } from '@react-navigation/native';

const mensage = {
    userEdit:'Editar Informações Pessoais',
    biometric: 'Mudar Biometria', 
    logOut:'Sair da conta',
    accountExclude:'Excluir Conta',
};
const Menu: React.FC = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const styles = getStyles(theme);
    const { logout } = useAuth();
    const [isbiomtric, setbiometric] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [avatarUpdated, setAvatarUpdated] = useState(false); // Inicializa como `false`

        const route = useRoute();
        const params = route.params as { avatarUpdated: boolean };
        console.log("teste route "+avatarUpdated);

        useEffect(() => {
          if (params?.avatarUpdated) {
            setAvatarUpdated(true); // Atualiza o estado local para `true`
            setModalVisible(true); // Exibe o modal
          }
        }, [params?.avatarUpdated]); // Executa apenas quando avatarUpdated mudar


    const carouselData: CarouselItemProps[] = [
        {
          id: '1',
          title: mensage.userEdit,
          icon:  <Icon name="upload-cloud"  size={25} color={theme.colors.mainText}  />,
          modalTextconten :'Tem certeza que deseja editar as informações do perfil.',
          acceptText:'EDITAR',
          modalTitle:'Deseja editar o perfil',
          action:()=>navigation.navigate('UserEdit'),
        },
        {
          id: '2',
          title: mensage.biometric,
          icon:  <FontAwesome5 name="fingerprint" size={25} color={theme.colors.mainText} />,
          modalTextconten:'Tem certeza que deseja desabilitar a autenticação por biometria? Você precisará usar seu login e senha para acessar o app.',
          acceptText: isbiomtric ? 'DESABILITAR' : 'HABILITAR',
          modalTitle:'Desabilitar biometria',
          action:()=>{
            setbiometric(!isbiomtric);
          },
        },
        {
          id: '3',
          title: mensage.logOut,
          icon: <Icon name="log-out" size={25} color={theme.colors.mainText}/>,
          modalTextconten :'Tem certeza que deseja sair do aplicativo? Você poderá se conectar novamente a qualquer momento.',
          acceptText:'SAIR',
          modalTitle:'Deseja Sair',
          action:()=>logout(),
        },
        {
          id: '4',
          title: mensage.accountExclude,
          icon: <Icon name="trash" size={25} color={theme.colors.mainText} />,
          modalTextconten:'Tem certeza que deseja excluir sua conta? Essa ação é permanente e todos os seus dados serão perdidos.',
          acceptText:'EXCLUIR',
          modalTitle:'Excluir conta',
        },
      ];

    return (
      <SafeAreaView style={styles.container}>
        <UserInfoCard userData={true}/>

        {/* -----------Carrossel ----------- */}
        <FlatList
        data={carouselData}
        renderItem={({ item }) => <CarouselItem {...item} />}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselItem}
        style={styles.carouselContainer}
      />

        <View style={styles.rowOptions}>
          < MenuOption  title='Preferências' action={ ()=>{navigation.navigate('Preferencies' as never)}} />
          < MenuOption  title='Termos e regulamentos' action={ ()=>{navigation.navigate('Terms' as never)}} />


           <UpdateModal 
           title='Perfil atualizado' 
           confirmButtonText='FECHAR' 
           isVisible={modalVisible}  
           action={()=>setModalVisible(false)}
          content='Suas informações foram salvas com sucesso.'
           />
        </View>

      </SafeAreaView>



    );
  };

const getStyles =(theme:Theme)=> StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    carouselContainer: {
        marginLeft:16,
        maxHeight:144,
        marginBottom:20,
    },
    rowOptions:{
        justifyContent:'space-around',
    },
    carouselItem:{
        marginLeft:16,
    },
});

export default Menu;