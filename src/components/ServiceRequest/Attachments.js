import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {
  Text,
  Container,
  Content,
  Spinner,
  Icon,
  Card,
  CardItem,
  Fab,
} from 'native-base';

import HTML from 'react-native-render-html';
import {$fetchAtt} from './state';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../common/colors';
import {formatDate} from '../../common/helper';

const windowWidth = Dimensions.get('window').width;

const withStore = connect((state, props) => ({
  attachments: state.ServiceRequest.attachments,
  selectedSR: state.ServiceRequest.list.find(
    e => e['spi:ticketid'] == props.route.params.ticketid,
  ),
}));

const Attachments = props => {
  const {selectedSR} = props;
  const [fetchingData, setFetchingData] = useState(true);
  useEffect(() => {
    const {dispatch} = props;
    const url = selectedSR['rdf:about'];
    dispatch($fetchAtt(url))
      .then(() => {
        console.log('Attachments FETCHED SUCCESSFULLY');
        setFetchingData(false);
      })
      .catch(() => {
        console.log('Attachments FETCH FAILED');
        setFetchingData(false);
      });
  }, []);
  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{padding: 20}}>
            <Text style={{fontWeight: 'bold'}}>
              {selectedSR['spi:ticketid']}
              {selectedSR['spi:description'] &&
                ` - ${selectedSR['spi:description']}`}
            </Text>
            <View style={styles.headerItem}>
              <Text style={styles.label}>Status : </Text>
              <Text style={styles.headerText}>{selectedSR['spi:status']}</Text>
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
            <View style={[styles.headerItem, styles.htmlDesc]}>
              <Text style={[styles.label, {marginBottom: 10}]}>Details : </Text>
              <HTML
                source={{html: selectedSR['spi:description_longdescription']}}
              />
            </View>
          </View>
          {fetchingData ? (
            <Spinner />
          ) : (
            <View style={styles.wrapper}>
              {props.attachments.map((item, index) => (
                <View key={index} style={styles.thumbnailWrapper}>
                  <Image
                    source={{uri: item.localref}}
                    style={styles.thumbnail}
                  />
                  <Text style={styles.desc}>
                    {item['wdrs:describedBy']['spi:fileName']}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <Fab style={{backgroundColor: COLORS.blue}} position="bottomRight">
            <Icon type="Feather" name="plus" />
          </Fab>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  thumbnailWrapper: {
    width: windowWidth / 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
  },
  desc: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.darkGray,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
  },
  exclamationView: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: COLORS.darkGray,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  htmlDesc: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    paddingBottom: 20,
  },
});

export default withStore(Attachments);
