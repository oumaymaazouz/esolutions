import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
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
} from 'native-base';

import Loader from '../Shared/Loader';

import {getStore} from '../../store';
import {$fetchLaborTransactions} from './state';
import COLORS from '../../common/colors';

import {formatDate} from '../../common/helper';

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

  const getList = () => {
    console.log('++++++++++++++++++++++++++++++');
    console.log(
      props.monthlyLaborTransactions &&
        props.monthlyLaborTransactions[props.route.params.month],
    );
    return (
      <View>
        <View>
          {/* <Text style={styles.indicatedMonth}>{props.route.params.month}</Text> */}
          <FlatList
            data={
              props.monthlyLaborTransactions &&
              props.monthlyLaborTransactions[props.route.params.month]
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  console.log('GO TO DETAILS VIEW, NOT YET IMPLEMENTED!')
                }>
                <Card>
                  <CardItem header bordered>
                    <Text style={styles.item_header_description}>
                      {`WO# : ${item['spi:refwo'] ? item['spi:refwo'] : '--'}`}
                    </Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text style={styles.item_body_item}>{`Labor : ${
                        item['spi:laborcode'] ? item['spi:laborcode'] : '--'
                      } - ${props.profile.displayName}`}</Text>
                      <Text style={styles.item_body_item}>{`Date : ${
                        item['spi:startdateentered']
                          ? new Date(item['spi:startdateentered'])
                              .toISOString()
                              .substring(0, 10)
                          : '--'
                      }`}</Text>
                    </Body>
                  </CardItem>
                  <CardItem footer bordered>
                    <Left>
                      <Text style={styles.item_footer_text}>
                        {`Reported hours: ${
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
                            style={{color: '#5cb85c', fontSize: 30 }}
                          />
                        ) : (
                          <Icon
                            type="FontAwesome"
                            name="circle"
                            style={{color: '#d9534f', fontSize: 30 }}
                          />
                        )}
                      </Text>
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            )}
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
        <Text>list</Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  indicatedMonth: {
    color: COLORS.darkGray,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnFilter: {
    width: 'auto',
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginVertical: 10,
  },
  btnIcon: {
    marginRight: 4,
    fontSize: 18,
    color: COLORS.darkGray,
  },
  item_header_description: {
    color: COLORS.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
  item_body_item: {
    color: COLORS.darkGray,
    fontSize: 14,
    marginTop: 6,
  },
  item_footer_badge: {
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  item_footer_text: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
});

export default withStore(LaborTransactionsView);
