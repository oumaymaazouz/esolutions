import React from "react";
import { View } from "react-native";
import { Spinner } from "native-base";

const Loader = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <Spinner color="#5f7d77" />
  </View>
);

export default Loader;
