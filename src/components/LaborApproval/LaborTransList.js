import React, {useState} from 'react';
import {connect} from 'react-redux';

import {StyleSheet, View, FlatList} from 'react-native';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Icon,
  Footer,
  FooterTab,
  Button,
} from 'native-base';

import {groupByPropertyOfProperty} from '../../common/helper';
import {fullFormatDate} from '../../common/helper';
import {COLORS} from '../../common/colors';
import {commonStyles} from '../../common/styles';

const withStore = connect(state => ({
  monthlyLaborTransactions: state.LaborApproval.monthlyLaborTransactions,
}));
const LaborTransList = props => {
  const {monthlyLaborTransactions, route} = props;
  const currentTrans =
    monthlyLaborTransactions && monthlyLaborTransactions[route.params.month];
  const currentTransByProject =
    currentTrans &&
    groupByPropertyOfProperty(currentTrans, 'workordernt', 'wonum');

  const getListItem = item => {
    const day = item['spi:startdateentered']
      ? new Date(item['spi:startdateentered']).getDay()
      : null;
    const weekendHighlitCardStyle =
      day === 5 || day === 6 ? {backgroundColor: COLORS.lightBrand} : {};
    return (
      <Card>
        <CardItem
          header
          bordered
          style={[styles.cardHeader, weekendHighlitCardStyle]}>
          <Left style={styles.cardHeaderDesc}>
            <Text style={styles.cardHeaderWonum}>
              {`WO# : ${
                item.workordernt.wonum ? item.workordernt.wonum : '--'
              } - ${
                item.workordernt.description
                  ? item.workordernt.description
                  : '--'
              }`}
            </Text>
          </Left>
        </CardItem>
        <CardItem bordered style={weekendHighlitCardStyle}>
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
              } - ${props.route.params.firstname}`}</Text>
            </View>

            <View style={styles.cardItemStyle}>
              <Text style={styles.cardLabelItem}>Craft : </Text>
              <Text style={styles.cardDescItem}>{`${
                item['spi:craft'] ? item['spi:craft'] : '--'
              }`}</Text>
            </View>
          </Body>
        </CardItem>
        <CardItem footer bordered style={weekendHighlitCardStyle}>
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
  };

  const tabs =
    currentTransByProject &&
    Object.entries(currentTransByProject).map(item => ({
      projId: item[0],
      data: item[1],
      dataLength: item[1].length,
    }));

  const [selectedTab, setSelectedTab] = useState(tabs && tabs[0].projId);
  const filtredData =
    currentTrans &&
    currentTrans.filter(item => item.workordernt.wonum === selectedTab);
  return (
    <Container>
      <Content contentContainerStyle={commonStyles.contentContainerStyle}>
        <FlatList
          data={filtredData}
          renderItem={({item}) => getListItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Content>
      {tabs && tabs.length > 1 && (
        <Footer>
          {tabs &&
            tabs.map(item => (
              <FooterTab>
                <Button
                  active={tabs && selectedTab === item.projId}
                  onPress={() => setSelectedTab(item.projId)}>
                  <Text>{`${item.projId} (${item.dataLength})`}</Text>
                </Button>
              </FooterTab>
            ))}
        </Footer>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  divider: {backgroundColor: '#9DA6DD'},
  textDivider: {
    color: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontWeight: 'bold',
  },

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

export default withStore(LaborTransList);
