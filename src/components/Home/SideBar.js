import React from 'react';
import {connect} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import {COLORS} from '../../common/colors';
import {Icon} from 'native-base';
import {$logout} from '../Auth/state';
import {getStore} from '../../store';

const withStore = connect(state => ({
  profile: state.Auth.profile,
}));

function SideBar(props) {
  const dataReady = !!props.profile;

  const logout = () => {
    const {dispatch} = getStore();
    dispatch($logout()).then(() => props.navigation.navigate('Login'));
  };
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
        label="Service Request"
        labelStyle={styles.labelStyle}
        // icon={() => (
        //   <Icon
        //     type="FontAwesome5"
        //     name="business-time"
        //     style={styles.drawerItemIcon}
        //   />
        // )}
        onPress={() => props.navigation.navigate('LaborTransactions')}
      />
      {/* <DrawerItem
        label="Tickets"
        labelStyle={styles.labelStyle}
        icon={() => (
          <Icon
            type="FontAwesome5"
            name="ticket-alt"
            style={styles.drawerItemIcon}
          />
        )}
        onPress={() => props.navigation.navigate('Tickets')}
      /> */}
      {/* <DrawerItem
        label="Labor reporting"
        labelStyle={styles.labelStyle}
        icon={() => (
          <Icon
            type="FontAwesome5"
            name="business-time"
            style={styles.drawerItemIcon}
          />
        )}
        onPress={() => props.navigation.navigate('LaborTransactions')}
      /> */}
      {/* <DrawerItem
        label="Map"
        labelStyle={styles.labelStyle}
        icon={() => (
          <FontAwesome5 name="map-marked-alt" size={18} color={COLORS.darkGray} />
        )}
        onPress={() => props.navigation.navigate("Map")}
      /> */}
      {/* <DrawerItem
        label="Labor approval"
        labelStyle={styles.labelStyle}
        icon={() => (
          <Icon
            type="AntDesign"
            name="clockcircleo"
            style={styles.drawerItemIcon}
          />
        )}
        onPress={() => props.navigation.navigate('LaborApprovalStack')}
      /> */}
      <DrawerItem
        label="Logout"
        labelStyle={styles.labelStyle}
        icon={() => (
          <Icon type="AntDesign" name="logout" style={styles.drawerItemIcon} />
        )}
        onPress={() => logout()}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerItemIcon: {fontSize: 20, color: COLORS.darkGray},
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
