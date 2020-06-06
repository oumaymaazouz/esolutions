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
  View,
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
            Object.entries(props.monthlyLaborTransactions).map(arr => {
              const notApprovedTrans = arr[1].filter(
                item => !item['spi:genapprservreceipt'],
              ).length;
              const approvedTrans = arr[1].filter(
                item => !!item['spi:genapprservreceipt'],
              ).length;
              return (
                <ListItem
                  key={arr[0]}
                  onPress={() =>
                    props.navigation.navigate('TransactionsList', {
                      month: arr[0],
                      approvedTrans,
                      notApprovedTrans,
                    })
                  }>
                  <Left>
                    <Text style={styles.listItemText}>{arr[0]}</Text>
                  </Left>
                  <Body>
                    <View style={styles.transCountView}>
                      <Icon
                        type="FontAwesome"
                        name="circle"
                        style={styles.transCountApprovedIcon}
                      />
                      <Text style={styles.listItemText}>{approvedTrans}</Text>
                    </View>
                    <View style={styles.transCountView}>
                      <Icon
                        type="FontAwesome"
                        name="circle"
                        style={styles.transCountNotApprovedIcon}
                      />
                      <Text style={styles.listItemText}>
                        {notApprovedTrans}
                      </Text>
                    </View>
                  </Body>
                  <Right>
                    <Icon type="AntDesign" name="arrowright" />
                  </Right>
                </ListItem>
              );
            })
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
  transCountView: {flexDirection: 'row', alignItems: 'center'},
  transCountApprovedIcon: {color: '#5cb85c', fontSize: 15, marginRight: 10},
  transCountNotApprovedIcon: {color: '#d9534f', fontSize: 15, marginRight: 10},
});
export default withStore(MonthlyTransList);
