import React from 'react';

import {View, Text} from 'react-native';
import {Body, Card, CardItem, Icon, Left, Right, StyleSheet} from 'native-base';

import {fullFormatDate} from '../../common/helper';
import TouchableLongPress from '../Shared/TouchableLongPress';

import COLORS from '../../common/colors';

const TransactionItemView = props => {
  const setItemsToDeleteAction = item => {
    let updatedItems;
    if (props.itemsToDelete.includes(item['spi:labtransid'])) {
      const itemIndex = props.itemsToDelete.indexOf(item['spi:labtransid']);
      updatedItems = props.itemsToDelete
        .slice(0, itemIndex)
        .concat(
          props.itemsToDelete.slice(itemIndex + 1, props.itemsToDelete.length),
        );
      props.setItemsToDelete(updatedItems);
    } else {
      updatedItems = [...props.itemsToDelete, item['spi:labtransid']];
      props.setItemsToDelete(updatedItems);
    }
  };

  const day = props.item['spi:startdateentered']
    ? new Date(props.item['spi:startdateentered']).getDay()
    : null;
  const weekendHighlitCardStyle =
    day === 5 || day === 6 ? {backgroundColor: COLORS.lightBrand} : {};
  const deleteHighlitCardStyle = props.itemsToDelete.includes(
    props.item['spi:labtransid'],
  )
    ? {backgroundColor: COLORS.dangerHighlight}
    : {};
  return (
    <TouchableLongPress onPress={() => setItemsToDeleteAction(props.item)}>
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
                props.item.workordernt.wonum
                  ? props.item.workordernt.wonum
                  : '--'
              } - ${
                props.item.workordernt.description
                  ? props.item.workordernt.description
                  : '--'
              }`}
            </Text>
          </Left>
          <Body style={styles.cardItemHeaderBody} />
          <Right style={styles.cardItemHeaderRight} />
        </CardItem>
        <CardItem
          bordered
          style={[weekendHighlitCardStyle, deleteHighlitCardStyle]}>
          <Body>
            <View style={styles.cardItemStyle}>
              <Text style={styles.cardLabelItem}>{`Date   : `}</Text>
              <Text style={styles.cardDescItem}>{`${
                props.item['spi:startdateentered']
                  ? fullFormatDate(props.item['spi:startdateentered'])
                  : '--'
              }`}</Text>
            </View>

            <View style={styles.cardItemStyle}>
              <Text style={styles.cardLabelItem}>{`Task   :`} </Text>
              <Text style={styles.cardDescItem}>{`${
                props.item.workorder.taskid ? props.item.workorder.taskid : '--'
              } - ${
                props.item.workorder.description
                  ? props.item.workorder.description
                  : '--'
              }`}</Text>
            </View>

            <View style={styles.cardItemStyle}>
              <Text style={styles.cardLabelItem}>{'Labor : '}</Text>
              <Text style={styles.cardDescItem}>{`${
                props.item['spi:laborcode'] ? props.item['spi:laborcode'] : '--'
              } - ${props.profile.displayName}`}</Text>
            </View>

            <View style={styles.cardItemStyle}>
              <Text style={styles.cardLabelItem}>{'Craft  :'}</Text>
              <Text style={styles.cardDescItem}>{`${
                props.item['spi:craft'] ? props.item['spi:craft'] : '--'
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
                props.item['spi:regularhrs']
                  ? props.item['spi:regularhrs']
                  : '--'
              }`}
            </Text>
          </Left>
          <Right>
            <Text>
              {' '}
              {props.item['spi:genapprservreceipt'] ? (
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

export default TransactionItemView;
