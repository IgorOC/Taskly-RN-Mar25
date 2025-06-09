import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useHeaderInternStyles} from './HeaderIntern.style';
import {useNavigation} from '@react-navigation/native';
import Icon from '@react-native-vector-icons/feather';
import {useTheme} from '../../theme/ThemeContext';
import {useAuth} from '../../context/AuthContext';



const HeaderIntern: React.FC = () => {
  const styles = useHeaderInternStyles();
  const navigation = useNavigation();
  const {theme} = useTheme();
  const {userProfile} = useAuth();

  const avatarSource = {
    uri: userProfile?.picture
      ? `https://avatars-taskly-igu.s3.us-east-2.amazonaws.com/${userProfile.picture}.jpg`
      : 'https://avatars-taskly-igu.s3.us-east-2.amazonaws.com/default.jpg',
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="chevron-left" size={25} color={theme.colors.secondaryBg} />
      </Pressable>
      <Text style={styles.titleText}>TASKLY</Text>
      <Image source={avatarSource} style={styles.profileImage} />
    </View>
  );
};

export default HeaderIntern;
