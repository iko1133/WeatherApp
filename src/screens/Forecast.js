import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { getNextFiveDays } from "../api/weather";
import WeatherForecastListItem from "../components/WeatherForecastListItem";

const Container = styled.View`
  align-items: center;
  flex: 1;
  padding: 0 16px;
  width: 100%;
`;

const LocationInput = styled.TextInput`
  border: 1px solid black;
  border-radius: 8px;
  height: 36px;
  margin-top: 16px;
  padding-left: 8px;
  width: 100%;
`;

const EmptyListText = styled.Text`
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
`;

const WeatherFlatlist = styled.FlatList`
  width: 100%;
`;

const forecast = (props) => {
  const [loading, setLoading] = useState(false);
  const [currLocationName, setCurrLocationName] = useState("");
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [bounceTimerId, setBounceTimerId] = useState();

  const debounceSearch = (locationName) => {
    if (bounceTimerId) clearTimeout(bounceTimerId);

    const currTimer = setTimeout(() => {
      getWeather(locationName);
    }, 50);

    setBounceTimerId(currTimer);
  };

  const getWeather = async (locationName) => {
    setLoading(true);
    const result = await getNextFiveDays(locationName);

    if (result.ok && result.data && result.data.list) {
      const weatherByDay = result.data.list.filter(
        (item, index) => index % 8 === 0
      );
      setWeatherForecast(weatherByDay);
    } else {
      setWeatherForecast([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currLocationName) debounceSearch(currLocationName);
    else setWeatherForecast([]);
  }, [currLocationName]);

  return (
    <Container>
      <LocationInput
        placeholder="Enter location"
        onChangeText={(text) => setCurrLocationName(text)}
      />

      {loading ? (
        <EmptyListText>Loading...</EmptyListText>
      ) : (
        <>
          {weatherForecast.length === 0 && (
            <EmptyListText>
              There were no results on "{currLocationName}"
            </EmptyListText>
          )}
          {weatherForecast && weatherForecast.length > 0 && (
            <WeatherFlatlist
              data={weatherForecast}
              keyExtractor={(item, index) => `weather_card_${index}`}
              renderItem={({ item, index }) => (
                <WeatherForecastListItem weather={item} />
              )}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default forecast;
