import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Card, CardItem, Left, Body, Right, Icon} from 'native-base';

import CheckBox from '@react-native-community/checkbox';

import {fullFormatDate} from '../../common/helper';

import {COLORS} from '../../common/colors';
import {$saveTransaction, $removeTransaction} from './state';
import {getStore} from '../../store';
import {connect} from 'react-redux';

const withStore = connect(state => ({
  selectedTransactions: state.LaborApproval.selectedTransactions,
}));

const LaborTransItem = props => {
  const {
    item,
    weekendHighlitCardStyle,
    firstname,
    lastname,
    setSelectedTrans,
    removeTrans,
  } = props;

  const [isSelected, setIsSelected] = useState(false);

  const checkedCardStyle = isSelected
    ? {backgroundColor: COLORS.successHighlight}
    : {};

  const {dispatch} = getStore();

  return (
    <Card>
      <CardItem
        header
        bordered
        style={[styles.cardHeader, weekendHighlitCardStyle, checkedCardStyle]}>
        <Left style={styles.cardHeaderDesc}>
          <Text style={styles.cardHeaderWonum}>
            {`WO# : ${
              item.workordernt.wonum ? item.workordernt.wonum : '--'
            } - ${
              item.workordernt.description ? item.workordernt.description : '--'
            }`}
          </Text>
        </Left>
        <Right>
          <CheckBox
            disabled={false}
            value={isSelected}
            onValueChange={() => {
              if (!isSelected) {
                setIsSelected(true);
                dispatch($saveTransaction(item['spi:labtransid']));
                setSelectedTrans(item['spi:labtransid']);
              } else {
                setIsSelected(false);
                dispatch($removeTransaction(item['spi:labtransid']));
                removeTrans(item['spi:labtransid']);
              }
            }}
          />
        </Right>
      </CardItem>
      <CardItem bordered style={[weekendHighlitCardStyle, checkedCardStyle]}>
        <Body>
          <View style={styles.cardItemStyle}>
            <Text style={styles.cardLabelItem}>Date : </Text>
            <Text style={styles.cardDescItem}>{`${
              item['spi:startdateentered']
                ? fullFormatDate(item['spi:startdateentered'])
                : '--'
            }`}</Text>
          </View>

          <View style={styles.cardItemStyle}>
            <Text style={styles.cardLabelItem}>Task : </Text>
            <Text style={styles.cardDescItem}>{`${
              item.workorder.taskid ? item.workorder.taskid : '--'
            } - ${
              item.workorder.description ? item.workorder.description : '--'
            }`}</Text>
          </View>

          <View style={styles.cardItemStyle}>
            <Text style={styles.cardLabelItem}>Labor : </Text>
            <Text style={styles.cardDescItem}>{`${
              item['spi:laborcode'] ? item['spi:laborcode'] : '--'
            } - ${firstname} ${lastname}`}</Text>
          </View>

          <View style={styles.cardItemStyle}>
            <Text style={styles.cardLabelItem}>Craft : </Text>
            <Text style={styles.cardDescItem}>{`${
              item['spi:craft'] ? item['spi:craft'] : '--'
            }`}</Text>
          </View>
        </Body>
      </CardItem>
      <CardItem
        footer
        bordered
        style={[weekendHighlitCardStyle, checkedCardStyle]}>
        <Left style={{padding: 0}}>
          <Text style={styles.regHrsText}>
            {`REPORTED HOURS : ${
              item['spi:regularhrs'] ? item['spi:regularhrs'] : '--'
            }`}
          </Text>
        </Left>
        <Right>
          <Text>
            {item['spi:genapprservreceipt'] ? (
              <Icon
                type="FontAwesome"
                name="circle"
                style={styles.greenCircle}
              />
            ) : (
              <Icon type="FontAwesome" name="circle" style={styles.redCircle} />
            )}
          </Text>
        </Right>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  /** styles of listitem */
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
    width: '20%',
    marginLeft: 10,
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
    padding: 0,
  },
  greenCircle: {color: COLORS.success, fontSize: 30},
  redCircle: {color: COLORS.danger, fontSize: 30},
});
export default withStore(LaborTransItem);
