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

  const approveTrans = () => {
    const {dispatch} = getStore();
    Alert.alert(
      'Approve',
      'Do you really want to approve selected transactions ?',
      [
        {
          text: 'Approval',
          onPress: async () => {
            for (let i = 0; i < selectedTransToApprove.length; i++) {
              let id = selectedTransToApprove[i];
              await dispatch(
                $handleTransactionApproval(route.params.month, id, 1),
              )
                .then(() => console.log('SUCCESS', id))
                .catch(() => console.log('FAILURE', id));
            }
            setSelectedTransToApprove([]);
            return;
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
      'Disapprove',
      'Do you really want to disapprove selected transactions ?',
      [
        {
          text: 'Disapproval',
          onPress: async () => {
            for (let i = 0; i < selectedTransToDisapprove.length; i++) {
              let id = selectedTransToDisapprove[i];
              await dispatch(
                $handleTransactionApproval(route.params.month, id, 0),
              )
                .then(() => console.log('SUCCESS', id))
                .catch(() => console.log('FAILURE', id));
            }
            setSelectedTransToDisapprove([]);
            return;
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

  const currentTransByProjectName =
    currentTrans &&
    groupByPropertyOfProperty(currentTrans, 'workordernt', 'description');

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
        selectedTransToApprove={selectedTransToApprove}
        selectedTransToDisapprove={selectedTransToDisapprove}
      />
    );
  };

  const tabs =
    currentTransByProjectName &&
    Object.entries(currentTransByProjectName).map(item => ({
      projName: item[0],
      data: item[1],
      dataLength: item[1].length,
    }));

  const [selectedTab, setSelectedTab] = useState(tabs && tabs[0].projName);
  const filtredData =
    currentTrans &&
    currentTrans.filter(item => item.workordernt.description === selectedTab);
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
                  active={tabs && selectedTab === item.projName.slice(0, 10)}
                  onPress={() => setSelectedTab(item.projName)}>
                  <Text>{`${item.projName.substring(
                    item.projName.lastIndexOf('(') + 1,
                    item.projName.lastIndexOf(')'),
                  )} (${item.dataLength})`}</Text>
                </Button>
              </FooterTab>
            ))}
        </Footer>
      )}
    </Container>
  );
};

export default withStore(LaborTransList);
