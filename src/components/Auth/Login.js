import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {Dimensions, View, Image, Text, StyleSheet} from 'react-native';
import {
  Input,
  Container,
  Content,
  Form,
  Item,
  Header,
  Toast,
  Icon,
  Button,
  Spinner,
  Footer,
} from 'native-base';

import LOGO from '../../assets/logo.png';
import {COLORS} from '../../common/colors';

import {getStore} from '../../store';

import {$login} from './state';

const screenHeight = Dimensions.get('window').height;

const withStore = connect(state => ({
  maxupg: state.Auth.maxupg,
}));

const LoginView = props => {
  useEffect(() => {
    getCredentials();
  }, []);
  const [domain, setDomain] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [processing, setProcessing] = useState(false);

  const getCredentials = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('credentials');
      if (jsonValue !== null) {
        const credentials = JSON.parse(jsonValue);
        setDomain(credentials.domain);
        setUsername(credentials.username);
        setPassword(credentials.password);
      }
    } catch (e) {
      console.log('error reading credentials from asyncStorage');
    }
  };
  const storeCredentials = async (dom, usern, pass) => {
    try {
      const credentials = JSON.stringify({
        domain: dom,
        username: usern,
        password: pass,
      });
      await AsyncStorage.setItem('credentials', credentials);
    } catch (e) {
      console.log('error saving credentials in asyncStorage');
    }
  };
  const loginAction = (usern, pass) => {
    const {dispatch} = getStore();
    setProcessing(true);
    dispatch($login(domain, usern.trim(), pass))
      .then(() => {
        setProcessing(false);
        storeCredentials(domain, usern.trim(), pass);
        props.navigation.navigate('Home');
      })
      .catch(error => {
        setProcessing(false);
        setErrorMessage('Please fill correct credentials.');
        Toast.show({
          text: 'Wrong credentials!',
          type: 'danger',
          duration: 6000,
        });
      });
  };

  return (
    <Container>
      <Header style={styles.header} />
      <Content>
        <View style={styles.logoWrapper}>
          <Image source={LOGO} style={styles.logo} />
        </View>
        <Form style={styles.form}>
          <Item>
            <Icon
              type="FontAwesome5"
              name="star-of-life"
              style={styles.mandatoryIcon}
            />
            <Input
              style={styles.input}
              placeholder="https://<host>:<port>/<context>"
              value={domain}
              placeholderTextColor={COLORS.lightGray}
              onChangeText={value => setDomain(value)}
            />
          </Item>
          <Item>
            <Icon
              type="FontAwesome5"
              name="star-of-life"
              style={styles.mandatoryIcon}
            />
            <Input
              placeholder="Username"
              placeholderTextColor={COLORS.lightGray}
              style={styles.input}
              value={username}
              onChangeText={value => setUsername(value)}
            />
          </Item>
          <Item>
            <Icon
              type="FontAwesome5"
              name="star-of-life"
              style={styles.mandatoryIcon}
            />
            <Input
              placeholder="Password"
              placeholderTextColor={COLORS.lightGray}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </Item>

          {!!errorMessage && (
            <Text style={{color: 'red', paddingLeft: 20, marginTop: 20}}>
              {errorMessage}
            </Text>
          )}
          <View style={styles.btnLoginWrapper}>
            <Button
              style={styles.loginButton}
              color={COLORS.blue}
              disabled={!domain || !username || !password || processing}
              onPress={() => loginAction(username, password)}>
              <Text style={styles.loginButtonText}>Login</Text>
              {processing && <Spinner color={COLORS.white} />}
            </Button>
          </View>
        </Form>
      </Content>
      <Footer style={styles.footer}>
        <Text style={styles.footerText}>Version 0.0.1</Text>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  footer: {
    backgroundColor: 'transparent',
    elevation: 0,
    alignItems: 'center',
  },
  footerText: {color: COLORS.lightGray, fontSize: 14},
  logoWrapper: {
    marginTop: screenHeight / 5,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 160,
    resizeMode: 'contain',
  },
  form: {width: '100%', marginTop: 20},
  input: {
    marginHorizontal: 20,
    color: COLORS.darkGray,
    fontSize: 14,
  },
  mandatoryIcon: {
    color: COLORS.danger,
    fontSize: 6,
    marginLeft: 20,
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 40,
    height: 40,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnLoginWrapper: {
    marginTop: 40,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default withStore(LoginView);
