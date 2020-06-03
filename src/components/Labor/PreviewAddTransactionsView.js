import React, {useState} from 'react';
import {connect} from 'react-redux';

import {FlatList, Text, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  View,
  Button,
} from 'native-base';

import COLORS from '../../common/colors';

import Loader from '../Shared/Loader';

import {getStore} from '../../store';
import {formatDate} from '../../common/helper';

import {$AddBulkLaborTransactions} from './state';

const withStore = connect(state => ({
  username: state.Auth.username,
  laborTransactionsPreview: state.Labor.laborTransactionsPreview,
}));

const PreviewAddTransactionsView = props => {
  const [proceedingAdd, setProceedingAdd] = useState(false);

  const submit = () => {
    setProceedingAdd(true);
    const {dispatch} = getStore();
    const transactions = props.laborTransactionsPreview;
    Promise.all(
      transactions.map(async transaction => {
        await dispatch($AddBulkLaborTransactions(transaction));
      }),
    ).then(() => {
      setProceedingAdd(false);
      props.navigation.navigate('TransactionsList');
    });
  };

  const getList = () => (
    <View>
      <FlatList
        data={props.laborTransactionsPreview && props.laborTransactionsPreview}
        renderItem={({item}) => (
          <Card>
            <CardItem header bordered>
              <Text style={styles.item_header_description}>
                {`Workorder Ref : ${item.refwo ? item.refwo : '--'}`}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text style={styles.item_body_item}>{`Labor Code : ${
                  props.username ? props.username : '--'
                }`}</Text>
                <Text style={styles.item_body_item}>{`Start date : ${
                  item.startdateentered
                    ? formatDate(item.startdateentered)
                    : '--'
                }`}</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text style={styles.item_footer_text}>
                {`Regular hours: ${item.regularhrs ? item.regularhrs : '--'}`}
              </Text>
            </CardItem>
          </Card>
        )}
        keyExtractor={(item, index) => index}
      />
      <Button style={styles.btnSubmit} onPress={() => submit()}>
        <Text style={styles.btnSubmitText}>Confirm</Text>
      </Button>
    </View>
  );
  const dataReady = !!props.laborTransactionsPreview;

  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        {!dataReady || proceedingAdd ? <Loader /> : getList()}
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

  item_footer_text: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  btnSubmit: {
    marginTop: 20,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  btnSubmitText: {
    color: COLORS.white,
  },
});

export default withStore(PreviewAddTransactionsView);
