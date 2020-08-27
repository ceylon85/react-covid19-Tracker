import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/Left_section/InfoBox";
import Table from "./components/Right_section/Table";
import { sortData } from "./components/Utils/util";
import LineGraph from "./components/Right_section/LineGraph";
import Map from "./components/Left_section/Map";
import "leaflet/dist/leaflet.css";

import "./App.css";

import Theme from "./components/Utils/Theme";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 37, lng: 127.5 });
  const [mapZoom, setMapZoom] = useState(6);

  //worldwide, 전세계의 정보를 가져온다
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //각 나라별 데이터를 가져온다
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //KOREA, United State..
            value: country.countryInfo.iso3, //KOR, USA,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //나라 변경시 각 나라별 데이터를 가져온다.
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
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
          <Theme />
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
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          {/* InfoBoxes title="Recovered"*/}
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          {/* InfoBoxes title="Deaths"*/}
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* Map */}
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3>Worldwide New {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
