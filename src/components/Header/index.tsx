import React from 'react';
import {View, Text, Image} from 'react-native';
import {useHeaderInternStyles} from './Header.style';
import {useAuth} from '../../context/AuthContext';

const Header: React.FC = () => {
  const styles = useHeaderInternStyles();
  const {userProfile} = useAuth();

  const avatarSource = {
    uri: userProfile?.picture
      ? `https://avatars-taskly-igu.s3.us-east-2.amazonaws.com/${userProfile.picture}.jpg`
      : 'https://avatars-taskly-igu.s3.us-east-2.amazonaws.com/default.jpg',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>TASKLY</Text>
      <Image source={avatarSource} style={styles.profileImage} />
    </View>
  );
};

export default Header;
