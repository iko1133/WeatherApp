import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  background-color: #ededed;
  border-radius: 8px;
  flex-direction: row;
  margin: 8px 0;
`;

const IconImage = styled.Image`
  height: 80px;
  width: 80px;
`;

const InfoContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 8px;
`;

const WeatherDescription = styled.Text`
  font-size: 18px;
`;

const TemperatureText = styled.Text`
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  margin-right: 8px;
`;

const WeatherForecastListItem = ({ weather }) => {
  const dt = new Date(weather.dt * 1000);

  return (
    <Container>
      <IconImage
        source={{
          uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
        }}
      />

      <InfoContainer>
        <WeatherDescription>
          {weather.weather[0].description}
        </WeatherDescription>

        <WeatherDescription>
          {`${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`}
        </WeatherDescription>
      </InfoContainer>
      <TemperatureText>{weather.main.temp.toFixed(0)} °C</TemperatureText>
    </Container>
  );
};

export default WeatherForecastListItem;
