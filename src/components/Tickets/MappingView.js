import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {connect} from 'react-redux';

import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {
  Container,
  Content,
  Header,
  Left,
  Button,
  Body,
  Right,
} from 'native-base';

import {$fetchTickets} from './state';

import {getStore} from '../../store';

const withStore = connect(state => ({
  tickets: state.Ticket.tickets,
}));

class MappingView extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {dispatch} = getStore();
    dispatch($fetchTickets()).then(() =>
      this.mapRef.fitToCoordinates(
        this.props.tickets.map(ticket => ({
          longitude: ticket.geometry.coordinates[0],
          latitude: ticket.geometry.coordinates[1],
        })),
        {
          edgePadding: {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100,
          },
          animated: true,
        },
      ),
    );
  }

  render() {
    return (
      <Container>
        {/* @TODO
         * 1) Change the logic of the header
         * 2) Organise styling on the whole appli
         */}
        <Header style={{backgroundColor: '#5f7d77'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}>
              {/* <FontAwesome5 name="bars" size={24} color="white" /> */}
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>
          <View style={styles.container}>
            <MapView
              ref={ref => {
                this.mapRef = ref;
              }}
              provider={PROVIDER_GOOGLE}
              style={styles.map}>
              {this.props.tickets &&
                this.props.tickets.map((ticket, index) => (
                  <Marker
                    key={index}
                    // description={ticket.properties.description}
                    coordinate={{
                      longitude: ticket.geometry.coordinates[0],
                      latitude: ticket.geometry.coordinates[1],
                    }}>
                    {/* <Text style={styles.type}>{ticket.properties.type}</Text> */}
                    <Callout>
                      <Text style={styles.type}>{ticket.properties.type}</Text>
                      <Text style={styles.status}>
                        {ticket.properties.status}
                      </Text>
                      <Text>{ticket.properties.region}</Text>
                    </Callout>
                  </Marker>
                ))}
            </MapView>
          </View>
        </Content>
      </Container>
    );
  }
}

/**
 * @todo changer the map container style
 */
const styles = StyleSheet.create({
  type: {color: 'green', fontStyle: 'italic'},
  status: {color: 'red', fontStyle: 'italic'},
  container: {
    height: 620,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default withStore(MappingView);
