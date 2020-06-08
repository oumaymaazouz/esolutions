import React, {useState} from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Card,
  Button,
  Icon,
  Toast,
} from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';

import COLORS from '../../common/colors';
import {getStore} from '../../store';
import {formatDate, getDates, isPositiveNumber} from '../../common/helper';

import {$previewTransactionsList} from './state';

const AddTransactionsView = props => {
  const [transaction, setTransaction] = useState({
    regularhrs: 0.0,
    startdateentered: new Date().toISOString(),
  });

  // const [weekendIncluded, setWeekendIncluded] = useState(false);

  const submit = () => {
    // Validate inputs before submitting
    const {regularhrs} = transaction;
    if (!isPositiveNumber(regularhrs)) {
      Toast.show({
        text: 'Regular hours should be positive number',
        type: 'danger',
        duration: 6000,
      });
    } else if (new Date(dateStart) >= new Date(dateEnd)) {
      Toast.show({
        text: 'Please fill start and end date correctely',
        type: 'danger',
        duration: 6000,
      });
    } else {
      let data = [];
      const dates = getDates(new Date(dateStart), new Date(dateEnd));
      dates.map(date => {
        const startdateentered = new Date(date);
        data.push({
          ...transaction,
          startdateentered: startdateentered.toISOString(),
        });
      });

      const {dispatch} = getStore();
      dispatch($previewTransactionsList(data));
      props.navigation.navigate('PreviewAddTransactions');
    }
  };

  const today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  /**
   * @description : handle start date picker
   */

  const [showDateStart, setShowDateStart] = useState(false);
  const [dateStart, setDateStart] = useState(new Date(today));
  const onChangeDateStart = (event, selectedDate) => {
    const currentDate = selectedDate || dateStart;
    setShowDateStart(Platform.OS === 'ios');
    setDateStart(new Date(currentDate).toISOString());
  };
  const showDateStartpicker = () => {
    setDateStart(new Date(dateStart));
    setShowDateStart(true);
  };

  /**
   * @description : handle end date picker
   */

  const [showDateEnd, setShowDateEnd] = useState(false);
  const [dateEnd, setDateEnd] = useState(new Date(tomorrow));
  const onChangeDateEnd = (event, selectedDate) => {
    const currentDate = selectedDate || dateEnd;
    setShowDateEnd(Platform.OS === 'ios');
    setDateEnd(new Date(currentDate).toISOString());
  };
  const showDateEndpicker = () => {
    setDateEnd(new Date(dateEnd));
    setShowDateEnd(true);
  };

  const getForm = () => {
    return (
      <Form>
        <Item fixedLabel style={styles.formitem}>
          <Label style={styles.label}>Regular hours</Label>
          <Input
            keyboardType="numeric"
            style={styles.input}
            placeholder="0.0"
            placeholderTextColor={COLORS.lightGray}
            onChangeText={value =>
              setTransaction({
                ...transaction,
                regularhrs: parseFloat(value),
              })
            }
          />
        </Item>
        <Item fixedLabel style={styles.formitem}>
          <Label style={styles.label}>Start date</Label>
          <Button
            transparent
            style={styles.btnCalendar}
            onPress={showDateStartpicker}>
            <Icon type="Feather" name="calendar" style={styles.iconCalendar} />
            <Text style={styles.dateValue}>
              {dateStart ? formatDate(dateStart) : 'dd/mm/yyyy'}
            </Text>
          </Button>

          {showDateStart && (
            <DateTimePicker
              testID="dateStartTimePicker"
              value={dateStart}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDateStart}
            />
          )}
        </Item>
        <Item fixedLabel style={styles.formitem}>
          <Label style={styles.label}>End date</Label>
          <Button
            transparent
            style={styles.btnCalendar}
            onPress={showDateEndpicker}>
            <Icon type="Feather" name="calendar" style={styles.iconCalendar} />
            <Text style={styles.dateValue}>
              {dateEnd ? formatDate(dateEnd) : 'dd/mm/yyyy'}
            </Text>
          </Button>

          {showDateEnd && (
            <DateTimePicker
              testID="dateEndTimePicker"
              value={dateEnd}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDateEnd}
            />
          )}
        </Item>
        {/* <Item style={styles.formitem}>
          <Switch
            thumbColor={weekendIncluded ? COLORS.lightBlue : COLORS.lightGray}
            trackColor={{true: COLORS.lightBlue, false: COLORS.lightGray}}
            value={weekendIncluded}
            onValueChange={() => setWeekendIncluded(!weekendIncluded)}
          />

          <Text style={styles.switchText}>
            {weekendIncluded ? 'Week-end included.' : 'Week-end excluded.'}
          </Text>
        </Item> */}
        <Item style={[styles.formitem, styles.btnFormItem]}>
          <Button style={styles.btnSubmit} onPress={() => submit()}>
            <Text style={styles.btnSubmitText}>Submit</Text>
          </Button>
        </Item>
      </Form>
    );
  };

  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        <Card style={styles.card}>{getForm()}</Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
  },
  label: {
    color: COLORS.darkGray,
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    color: COLORS.darkGray,
    fontSize: 14,
  },
  formitem: {
    borderBottomWidth: 0,
    marginBottom: 12,
  },
  switchText: {
    color: COLORS.darkGray,
    fontSize: 14,
    marginLeft: 20,
  },
  dateValue: {
    color: COLORS.darkGray,
  },
  btnCalendar: {
    marginRight: 90,
  },
  iconCalendar: {
    color: COLORS.darkGray,
    fontSize: 20,
  },
  btnFormItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnSubmit: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 20,
    marginRight: 30,
  },
  btnSubmitText: {
    color: COLORS.white,
    fontSize: 14,
  },
});

export default AddTransactionsView;
