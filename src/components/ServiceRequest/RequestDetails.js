import React from 'react';
import {Text, Container, Content, Fab, Icon} from 'native-base';
import {View} from 'react-native';
import { COLORS } from '../../common/colors';

const RequestDetails = (props) => {
  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        <View style={{flex: 1}}>
          <View>
            <Text>Hello</Text>
          </View>
          <Fab
            style={{backgroundColor: COLORS.blue}}
            position="bottomRight"
            //onPress={() => props.navigation.push('AddView')}
            >
            <Icon type="AntDesign" name="message1" />
          </Fab>
        </View>
      </Content>
    </Container>
  );
};

export default RequestDetails;
