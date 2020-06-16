import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Body,
  Card,
  CardItem,
  Fab,
  Badge,
  Button,
  Icon,
} from 'native-base';

import {getStore} from '../../store';
import {COLORS} from '../../common/colors';

import Loader from '../Shared/Loader';
import FilterModal from './FilterModal';

import {$fetchTickets} from './state';

const withStore = connect(state => ({
  tickets: state.Ticket.tickets,
}));

const ListingView = props => {
  const [filterModalVisibility, setFilterModalVisibility] = useState(false);
  useEffect(() => {
    const {dispatch} = getStore();
    return props.navigation.addListener('focus', () => {
      dispatch($fetchTickets());
    });
  }, [props.navigation]);
  const dataReady = !!props.tickets;
  const getList = () => (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <Button
            style={styles.btnFilter}
            iconLeft
            transparent
            onPress={() => setFilterModalVisibility(true)}>
            <Text style={{color: COLORS.darkGray}}>Filter</Text>
          </Button>
        )}
        data={props.tickets && props.tickets}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.push('Details', {
                itemEndpoint: item['rdf:about'],
              })
            }>
            <Card>
              <CardItem header bordered>
                <Text style={styles.ticket_header_description}>
                  {item['spi:description']}
                </Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text style={styles.ticket_body_item}>{`${
                    item['spi:ticketid']
                  } -- ${
                    item['spi:status'] ? item['spi:status'] : '--'
                  }`}</Text>
                  <Text style={styles.ticket_body_item}>{`Created by ${
                    item['spi:reportedby'] ? item['spi:reportedby'] : ''
                  } on ${
                    item['spi:reportdate'] ? item['spi:reportdate'] : '--'
                  }`}</Text>
                  <Text style={styles.ticket_body_item}>{`Asset: ${
                    item['spi:assetorgid'] ? item['spi:assetorgid'] : '--'
                  }`}</Text>
                </Body>
              </CardItem>
              <CardItem footer bordered>
                <Badge style={styles.ticket_footer_badge}>
                  <Text style={styles.ticket_footer_text}>
                    {item['spi:status_description']
                      ? item['spi:status_description']
                      : ''}
                  </Text>
                </Badge>
              </CardItem>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={item => item['spi:ticketid']}
      />
      <Fab
        style={{backgroundColor: COLORS.blue}}
        position="bottomRight"
        onPress={() => props.navigation.push('Add')}>
        <Icon type="Feather" name="plus" />
      </Fab>
    </View>
  );

  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        {!dataReady ? <Loader /> : getList()}
        <FilterModal
          visible={filterModalVisibility}
          setFilterModalVisibility={setFilterModalVisibility}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  btnFilter: {
    width: 'auto',
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginVertical: 10,
  },
  ticket_header_description: {
    color: COLORS.darkGray,
    fontSize: 16,
    fontWeight: 'bold',
  },
  ticket_body_item: {
    color: COLORS.darkGray,
    fontSize: 14,
    marginTop: 6,
  },
  ticket_footer_badge: {
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  ticket_footer_text: {
    color: 'white',
    fontSize: 12,
  },
});

export default withStore(ListingView);
