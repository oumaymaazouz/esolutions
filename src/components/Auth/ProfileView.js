import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  List,
  ListItem,
  Label,
} from 'native-base';

import {View, Text, StyleSheet} from 'react-native';

import Loader from '../Shared/Loader';
import {getStore} from '../../store';

import {$fetchProfile} from './state';
import COLORS from '../../common/colors';

const withStore = connect(state => ({
  maxauth: state.Auth.maxauth,
  profile: state.Auth.profile,
}));

const ProfileView = props => {
  useEffect(() => {
    const {dispatch} = getStore();
    return props.navigation.addListener('focus', () => {
      dispatch($fetchProfile(props.maxauth)).catch(error => console.log(error));
    });
  }, [props]);

  const {profile} = props;
  const dataReady = !!profile;

  const getContent = () => (
    <View>
      <View style={styles.headerProfile}>
        <View style={styles.customAvatar}>
          <Text style={styles.customAvatarText}>
            {profile.displayName.substring(0, 2)}
          </Text>
        </View>
        <Text style={styles.displayName}>{profile.displayName}</Text>
      </View>
      <List>
        <ListItem style={styles.listItem}>
          <Label style={styles.itemLabel}>Base language :</Label>
          <Text style={styles.itemContent}>
            {profile.baseLang ? profile.baseLang : '__'}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem}>
          <Label style={styles.itemLabel}>Base currency :</Label>
          <Text style={styles.itemContent}>
            {profile.baseCurrency ? profile.baseCurrency : '__'}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem}>
          <Label style={styles.itemLabel}>Default site :</Label>
          <Text style={styles.itemContent}>
            {profile.defaultSite ? profile.defaultSite : '__'}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem}>
          <Label style={styles.itemLabel}>Default store room site :</Label>
          <Text style={styles.itemContent}>
            {profile.defaultStoreroomSite ? profile.defaultStoreroomSite : '__'}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem}>
          <Label style={styles.itemLabel}>Default store room :</Label>
          <Text style={styles.itemContent}>
            {profile.defaultStoreroom ? profile.defaultStoreroom : '__'}
          </Text>
        </ListItem>
        <ListItem style={styles.listItem}>
          <Label style={styles.itemLabel}>Date time format :</Label>
          <Text style={styles.itemContent}>
            {profile.datetimeformat ? profile.datetimeformat : '__'}
          </Text>
        </ListItem>
      </List>
    </View>
  );

  return (
    <Container>
      <Header style={{backgroundColor: COLORS.blue}}>
        <Left>
          <Button transparent onPress={() => props.navigation.toggleDrawer()}>
          <Icon type="Feather" name="menu" style={{fontSize: 34}} />
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <Content>{!dataReady ? <Loader /> : getContent()}</Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  customAvatar: {
    borderRadius: 50,
    width: 80,
    height: 80,
    backgroundColor: COLORS.blue,
    paddingVertical: 20,
  },
  customAvatarText: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  displayName: {
    color: COLORS.darkGray,
    marginTop: 16,
    fontSize: 16,
  },
  listItem: {
    borderBottomWidth: 0,
  },
  itemLabel: {
    color: COLORS.darkGray,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  itemContent: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
});

export default withStore(ProfileView);
