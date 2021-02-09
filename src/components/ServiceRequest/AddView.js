import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {Text, Container, Content, Spinner, Icon} from 'native-base';
import {$fetchClassifications} from './state';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../common/colors';

const windowWidth = Dimensions.get('window').width;

const withStore = connect(state => ({
  classifications: state.ServiceRequest.classifications,
}));

const AddView = props => {
  const [fetchingData, setFetchingData] = useState(true);
  useEffect(() => {
    const {dispatch} = props;
    dispatch($fetchClassifications())
      .then(() => {
        console.log('CLASSIFICATIONS FETCHED SUCCESSFULLY');
        setFetchingData(false);
      })
      .catch(() => {
        console.log('CLASSIFICATIONS FETCH FAILED');
        setFetchingData(false);
      });
  }, []);

  return (
    <Container>
      <Content>
        {fetchingData ? (
          <Spinner />
        ) : (
          <View style={styles.wrapper}>
            {props.classifications.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.navigation.navigate('SelectSubClassifications', {
                    parentId: item['spi:classstructureid'],
                  })
                }
                style={styles.thumbnailWrapper}>
                {item._imagelibref ? (
                  <Image
                    source={{uri: item._imagelibref}}
                    style={styles.thumbnail}
                  />
                ) : (
                  <View style={styles.exclamationView}>
                  <Icon
                    type="MaterialIcons"
                    name="broken-image"
                    style={{color: COLORS.darkGray, fontSize: 40}}
                  />
                </View>
                )}
                <Text style={styles.desc}>{item['spi:description']}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    resizeMode: 'cover'
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
});

export default withStore(AddView);
