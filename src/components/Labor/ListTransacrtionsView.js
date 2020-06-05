import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Body, Content, Card, CardItem, Fab, Icon} from 'native-base';

import Loader from '../Shared/Loader';

import {getStore} from '../../store';
import {$fetchLaborTransactions} from './state';
import COLORS from '../../common/colors';

import {formatDate} from '../../common/helper';

const withStore = connect(state => ({
  laborTransactions: state.Labor.laborTransactions,
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
    return (
      <View>
        <FlatList
          data={props.laborTransactions && props.laborTransactions}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                console.log('GO TO DETAILS VIEW, NOT YET IMPLEMENTED!')
              }>
              <Card>
                <CardItem header bordered>
                  <Text style={styles.item_header_description}>
                    {`Workorder Ref : ${
                      item['spi:refwo'] ? item['spi:refwo'] : '--'
                    }`}
                  </Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text style={styles.item_body_item}>{`Labor Code : ${
                      item['spi:laborcode'] ? item['spi:laborcode'] : '--'
                    }`}</Text>
                    <Text style={styles.item_body_item}>{`Start date : ${
                      item['spi:startdateentered']
                        ? formatDate(item['spi:startdateentered'])
                        : '--'
                    }`}</Text>
                  </Body>
                </CardItem>
                <CardItem footer bordered>
                  <Text style={styles.item_footer_text}>
                    {`Regular hours: ${
                      item['spi:regularhrs'] ? item['spi:regularhrs'] : '--'
                    }`}
                  </Text>
                </CardItem>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
