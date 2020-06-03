import React, {useState, Component} from 'react';
import {Text, Switch, StyleSheet, Platform} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Card,
  Button,
} from 'native-base';

import DateTimePicker from '@react-native-community/datetimepicker';

import COLORS from '../../common/colors';

import {getStore} from '../../store';
import {$previewTransactionsList} from './state';
import DatePicker from '../Shared/DatePicker';
import {formatDate, getDates} from '../../common/helper';

const AddTransactionsView = props => {
  const [transaction, setTransaction] = useState({
    regularhrs: 0.0,
    startdateentered: new Date().toISOString(),
  });

  const [weekendIncluded, setWeekendIncluded] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  /**********HANDLE START DATE PICKER ***************/
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(
    false,
  );

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const handleStartDateConfirm = (event, selectedDate) => {
    setStartDate(selectedDate);
    setStartDatePickerVisibility(Platform.OS === 'ios');
  };
  /*************************************/

  /**********HANDLE END DATE PICKER ***************/
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = date => {
    setEndDate(date);
    hideEndDatePicker();
  };
  /*************************************/

  const submit = () => {
    let data = [];
    const dates = getDates(startDate, endDate);
    console.log('dates', dates);
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
  };

  const getForm = () => (
    <Form>
      <Item fixedLabel style={styles.formitem}>
        <Label style={styles.label}>Regular hours</Label>
        <Input
          keyboardType="numeric"
          style={styles.input}
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
          onPress={showStartDatePicker}>
          {/* <FontAwesome name="calendar" size={20} color={COLORS.darkGray} /> */}
        </Button>
        <Text style={styles.dateValue}>
          {startDate ? formatDate(startDate) : 'dd/mm/yyyy'}
        </Text>

        {isStartDatePickerVisible && (
          <DateTimePicker
            value={startDate}
            mode="date"
            onChange={handleStartDateConfirm}
          />
        )}
      </Item>
      <Item fixedLabel style={styles.formitem}>
        <Label style={styles.label}>End date</Label>
        <Button
          transparent
          style={styles.btnCalendar}
          // onPress={showEndDatePicker}
        >
          {/* <FontAwesome name="calendar" size={20} color={COLORS.darkGray} /> */}
        </Button>
        {/* <DatePicker
          isDatePickerVisible={isEndDatePickerVisible}
          handleConfirm={() => handleEndDateConfirm()}
          hideDatePicker={() => hideEndDatePicker()}
        /> */}
        <Text style={styles.dateValue}>
          {endDate ? formatDate(endDate) : 'dd/mm/yyyy'}
        </Text>
      </Item>
      <Item style={styles.formitem}>
        <Switch
          thumbColor={weekendIncluded ? COLORS.lightBlue : COLORS.lightGray}
          trackColor={{true: COLORS.lightBlue, false: COLORS.lightGray}}
          value={weekendIncluded}
          onValueChange={() => setWeekendIncluded(!weekendIncluded)}
        />

        <Text style={styles.switchText}>
          {weekendIncluded ? 'Week-end included.' : 'Week-end excluded.'}
        </Text>
      </Item>
      <Item style={[styles.formitem, styles.btnFormItem]}>
        <Button style={styles.btnSubmit} onPress={() => submit()}>
          <Text style={styles.btnSubmitText}>Submit</Text>
        </Button>
      </Item>
    </Form>
  );

  console.log('startDate', startDate);
  console.log('isStartDatePickerVisible', isStartDatePickerVisible);
  return (
    <Container>
      <Content contentContainerStyle={{flex: 1}}>
        <Card style={styles.card}>
          <Text style={{color: COLORS.lightGray, padding: 20}}>
            In progress ...
          </Text>
        </Card>
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
    marginLeft: 20,
    width: 160,
  },
  btnCalendar: {
    paddingHorizontal: 10,
  },
  btnFormItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnSubmit: {
    paddingHorizontal: 10,
    marginTop: 20,
    marginRight: 30,
  },
  btnSubmitText: {
    color: COLORS.white,
  },
});

export default AddTransactionsView;
