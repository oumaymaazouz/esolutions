import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {Text, Container, Content, Spinner, Icon} from 'native-base';
import {$fetchClassifications, $fetchSubClassifications} from './state';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {COLORS} from '../../common/colors';

const windowWidth = Dimensions.get('window').width;

const withStore = connect(state => ({
  activeParent: state.ServiceRequest.activeParent,
}));

const SelectSubClassifications = props => {
  const [fetchingData, setFetchingData] = useState(true);
  useEffect(() => {
    const {dispatch} = props;

    dispatch($fetchSubClassifications(props.route.params.parentId))
      .then(() => {
        console.log('SUBCLASSIFICATIONS FETCHED SUCCESSFULLY');
        setFetchingData(false);
      })
      .catch(() => {
        console.log('SUBCLASSIFICATIONS FETCH FAILED');
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
            {props.activeParent.children &&
              props.activeParent.children.map(item => (
                <View style={styles.thumbnailWrapper}>
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
                </View>
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
  icon: {
    color: COLORS.danger,
    fontSize: 30,
  },
});

export default withStore(SelectSubClassifications);
