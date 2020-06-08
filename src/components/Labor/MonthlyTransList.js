import React, {useEffect, useState} from 'react';
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
import {FlatList} from 'react-native-gesture-handler';

const withStore = connect(state => ({
  monthlyLaborTransactions: state.Labor.monthlyLaborTransactions,
}));

const MonthlyTransList = props => {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const {dispatch} = getStore();
    const {navigation} = props;
    return navigation.addListener('focus', () => {
      dispatch($fetchLaborTransactions()).catch(() =>
        console.log('ERROR FETCHING LABOR TRANSACTIONS'),
      );
    });
  }, [props]);

  console.log(
    props.monthlyLaborTransactions &&
      Object.entries(props.monthlyLaborTransactions),
  );
  return (
    <Container>
      <Content>
        {props.monthlyLaborTransactions ? (
          <FlatList
            // refreshing={!!props.monthlyLaborTransactions}
            data={
              props.monthlyLaborTransactions &&
              Object.entries(props.monthlyLaborTransactions)
            }
            renderItem={({item}) => {
              console.log(item, '-----------------------');
              const notApprovedTrans = item[1].filter(
                item => !item['spi:genapprservreceipt'],
              ).length;
              const approvedTrans = item[1].filter(
                item => !!item['spi:genapprservreceipt'],
              ).length;
              return (
                <ListItem
                  key={item[0]}
                  onPress={() =>
                    props.navigation.navigate('TransactionsList', {
                      month: item[0],
                      approvedTrans,
                      notApprovedTrans,
                    })
                  }>
                  <Left>
                    <Text style={styles.listItemText}>{item[0]}</Text>
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
            }}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <Loader />
        )}
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
  transCountApprovedIcon: {
    color: COLORS.success,
    fontSize: 15,
    marginRight: 10,
  },
  transCountNotApprovedIcon: {
    color: COLORS.danger,
    fontSize: 15,
    marginRight: 10,
  },
});
export default withStore(MonthlyTransList);
