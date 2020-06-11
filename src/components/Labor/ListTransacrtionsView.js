import React, {useEffect, useState} from 'react';
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
import {LongPressGestureHandler} from 'react-native-gesture-handler';

import Loader from '../Shared/Loader';

import {getStore} from '../../store';
import {$fetchLaborTransactions, $deleteTransaction} from './state';
import COLORS from '../../common/colors';

import {fullFormatDate} from '../../common/helper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import TouchableLongPress from '../Shared/TouchableLongPress';

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

  const [processing, setProcessing] = useState(false);

  const dataList =
    props.monthlyLaborTransactions &&
    props.monthlyLaborTransactions[props.route.params.month] &&
    props.monthlyLaborTransactions[props.route.params.month].sort(
      (a, b) =>
        new Date(b['spi:startdateentered']) -
        new Date(a['spi:startdateentered']),
    );

  const [itemsToDelete, setItemsToDelete] = useState([]);

  const setItemsToDeleteAction = item => {
    let updatedItems;
    if (itemsToDelete.includes(item['spi:labtransid'])) {
      const itemIndex = itemsToDelete.indexOf(item['spi:labtransid']);
      updatedItems = itemsToDelete
        .slice(0, itemIndex)
        .concat(itemsToDelete.slice(itemIndex + 1, itemsToDelete.length));
      setItemsToDelete(updatedItems);
      console.log('**********************', itemsToDelete);
      props.navigation.setParams({
        itemsToDelete: updatedItems,
      });
    } else {
      updatedItems = [...itemsToDelete, item['spi:labtransid']];
      setItemsToDelete(updatedItems);
      props.navigation.setParams({
        itemsToDelete: updatedItems,
      });
    }
  };
  console.log(itemsToDelete, '+++++++++++++++++++++');
  const getList = () => {
    return (
      <View style={{flex: 1}}>
        <View>
          <FlatList
            data={props.monthlyLaborTransactions && dataList}
            refreshing={processing}
            renderItem={({item}) => {
              const day = item['spi:startdateentered']
                ? new Date(item['spi:startdateentered']).getDay()
                : null;
              const weekendHighlitCardStyle =
                day === 5 || day === 6
                  ? {backgroundColor: COLORS.lightBrand}
                  : {};
              const deleteHighlitCardStyle = itemsToDelete.includes(
                item['spi:labtransid'],
              )
                ? {backgroundColor: COLORS.dangerHighlight}
                : {};
              return (
                <TouchableLongPress
                  onPress={() => setItemsToDeleteAction(item)}>
                  <Card>
                    <CardItem
                      header
                      bordered
                      style={[
                        styles.cardHeader,
                        weekendHighlitCardStyle,
                        deleteHighlitCardStyle,
                      ]}>
                      <Left style={styles.cardHeaderDesc}>
                        <Text style={styles.cardHeaderWonum}>
                          {`WO# : ${
                            item.workordernt.wonum
                              ? item.workordernt.wonum
                              : '--'
                          } - ${
                            item.workordernt.description
                              ? item.workordernt.description
                              : '--'
                          }`}
                        </Text>
                      </Left>
                      <Body style={styles.cardItemHeaderBody} />
                      <Right style={styles.cardItemHeaderRight}>
                        {/* <Button
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
                        </Button> */}
                      </Right>
                    </CardItem>
                    <CardItem
                      bordered
                      style={[weekendHighlitCardStyle, deleteHighlitCardStyle]}>
                      <Body>
                        <View style={styles.cardItemStyle}>
                          <Text
                            style={styles.cardLabelItem}>{`Date   : `}</Text>
                          <Text style={styles.cardDescItem}>{`${
                            item['spi:startdateentered']
                              ? fullFormatDate(item['spi:startdateentered'])
                              : '--'
                          }`}</Text>
                        </View>

                        <View style={styles.cardItemStyle}>
                          <Text style={styles.cardLabelItem}>
                            {`Task   :`}{' '}
                          </Text>
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
                          <Text style={styles.cardDescItem}>{`${
                            item['spi:craft'] ? item['spi:craft'] : '--'
                          }`}</Text>
                        </View>
                      </Body>
                    </CardItem>
                    <CardItem
                      footer
                      bordered
                      style={[weekendHighlitCardStyle, deleteHighlitCardStyle]}>
                      <Left>
                        <Text style={styles.regHrsText}>
                          {`REPORTED HOURS : ${
                            item['spi:regularhrs']
                              ? item['spi:regularhrs']
                              : '--'
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
                </TouchableLongPress>
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

  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        {processing ? <Loader /> : getList()}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardItemStyle: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
  },
  cardLabelItem: {
    marginRight: 14,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    position: 'relative',
    width: '15%',
  },
  cardDescItem: {
    color: COLORS.darkGray,
    fontSize: 14,
    textTransform: 'uppercase',
    position: 'relative',
    width: '80%',
  },
  cardItemHeaderBody: {flex: 0},
  cardItemHeaderRight: {flex: 1},
  indicatedMonth: {
    color: COLORS.darkGray,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  btnDelete: {
    height: 'auto',
  },
  cardHeaderDesc: {flex: 5},

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

  regHrsText: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  greenCircle: {color: COLORS.success, fontSize: 30},
  redCircle: {color: COLORS.danger, fontSize: 30},
});

export default withStore(LaborTransactionsView);
