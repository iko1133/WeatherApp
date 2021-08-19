import React from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import Forecast from "./src/screens/Forecast";

const SafeAreaView = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`;

export default function App() {
  return (
    <SafeAreaView>
      <Forecast />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
