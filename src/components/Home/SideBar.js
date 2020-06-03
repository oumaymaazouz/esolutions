import React from 'react';
import {connect} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import COLORS from '../../common/colors';
import {Icon} from 'native-base';

const withStore = connect(state => ({
  profile: state.Auth.profile,
}));

function SideBar(props) {
  const dataReady = !!props.profile;
  return (
    <DrawerContentScrollView {...props}>
      <View>
        {dataReady && (
          <TouchableOpacity
            style={styles.customProfileItem}
            onPress={() => props.navigation.navigate('Profile')}>
            <View style={styles.customAvatar}>
              <Text style={styles.customAvatarText}>
                {props.profile.displayName.substring(0, 2)}
              </Text>
            </View>
            <Text style={styles.displayName}>{props.profile.displayName}</Text>
          </TouchableOpacity>
        )}
      </View>
      <DrawerItem
        label="Tickets"
        labelStyle={styles.labelStyle}
        icon={() => (
          <Icon
            type="FontAwesome5"
            name="ticket-alt"
            style={{fontSize: 20, color: COLORS.darkGray}}
          />
        )}
        onPress={() => props.navigation.navigate('Tickets')}
      />
      <DrawerItem
        label="Labor Transactions"
        labelStyle={styles.labelStyle}
        icon={() => (
          <Icon
            type="FontAwesome5"
            name="business-time"
            style={{fontSize: 20, color: COLORS.darkGray}}
          />
        )}
        onPress={() => props.navigation.navigate('LaborTransactions')}
      />
      {/* <DrawerItem
        label="Map"
        labelStyle={styles.labelStyle}
        icon={() => (
          <FontAwesome5 name="map-marked-alt" size={18} color={COLORS.darkGray} />
        )}
        onPress={() => props.navigation.navigate("Map")}
      /> */}
      <DrawerItem
        label="Logout"
        labelStyle={styles.labelStyle}
        icon={() => (
          <Icon
            type="AntDesign"
            name="logout"
            style={{fontSize: 20, color: COLORS.darkGray}}
          />
        )}
        onPress={() => props.navigation.navigate('Login')}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  customProfileItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingVertical: 24,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 0.5,
  },
  customAvatar: {
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: COLORS.blue,
    paddingVertical: 10,
  },
  customAvatarText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  displayName: {
    paddingLeft: 20,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  labelStyle: {
    color: COLORS.darkGray,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default withStore(SideBar);
