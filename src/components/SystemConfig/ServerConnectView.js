import React, {useState} from 'react';

import {Dimensions, View, Image, StyleSheet, Button} from 'react-native';
import {Container, Header, Content, Input} from 'native-base';

import LOGO from '../../assets/logo.png';
import COLORS from '../../common/colors';
import {getStore} from '../../store';
import {$saveDomain} from './state';

const screenHeight = Dimensions.get('window').height;

const ServerConnectView = props => {
  const [domain, setDomain] = useState('');
  const saveDomain = () => {
    const {dispatch} = getStore();
    dispatch($saveDomain(domain));
    props.navigation.navigate('Login');
  };

  return (
    <Container>
      <Header style={styles.header} />
      <Content contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoWrapper}>
          <Image source={LOGO} style={styles.logo} />
        </View>
        <Input
          style={styles.input}
          placeholder="https://<host>:<port>/<context>"
          placeholderTextColor={COLORS.lightGray}
          onChangeText={value => setDomain(value)}
        />
        <View style={styles.btnConnectWrapper}>
          <Button
            disabled={!domain}
            onPress={() => saveDomain()}
            color={COLORS.blue}
            title="Connect"
          />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  logoWrapper: {
    marginTop: screenHeight / 5,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 160,
    resizeMode: 'contain',
  },
  input: {
    marginTop: 40,
    marginHorizontal: 20,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    paddingVertical: 0,
    color: COLORS.darkGray,
    fontSize: 14,
  },
  btnConnectWrapper: {
    marginTop: 40,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
});

export default ServerConnectView;

/**
 * @TODO test on server validity
 */
