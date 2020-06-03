import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Text, StyleSheet } from "react-native";
import { Container, Content, Card, CardItem, Body, Badge } from "native-base";

import { getStore } from "../../store";

import { $fetchTicketDetails } from "./state";
import Loader from "../Shared/Loader";

const withStore = connect((state) => ({
  item: state.Ticket.ticketDetails,
}));
const DeatilsView = (props) => {
  useEffect(() => {
    const { dispatch } = getStore();
    const { navigation, route } = props;
    return navigation.addListener("focus", () => {
      dispatch($fetchTicketDetails(route.params.itemEndpoint));
    });
  }, [props]);
  const { item } = props;
  const dataReady = !!item;
  const getDetails = () => (
    <Card>
      <CardItem header bordered>
        <Text style={styles.ticket_header_description}>
          {item["spi:description"] ? item["spi:description"] : "--"}
        </Text>
        {/* <Text>Identifier:</Text>
        <Text>{item["spi:ticketid"] ? item["spi:ticketid"] : "--"}</Text> */}
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text
            style={styles.ticket_body_item}
          >{`${item["spi:ticketid"]} -- ${item["spi:status"]}`}</Text>
          <Text
            style={styles.ticket_body_item}
          >{`Created by ${item["spi:reportedby"]} on ${item["spi:reportdate"]}`}</Text>
          <Text style={styles.ticket_body_item}>{`Asset: ${
            item["spi:assetorgid"] ? item["spi:assetorgid"] : "--"
          }`}</Text>
          <Text style={styles.ticket_body_item}>{`Asset number: ${
            item["spi:assetnum"] ? item["spi:assetnum"] : "--"
          }`}</Text>
          <Text style={styles.ticket_body_item}>{`Location: ${
            item["spi:location"] ? item["spi:location"] : "--"
          }`}</Text>

          <Text
            style={styles.ticket_body_item}
          >{`Reported priority description: ${
            item["spi:reportedpriority_description"]
              ? item["spi:reportedpriority_description"]
              : "--"
          }`}</Text>
        </Body>
      </CardItem>

      <CardItem footer bordered>
        <Badge style={styles.ticket_footer_badge}>
          <Text style={styles.ticket_footer_text}>
            {item["spi:status_description"]
              ? item["spi:status_description"]
              : ""}
          </Text>
        </Badge>
      </CardItem>
    </Card>
  );
  return (
    <Container>
      <Content contentContainerStyle={{ flex: 1 }}>
        {!dataReady ? <Loader /> : getDetails()}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  ticket_header_description: {
    color: "#717171",
    fontSize: 16,
    fontWeight: "bold",
  },
  ticket_body_item: {
    color: "#717171",
    fontSize: 14,
    marginTop: 6,
  },
  ticket_footer_badge: {
    backgroundColor: "red",
    justifyContent: "center",
  },
  ticket_footer_text: {
    color: "white",
    fontSize: 12,
  },
});

export default withStore(DeatilsView);
