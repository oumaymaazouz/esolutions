import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {FlatList} from 'react-native';
import {Container, Content, Text, Footer, FooterTab, Button} from 'native-base';

import {groupByPropertyOfProperty} from '../../common/helper';
import {COLORS} from '../../common/colors';
import {commonStyles} from '../../common/styles';
import LaborTransItem from './LaborTransItem';

const withStore = connect(state => ({
  monthlyLaborTransactions: state.LaborApproval.monthlyLaborTransactions,
}));
const LaborTransList = props => {
  const [selectedTrans, setSelectedTrans] = useState([]);

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
        weekendHighlitCardStyle={weekendHighlitCardStyle}
        firstname={props.route.params.firstname}
        lastname={props.route.params.lastname}
        setSelectedTrans={labtransid => {
          selectedTrans.push(labtransid);
          setSelectedTrans(selectedTrans);
        }}
        removeTrans={labtransid => {
          const updatedTrans = selectedTrans.filter(i => i !== labtransid);
          setSelectedTrans(updatedTrans);
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
