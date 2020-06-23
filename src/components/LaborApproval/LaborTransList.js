import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {FlatList, Alert} from 'react-native';
import {
  Container,
  Content,
  Text,
  Footer,
  FooterTab,
  Button,
  Segment,
  Toast,
} from 'native-base';

import {groupByPropertyOfProperty} from '../../common/helper';
import {COLORS} from '../../common/colors';
import {commonStyles} from '../../common/styles';
import LaborTransItem from './LaborTransItem';
import {getStore} from '../../store';

import {$handleTransactionApproval} from './state';

const withStore = connect(state => ({
  monthlyLaborTransactions: state.LaborApproval.monthlyLaborTransactions,
}));
const LaborTransList = props => {
  const [selectedTransToApprove, setSelectedTransToApprove] = useState([]);
  const [selectedTransToDisapprove, setSelectedTransToDisapprove] = useState(
    [],
  );

  console.log('selectedTransToApprove', selectedTransToApprove);
  console.log('selectedTransToDisapprove', selectedTransToDisapprove);

  const approveTrans = () => {
    const {dispatch} = getStore();
    Alert.alert(
      'Delete',
      'Do you really want to approve selected transactions ?',
      [
        {
          text: 'Approval',
          onPress: () => {
            Promise.all(
              selectedTransToApprove.map(async id => {
                await dispatch(
                  $handleTransactionApproval(route.params.month, id, 1),
                );
              }),
            )
              .then(() => {
                setSelectedTransToApprove([]);
                Toast.show({
                  text: 'Successful approval.',
                  type: 'success',
                  duration: 6000,
                });
              })
              .catch(() =>
                Toast.show({
                  text: 'Approval failed.',
                  type: 'danger',
                  duration: 6000,
                }),
              );
          },
        },
        {
          text: 'Cancel',
        },
      ],
    );
  };

  const disApproveTrans = () => {
    const {dispatch} = getStore();
    Alert.alert(
      'Delete',
      'Do you really want to disapprove selected transactions ?',
      [
        {
          text: 'Disapproval',
          onPress: () => {
            Promise.all(
              selectedTransToDisapprove.map(async id => {
                await dispatch(
                  $handleTransactionApproval(route.params.month, id, 0),
                );
              }),
            )
              .then(() => {
                selectedTransToDisapprove([]);
                Toast.show({
                  text: 'Successful disapproval.',
                  type: 'success',
                  duration: 6000,
                });
              })
              .catch(() =>
                Toast.show({
                  text: 'Disapproval failed.',
                  type: 'danger',
                  duration: 6000,
                }),
              );
          },
        },
        {
          text: 'Cancel',
        },
      ],
    );
  };

  const {monthlyLaborTransactions, route} = props;
  const currentTrans =
    monthlyLaborTransactions && monthlyLaborTransactions[route.params.month];
  const currentTransByProject =
    currentTrans &&
    groupByPropertyOfProperty(currentTrans, 'workordernt', 'wonum');

  const getListItem = item => {
    const day = item['spi:startdateentered']
      ? new Date(item['spi:startdateentered']).getDay()
      : null;
    const weekendHighlitCardStyle =
      day === 5 || day === 6 ? {backgroundColor: COLORS.lightBrand} : {};
    return (
      <LaborTransItem
        item={item}
        selectedItem={
          selectedTransToApprove.includes(item['spi:labtransid']) ||
          selectedTransToDisapprove.includes(item['spi:labtransid'])
        }
        weekendHighlitCardStyle={weekendHighlitCardStyle}
        firstname={props.route.params.firstname}
        lastname={props.route.params.lastname}
        setSelectedTrans={(labtransid, genapprservreceipt) => {
          if (!genapprservreceipt) {
            // set items to approve
            setSelectedTransToApprove([...selectedTransToApprove, labtransid]);
          } else {
            // set items to disapprove
            setSelectedTransToDisapprove([
              ...selectedTransToDisapprove,
              labtransid,
            ]);
          }
        }}
        removeTrans={(labtransid, genapprservreceipt) => {
          if (!genapprservreceipt) {
            // remove items to approve
            setSelectedTransToApprove(
              selectedTransToApprove.filter(id => id !== labtransid),
            );
          } else {
            // remove items to disapprove
            setSelectedTransToDisapprove(
              selectedTransToDisapprove.filter(id => id !== labtransid),
            );
          }
        }}
      />
    );
  };

  const tabs =
    currentTransByProject &&
    Object.entries(currentTransByProject).map(item => ({
      projId: item[0],
      data: item[1],
      dataLength: item[1].length,
    }));

  const [selectedTab, setSelectedTab] = useState(tabs && tabs[0].projId);
  const filtredData =
    currentTrans &&
    currentTrans.filter(item => item.workordernt.wonum === selectedTab);
  return (
    <Container>
      <Segment>
        <Button
          first
          disabled={selectedTransToApprove.length === 0}
          onPress={() => approveTrans()}>
          <Text>{`Approve  (${selectedTransToApprove.length})`}</Text>
        </Button>
        <Button
          last
          disabled={selectedTransToDisapprove.length === 0}
          onPress={() => disApproveTrans()}>
          <Text>{`Disapprove  (${selectedTransToDisapprove.length})`}</Text>
        </Button>
      </Segment>
      <Content contentContainerStyle={commonStyles.contentContainerStyle}>
        <FlatList
          data={filtredData}
          renderItem={({item}) => getListItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Content>
      {tabs && (
        <Footer>
          {tabs &&
            tabs.map((item, index) => (
              <FooterTab key={index}>
                <Button
                  active={tabs && selectedTab === item.projId}
                  onPress={() => setSelectedTab(item.projId)}>
                  <Text>{`${item.projId} (${item.dataLength})`}</Text>
                </Button>
              </FooterTab>
            ))}
        </Footer>
      )}
    </Container>
  );
};

export default withStore(LaborTransList);
