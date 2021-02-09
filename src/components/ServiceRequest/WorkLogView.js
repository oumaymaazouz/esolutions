import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {FlatList, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Container,
  Content,
  Icon,
  Fab,
  Card,
  CardItem,
} from 'native-base';
import HTML from 'react-native-render-html';
import {COLORS} from '../../common/colors';
import {formatDate} from '../../common/helper';

const withStore = connect((state, props) => ({
  selectedSR: state.ServiceRequest.list.find(
    e => e['spi:ticketid'] == props.route.params.ticketid,
  ),
}));

const WorkLogView = props => {
  const {selectedSR} = props;
  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1}}>
          <View>
            <View style={{padding: 20}}>
              <Text style={{fontWeight: 'bold'}}>
                {selectedSR['spi:ticketid']}
                {selectedSR['spi:description'] &&
                  ` - ${selectedSR['spi:description']}`}
              </Text>
              <View style={styles.headerItem}>
                <Text style={styles.label}>Status : </Text>
                <Text style={styles.headerText}>
                  {selectedSR['spi:status']}
                </Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.label}>Report date : </Text>
                <Text style={styles.headerText}>
                  {formatDate(selectedSR['spi:reportdate'])}
                </Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.label}>Asset : </Text>
                <Text style={styles.headerText}>
                  <Text style={styles.headerText}>
                    {selectedSR.asset.description}
                  </Text>
                </Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.label}>Location : </Text>
                <Text style={styles.headerText}>
                  <Text style={styles.headerText}>
                    {selectedSR.location.description}
                  </Text>
                </Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={[styles.label, {marginBottom: 10}]}>
                  Details :{' '}
                </Text>
                <HTML
                  source={{html: selectedSR['spi:description_longdescription']}}
                />
              </View>
            </View>
            <FlatList
              data={selectedSR['spi:worklog']}
              keyExtractor={item => item['spi:ticketid']}
              renderItem={({item}) => {
                return (
                  <Card style={styles.card}>
                    <CardItem header bordered>
                      <Text>{item['spi:description']}</Text>
                    </CardItem>
                    <CardItem>
                      <HTML
                        source={{html: item['spi:description_longdescription']}}
                      />
                    </CardItem>
                    <CardItem footer bordered style={styles.header}>
                      <Text>{formatDate(item['spi:createdate'])}</Text>
                      <Text>{item['spi:createby']}</Text>
                    </CardItem>
                  </Card>
                );
              }}
            />
          </View>
          <Fab style={{backgroundColor: COLORS.blue}} position="bottomRight">
            <Icon type="AntDesign" name="message1" />
          </Fab>
        </View>
      </Content>
    </Container>
    /* <HTML source={{html: htmlContent}} /> */
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 18,
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.darkGray,
  },
  headerText: {fontSize: 16},
});
export default withStore(WorkLogView);
