import React, {useEffect, useState, useCallback} from 'react';
import {connect} from 'react-redux';

import {StyleSheet, RefreshControl} from 'react-native';
import {
  Container,
  Content,
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
    const {navigation} = props;
    return navigation.addListener('focus', () => {
      getData();
    });
  }, [props]);

  const getData = () => {
    const {dispatch} = getStore();
    return dispatch($fetchLaborTransactions()).catch(() =>
      console.log('ERROR FETCHING LABOR TRANSACTIONS'),
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  return (
    <Container>
      <Content>
        {props.monthlyLaborTransactions ? (
          <FlatList
            // refreshing={!!props.monthlyLaborTransactions}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={
              props.monthlyLaborTransactions &&
              Object.entries(props.monthlyLaborTransactions)
            }
            renderItem={({item}) => {
              const notApprovedTrans = item[1].filter(
                i => !i['spi:genapprservreceipt'],
              ).length;
              const approvedTrans = item[1].filter(
                i => !!i['spi:genapprservreceipt'],
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
                    <Icon type="AntDesign" name="right" />
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
