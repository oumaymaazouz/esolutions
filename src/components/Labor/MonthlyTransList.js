import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Text,
  Right,
  Icon,
  Body,
} from 'native-base';

import COLORS from '../../common/colors';
import {getStore} from '../../store';

import {$fetchLaborTransactions} from './state';
import Loader from '../Shared/Loader';

const withStore = connect(state => ({
  monthlyLaborTransactions: state.Labor.monthlyLaborTransactions,
}));

const MonthlyTransList = props => {
  useEffect(() => {
    const {dispatch} = getStore();
    const {navigation} = props;
    return navigation.addListener('focus', () => {
      dispatch($fetchLaborTransactions()).catch(() =>
        console.log('ERROR FETCHING LABOR TRANSACTIONS'),
      );
    });
  }, [props]);

  return (
    <Container>
      <Content>
        <List>
          {props.monthlyLaborTransactions ? (
            Object.entries(props.monthlyLaborTransactions).map(arr => (
              <ListItem
                key={arr[0]}
                onPress={() =>
                  props.navigation.navigate('TransactionsList', {month: arr[0]})
                }>
                <Left>
                  <Text style={styles.listItemText}>{arr[0]}</Text>
                </Left>
                <Body>
                  <Text style={styles.listItemText}>{`${
                    arr[1].length
                  } records`}</Text>
                </Body>
                <Right>
                  <Icon type="AntDesign" name="arrowright" />
                </Right>
              </ListItem>
            ))
          ) : (
            <Loader />
          )}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  listItemText: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
});
export default withStore(MonthlyTransList);
