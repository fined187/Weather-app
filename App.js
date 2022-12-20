import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import {Fontisto} from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "c0dc9035ac6b6f3350dea3d41034a40b";
const icons = {
  "Clouds": "cloudy",
  "Clear": "day-sunny",
  "Snow": "snow",
  "Rain": "rains",
  "Drizzle": "rain",
  "Thunderstorm": "lightning"
}

export default function App() {


  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
      // To Do List
      return (
        <View>
        </View>
      )
    } else {
      const { 
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync(
        {latitude, longitude}, 
        {useGoogleMaps: false}
      );
      setCity(location[0].city);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
      )
      const json = await response.json();
      setDays(json.daily);
      };
    }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {
          days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
          ) : (
            days.map((day, index) => (
              <View key={index} style={styles.day}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                  <Text style={styles.temp}>
                    {parseFloat(day.temp.day).toFixed(1)}
                  </Text>
                  <Fontisto name={icons[day.weather[0].main]} size={70} color="white" />
                </View>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>
            ))
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
    color: "white"
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 100,
    color: "white"
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500"
  },
  tinyText: {
    fontSize: 20,
    marginTop: -5,
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
});