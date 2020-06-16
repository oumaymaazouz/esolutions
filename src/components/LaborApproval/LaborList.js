import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';

import {FlatList, Text, StyleSheet} from 'react-native';
import {
  Content,
  Container,
  List,
  ListItem,
  Left,
  Body,
  Right,
} from 'native-base';

import {commonStyles} from '../../common/styles';
import {avatarPalette, COLORS} from '../../common/colors';

import {getStore} from '../../store';
import {$fetchLabors} from './state';
import Loader from '../Shared/Loader';
import CustomAvatar from '../Shared/CustomAvatar';

const withStore = connect(state => ({
  laborList: state.laborApproval.laborList,
}));
const LaborList = props => {
  useEffect(() => {
    const {dispatch} = getStore();
    dispatch($fetchLabors())
      .then(() => console.log('SUCCESS LABORS LIST FETCH'))
      .catch(() => console.log('ERROR FETCHING LABORS'));
  }, []);

  const {laborList} = props;
  const getList = () => {
    return (
      <FlatList
        // style={styles.flatlist}
        data={laborList}
        renderItem={({item}) => {
          const randomColor =
            avatarPalette[Math.floor(Math.random() * avatarPalette.length)];
          return (
            <Fragment>
              {item.person.firstname && (
                <ListItem>
                  <CustomAvatar
                    color={randomColor}
                    firstname={item.person.firstname}
                    lastname={item.person.lastname}
                  />

                  <Text style={styles.laborname}>{`${item.person.firstname} ${
                    item.person.lastname
                  }`}</Text>
                </ListItem>
              )}
            </Fragment>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const dataReady = !!laborList;
  return (
    <Container>
      <Content contentContainerStyle={commonStyles.contentContainerStyle}>
        {dataReady ? getList() : <Loader />}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  laborname: {
    marginLeft: 20,
    color: COLORS.darkGray,
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default withStore(LaborList);
