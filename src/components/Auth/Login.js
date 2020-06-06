import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Dimensions, View, Image, Text, StyleSheet, Button} from 'react-native';

import {
  Input,
  Container,
  Content,
  Form,
  Item,
  Header,
  Toast,
} from 'native-base';

import LOGO from '../../assets/logo.png';
import COLORS from '../../common/colors';

import {getStore} from '../../store';

import {$login, $fetchProfile} from './state';

const screenHeight = Dimensions.get('window').height;

const withStore = connect(state => ({
  maxupg: state.Auth.maxupg,
  maxauth: state.Auth.maxauth,
}));

const LoginView = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const loginAction = async (usern, pass) => {
    const {dispatch} = getStore();

    try {
      await dispatch($login(usern.trim(), pass));
      console.log(props.maxauth, '---------------------');
      await dispatch($fetchProfile(props.maxauth));
      props.navigation.navigate('Home');
    } catch (error) {
      setErrorMessage('Please fill correct credentials.');
      Toast.show({
        text: 'Wrong credentials!',
        type: 'danger',
        duration: 6000,
      });
    }
  };

  return (
    <Container>
      <Header style={styles.header} />
      <Content contentContainerStyle={styles.contentContainer}>
        <View style={styles.logoWrapper}>
          <Image source={LOGO} style={styles.logo} />
        </View>
        <Form style={styles.form}>
          <Item>
            <Input
              placeholder="Username"
              placeholderTextColor={COLORS.lightGray}
              style={styles.input}
              value={username}
              onChangeText={value => setUsername(value)}
            />
          </Item>
          <Item>
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
              title="Login"
              style={styles.loginButton}
              color={COLORS.blue}
              disabled={!username || !password}
              onPress={() => loginAction(username, password)}
            />
          </View>
        </Form>
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
  form: {width: '100%', marginTop: 20},
  input: {
    marginHorizontal: 20,
    color: COLORS.darkGray,
    fontSize: 14,
  },
  loginButton: {
    marginTop: 40,
    height: 40,
    marginHorizontal: 10,
  },
  btnLoginWrapper: {
    marginTop: 40,
    marginHorizontal: 20,
    justifyContent: 'center',
  },

  footer: {
    backgroundColor: 'transparent',
  },
});

export default withStore(LoginView);
