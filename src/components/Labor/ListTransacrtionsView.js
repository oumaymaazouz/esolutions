import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import {
  Container,
  Body,
  Content,
  Card,
  CardItem,
  Fab,
  Icon,
  Left,
  Right,
  Button,
  Toast,
} from 'native-base';

import Loader from '../Shared/Loader';

import {getStore} from '../../store';
import {$fetchLaborTransactions, $deleteTransaction} from './state';
import COLORS from '../../common/colors';

import {fullFormatDate} from '../../common/helper';

const withStore = connect(state => ({
  profile: state.Auth.profile,
  laborTransactions: state.Labor.laborTransactions,
  monthlyLaborTransactions: state.Labor.monthlyLaborTransactions,
}));

const LaborTransactionsView = props => {
  useEffect(() => {
    const {dispatch} = getStore();
    const {navigation} = props;
    return navigation.addListener('focus', () => {
      dispatch($fetchLaborTransactions()).catch(() =>
        console.log('ERROR FETCHING LABOR TRANSACTIONS'),
      );
    });
  }, [props]);

  const deleteTransactions = id => {
    const {dispatch} = getStore();
    Alert.alert('Delete', `Do you really want to delete the task ${id}`, [
      {
        text: 'Delete',
        onPress: () => {
          dispatch($deleteTransaction(id))
            .then(() => {
              Toast.show({
                text: `Task with id=${id}, is deleted successfully.`,
                type: 'success',
                duration: 6000,
              });
              props.navigation.setParams({
                notApprovedTrans: props.route.params.notApprovedTrans - 1,
              });
              dispatch($fetchLaborTransactions()).catch(() =>
                console.log(
                  'ERROR IN FETCHING LABOR TRANSACTIONS FOR SELECTED MONTH',
                ),
              );
            })
            .catch(() =>
              Toast.show({
                text: `Task with id=${id}, could not be deleted.`,
                type: 'danger',
                duration: 6000,
              }),
            );
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };

  const dataList =
    props.monthlyLaborTransactions &&
    props.monthlyLaborTransactions[props.route.params.month].sort(
      (a, b) =>
        new Date(b['spi:startdateentered']) -
        new Date(a['spi:startdateentered']),
    );
  const getList = () => {
    return (
      <View style={{flex: 1}}>
        <View>
          <FlatList
            data={props.monthlyLaborTransactions && dataList}
            renderItem={({item}) => {
              const day = item['spi:startdateentered']
                ? new Date(item['spi:startdateentered']).getDay()
                : null;
              const highlitCardStyle =
                day === 5 || day === 6
                  ? {backgroundColor: COLORS.highlight}
                  : {};
              return (
                <Card>
                  <CardItem
                    header
                    bordered
                    style={[styles.cardHeader, highlitCardStyle]}>
                    <View style={styles.cardHeaderDesc}>
                      <Text style={styles.cardHeaderWonum}>
                        {`WO# : ${
                          item.workordernt.wonum ? item.workordernt.wonum : '--'
                        } - ${
                          item.workordernt.description
                            ? item.workordernt.description
                            : '--'
                        }`}
                      </Text>
                    </View>
                    <Button
                      transparent
                      style={styles.btnDelete}
                      onPress={() =>
                        deleteTransactions(item['spi:labtransid'])
                      }>
                      <Icon
                        style={styles.btnDeleteIcon}
                        type="AntDesign"
                        name="delete"
                      />
                    </Button>
                  </CardItem>
                  <CardItem bordered style={highlitCardStyle}>
                    <Body>
                      <View style={styles.cardItemStyle}>
                        <Text style={styles.cardLabelItem}>{`Date   : `}</Text>
                        <Text style={styles.cardDescItem}>{`${
                          item['spi:startdateentered']
                            ? fullFormatDate(
                                item['spi:startdateentered'],
                              ).toUpperCase()
                            : '--'
                        }`}</Text>
                      </View>

                      <View style={styles.cardItemStyle}>
                        <Text style={styles.cardLabelItem}>{`Task   :`} </Text>
                        <Text style={styles.cardDescItem}>{`${
                          item.workorder.taskid ? item.workorder.taskid : '--'
                        } - ${
                          item.workorder.description
                            ? item.workorder.description
                            : '--'
                        }`}</Text>
                      </View>

                      <View style={styles.cardItemStyle}>
                        <Text style={styles.cardLabelItem}>{'Labor : '}</Text>
                        <Text style={styles.cardDescItem}>{`${
                          item['spi:laborcode'] ? item['spi:laborcode'] : '--'
                        } - ${props.profile.displayName}`}</Text>
                      </View>

                      <View style={styles.cardItemStyle}>
                        <Text style={styles.cardLabelItem}>{'Craft  :'}</Text>
                        <Text style={styles.cardDescItem}>{`  ${
                          item['spi:craft'] ? item['spi:craft'] : '--'
                        }`}</Text>
                      </View>
                    </Body>
                  </CardItem>
                  <CardItem footer bordered style={highlitCardStyle}>
                    <Left>
                      <Text style={styles.regHrsText}>
                        {`REPORTED HOURS : ${
                          item['spi:regularhrs'] ? item['spi:regularhrs'] : '--'
                        }`}
                      </Text>
                    </Left>
                    <Right>
                      <Text>
                        {' '}
                        {item['spi:genapprservreceipt'] ? (
                          <Icon
                            type="FontAwesome"
                            name="circle"
                            style={styles.greenCircle}
                          />
                        ) : (
                          <Icon
                            type="FontAwesome"
                            name="circle"
                            style={styles.redCircle}
                          />
                        )}
                      </Text>
                    </Right>
                  </CardItem>
                </Card>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <Fab
          style={{backgroundColor: COLORS.blue}}
          position="bottomRight"
          onPress={() => props.navigation.push('AddTransactions')}>
          <Icon type="Feather" name="plus" />
        </Fab>
      </View>
    );
  };

  const dataReady = !!props.laborTransactions;
  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        {!dataReady ? <Loader /> : getList()}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardItemStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  indicatedMonth: {
    color: COLORS.darkGray,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  btnDelete: {
    height: 'auto',
  },
  btnDeleteIcon: {color: COLORS.danger, fontSize: 30, marginTop: 0},
  cardHeaderDesc: {marginRight: 7},
  cardLabelItem: {
    marginRight: 14,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
  cardHeaderWonum: {
    color: COLORS.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },

  cardDescItem: {
    color: COLORS.darkGray,
    fontSize: 14,
    marginTop: 6,
  },
  regHrsText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  greenCircle: {color: COLORS.success, fontSize: 30},
  redCircle: {color: COLORS.danger, fontSize: 30},
});

export default withStore(LaborTransactionsView);
