import React from "react";
import { Modal, Text, StyleSheet } from "react-native";
import {
  Button,
  View,
  Form,
  Item,
  Label,
  Input,
  Textarea,
  H1,
} from "native-base";
import {COLORS} from "../../common/colors";

const FilterModal = (props) => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContent}>
        {/* <H1 style={styles.modalTitle}>Filter</H1>
        <Form>
          <Item stackedLabel>
            <Label>Service Request</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Summary</Label>
            <Textarea rowSpan={3} />
          </Item>
          <Item stackedLabel>
            <Label>Reported By</Label>
            <Input />
          </Item>
        </Form> */}
        <Text style={{ color: COLORS.lightGray, padding: 20 }}>
          In progress ...
        </Text>
      </View>
      <Button
        style={styles.modalApplyBtn}
        onPress={() => props.setFilterModalVisibility(false)}
      >
        <Text style={styles.modalApplyTextBtn}>Return</Text>
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
  },
  modalTitle: { color: "#3f87bf", paddingVertical: 18, paddingLeft: 10 },
  modalApplyBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalApplyTextBtn: { color: "#ffffff" },
});

export default FilterModal;
