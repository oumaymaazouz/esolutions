import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Modal,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {View, Button} from 'native-base';
import Loader from '../Shared/Loader';
import {screenWidth} from '../../common/helper';
import COLORS from '../../common/colors';

const withStore = connect(state => ({workorders: state.Labor.workorders}));

const AddWOModal = props => {
  const [workorder, setWorkorder] = useState(null);
  return (
    <Modal animationType="fade" visible={props.visible} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{alignItems: 'flex-end'}}>
            {props.workorders ? (
              <FlatList
                style={styles.flatlist}
                data={props.workorders}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.touchableItem,
                      item['spi:description'] === workorder && {
                        backgroundColor: COLORS.backgroundBlue,
                      },
                    ]}
                    onPress={() => {
                      setWorkorder(item['spi:description']);
                    }}>
                    <Text
                      style={[
                        styles.touchableItemText,
                        item['spi:description'] === workorder && {
                          color: COLORS.blue,
                        },
                      ]}>
                      {item['spi:description']}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Loader />
            )}
            <View style={styles.buttonsWrapper}>
              <Button
                style={styles.btnCancel}
                transparent
                onPress={() => props.setSelectModalVisibility(false)}>
                <Text style={styles.btnCancelText}>Cancel</Text>
              </Button>
              <Button
                disabled={!workorder}
                style={styles.btnSubmit}
                onPress={() => {
                  props.setWorkorder(workorder);
                  props.setSelectModalVisibility(false);
                }}>
                <Text style={styles.btnSubmitText}>Confirm</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    opacity: 1,
    borderRadius: 20,
    marginVertical: 160,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flatlist: {
    width: (2 * screenWidth) / 3,
    borderWidth: 1,
    borderColor: '#f4f4f4',
    borderRadius: 10,
  },
  btnCancel: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  btnCancelText: {
    color: COLORS.darkGray,
    fontSize: 14,
  },
  btnSubmit: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  btnSubmitText: {
    color: COLORS.white,
    fontSize: 14,
  },
  touchableItem: {
    padding: 14,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  touchableItemText: {color: COLORS.darkGray, fontWeight: 'bold'},
  buttonsWrapper: {flexDirection: 'row', marginTop: 16},
});
export default withStore(AddWOModal);
