import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {StyleSheet, FlatList, Image} from 'react-native';
import {
  View,
  Text,
  Spinner,
  Card,
  CardItem,
  Container,
  Content,
  Picker,
  Icon,
  Fab,
  Thumbnail,
  Badge,
} from 'native-base';

import {getStore} from '../../store';
import {$fetchSr, $fetchQueries} from './state';
import {COLORS} from '../../common/colors';
import {formatDate} from '../../common/helper';
import {TouchableOpacity} from 'react-native-gesture-handler';

const withStore = connect(state => ({
  list: state.ServiceRequest.list,
  queries: state.ServiceRequest.queries,
}));

const ListingView = props => {
  const [fetchingData, setFetchingData] = useState(true);

  const [selectedQuery, setSelectedQuery] = useState(null);
  useEffect(() => {
    (async function loadData() {
      const {dispatch} = getStore();
      await dispatch($fetchSr())
        .then(() => {
          dispatch($fetchQueries()).then(() => {
            console.log('SUCCESS SERVICE REQUEST LIST FETCH');
            setSelectedQuery(props.queries[0]);
            setFetchingData(false);
          });
        })
        .catch(() => {
          console.log('ERROR FETCHING SERVICE REQUEST');
          setFetchingData(false);
        });
    })();
  }, []);

  const getList = () => {
    return (
      <View style={{flex: 1}}>
        <View>
          <View style={styles.view}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styles.picker}
              placeholder="Select your SIM"
              placeholderStyle={styles.placeholderPickerStyle}
              placeholderIconColor="#007aff"
              selectedValue={selectedQuery}
              onValueChange={value => setSelectedQuery(value)}>
              {props.queries.map(query => (
                <Picker.Item label={query.name} value={query.name} />
              ))}
            </Picker>
            <FlatList
              data={props.list}
              keyExtractor={item => item['spi:ticketid']}
              renderItem={({item}) => {
                return (
                  <View
                  //onPress={() => props.navigation.navigate('RequestDetails')}
                  >
                    <Card style={styles.card}>
                      <CardItem header bordered style={styles.header}>
                        <Text style={styles.ticketid}>
                          {item['spi:ticketid']} - {item['spi:description']}
                        </Text>

                        {/* <Text style={styles.status}>{item['spi:status']}</Text> */}
                      </CardItem>
                      {/* <CardItem style={{paddingBottom: 0}}>
                        <Text style={styles.description}>
                          {`Report date : ${formatDate(
                            item['spi:reportdate'],
                          )}`}
                        </Text>
                      </CardItem>
                      <CardItem>
                        <Text style={styles.description}>
                          {`Reported by : ${item['spi:reportedby']}`}
                        </Text>
                      </CardItem> */}
                      <CardItem style={styles.cardBody}>
                        {item.classstructure._imagelibref ? (
                          <TouchableOpacity style={styles.imageWrapper}>
                            <Image
                              source={{uri: item.classstructure._imagelibref}}
                              style={styles.thumbnail}
                            />
                          </TouchableOpacity>
                        ) : (
                          // <Thumbnail
                          //   large
                          //   source={{uri: item.classstructure._imagelibref}}
                          // />
                          <TouchableOpacity style={styles.touchableItem}>
                            <Icon
                              type="MaterialIcons"
                              name="broken-image"
                              style={{marginLeft: 6, color: COLORS.darkGray}}
                            />
                          </TouchableOpacity>
                        )}

                        <TouchableOpacity
                          disabled={!item['spi:worklog']}
                          onPress={() =>
                            props.navigation.navigate('WorkLogView', {
                              ticketid: item['spi:ticketid'],
                            })
                          }
                          style={styles.touchableItem}>
                          <Badge
                            style={{
                              backgroundColor: COLORS.lightBlue,
                              position: 'absolute',
                              zIndex: 100,
                              top: -1,
                              left: 42,
                            }}>
                            <Text>
                              {item['spi:worklog']
                                ? item['spi:worklog'].length
                                : 0}
                            </Text>
                          </Badge>
                          <Icon
                            type="AntDesign"
                            name="message1"
                            style={{marginLeft: 6, color: COLORS.darkGray}}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('Attachments', {
                              ticketid: item['spi:ticketid'],
                            })
                          }
                          style={styles.touchableItem}>
                          <Badge
                            style={{
                              backgroundColor: COLORS.lightBlue,
                              position: 'absolute',
                              zIndex: 100,
                              top: -1,
                              left: 42,
                            }}>
                            <Text>3</Text>
                          </Badge>
                          <Icon
                            type="Entypo"
                            name="attachment"
                            style={{marginLeft: 6, color: COLORS.darkGray}}
                          />
                        </TouchableOpacity>
                      </CardItem>
                      <CardItem footer bordered style={styles.header}>
                        <Text>{formatDate(item['spi:statusdate'])}</Text>
                        <Text>{item['spi:status']}</Text>
                      </CardItem>
                    </Card>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <Fab
          style={{backgroundColor: COLORS.blue}}
          position="bottomRight"
          onPress={() => props.navigation.push('AddView')}>
          <Icon type="Feather" name="plus" />
        </Fab>
      </View>
    );
  };

  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        {fetchingData ? <Spinner /> : getList()}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  card: {
    marginTop: 18,
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ticketid: {
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  description: {
    color: COLORS.darkGray,
  },
  status: {
    color: COLORS.danger,
  },
  picker: {
    width: '100%',
    marginTop: 20,
  },
  placeholderPickerStyle: {},
  touchableItem: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.darkGray,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 100 / 2,
    resizeMode: 'cover',
  },
});

export default withStore(ListingView);
