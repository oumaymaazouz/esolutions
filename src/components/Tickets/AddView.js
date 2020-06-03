import React from "react";
import { Text } from "react-native";
import { Container, Content, Form, Item, Label, Input } from "native-base";
import COLORS from "../../common/colors";

const AddView = () => {
  return (
    <Container>
      <Content>
        {/* region
      description
      localGovernmentArea
      locationStreetName
      situation
      type
      status */}
        {/* <Form>
          <Item stackedLabel>
            <Label>Region</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Description</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Government</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Street</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Situation</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Type</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Status</Label>
            <Input />
          </Item>
        </Form> */}
        <Text style={{ color: COLORS.lightGray, padding: 20 }}>
          In progress ...
        </Text>
      </Content>
    </Container>
  );
};

export default AddView;
