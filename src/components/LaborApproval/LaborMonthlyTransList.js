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

import {COLORS} from '../../common/colors';
import {getStore} from '../../store';

import {$fetchLaborTransactions, $removeAllTransactions} from './state';
import Loader from '../Shared/Loader';
import {FlatList} from 'react-native-gesture-handler';
import {commonStyles} from '../../common/styles';

const withStore = connect(state => ({
  monthlyLaborTransactions: state.LaborApproval.monthlyLaborTransactions,
}));

const LaborMonthlyTransList = props => {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const {navigation} = props;
    return navigation.addListener('focus', () => {
      getData();
      cleanSelectedTransactions();
    });
  }, [props]);

  const getData = () => {
    const {dispatch} = getStore();
    return dispatch(
      $fetchLaborTransactions(props.route.params.laborcode),
    ).catch(() => console.log('ERROR FETCHING LABOR TRANSACTIONS'));
  };


  const cleanSelectedTransactions = () => {
    const {dispatch} = getStore();
    dispatch($removeAllTransactions());
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  return (
    <Container>
      <Content contentContainerStyle={commonStyles.contentContainerStyle}>
        {props.monthlyLaborTransactions ? (
          <View style={{flex: 1}}>
            <View>
              <FlatList
                // refreshing={!!props.monthlyLaborTransactions}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
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
                        props.navigation.navigate('LaborTransList', {
                          month: item[0],
                          firstname: props.route.params.firstname,
                          lastname: props.route.params.lastname,
                        })
                      }>
                      <Left>
                        <Text style={styles.listItemDateText}>{item[0]}</Text>
                      </Left>
                      <Body
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={styles.transCountView}>
                          <Icon
                            type="FontAwesome"
                            name="circle"
                            style={styles.transCountNotApprovedIcon}
                          />
                          <Text style={styles.listItemText}>
                            {('0' + notApprovedTrans.toString()).slice(-2)}
                          </Text>
                        </View>
                        <View style={styles.transCountView}>
                          <Icon
                            type="FontAwesome"
                            name="circle"
                            style={styles.transCountApprovedIcon}
                          />
                          <Text style={styles.listItemText}>
                            {('0' + approvedTrans.toString()).slice(-2)}
                          </Text>
                        </View>
                      </Body>
                      <Right>
                        <Icon type="AntDesign" name="right" />
                      </Right>
                    </ListItem>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
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
    fontSize: 18,
  },
  listItemDateText: {
    color: COLORS.darkGray,
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  transCountView: {flexDirection: 'row', alignItems: 'center', marginRight: 6},
  transCountApprovedIcon: {
    color: COLORS.success,
    fontSize: 24,
    marginRight: 10,
  },
  transCountNotApprovedIcon: {
    color: COLORS.danger,
    fontSize: 24,
    marginRight: 10,
  },
});
export default withStore(LaborMonthlyTransList);
