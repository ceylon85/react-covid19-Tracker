import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //KOREA, United State..
            value: country.countryInfo.iso3, //KOR, USA,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  console.log("COUNTRY INFO ====>", countryInfo);
  //QUICK FIX with little if else

  // await fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCountry(countryCode);
  //       setCountryInfo(data);
  //       if(countryCode !== "worldwide"){
  //         setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
  //         console.log(mapCenter);
  //         setMapZoom(4);
  //       }
  //       else{
  //         console.log(mapCenter);
  //         setMapCenter({lat: 34.80746, lng: -40.4796});
  //         setMapZoom(3);
  //       }
  //     });

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          <h1> Covid19 Tracker</h1>

          {/* Select input dropdown field */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* InfoBoxes title="Corona cases"*/}
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          {/* InfoBoxes title="Recovered"*/}
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          {/* InfoBoxes title="Deaths"*/}
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Country Table */}
        {/* Graph */}

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>

          {/* Graph */}
          <h3>Worldwide New cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
