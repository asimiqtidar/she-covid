import React, { useEffect, useState } from "react";
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from 'axios';


const App = () => {

  const [mainData, setMainData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState(null);

  useEffect ( ()=>{

    axios.get('https://covid19.mathdro.id/api')
    .then (res => {
      console.log(res);
      setMainData(res);

      axios.get(res.data.countries)
      .then (res2 => {
        console.log(res2);
        setCountries(res2.data.countries);
      });

    });

  }, []);

  useEffect ( ()=>{

    if (selectedCountry !== '') {
      
      axios.get(mainData.data.countries + '/' + selectedCountry)
      .then (res3 => setCountryData(res3));
      
    }
    
  }, [selectedCountry]);

  useEffect ( ()=> {

  }, []);
  
  const viewCountry = countryData ? 
    <div>
      <h4>{selectedCountry}</h4>
      <div>Confirmed: {countryData.data.confirmed.value}</div>
      <div>Deaths: {countryData.data.deaths.value}</div>
      <div>Recovered: {countryData.data.recovered.value}</div>
    </div>
    :
    <div>Loading Country Data, Please Wait ...</div>
  ;

  const view = mainData ? 
    <div>
      <h4>Overall Data</h4>
      <div>Confirmed: {mainData.data.confirmed.value}</div>
      <div>Deaths: {mainData.data.deaths.value}</div>
      <div>Recovered: {mainData.data.recovered.value}</div>

      <h4>Countries: 
        <select onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="0">Select Country</option>
          {
            countries.map ( (item,ind) => <option value={item.name}>{item.name}</option>)
          }
        </select>
      </h4>
      {viewCountry}
      
    </div>
    :
    <div>Loading Data, Please Wait ...</div>
  ;

  return (
    <div>
      <Header />
      <div className="app-body">
        
          {view}

      </div>
      <Footer />
    </div>
  );
};

export default App;
