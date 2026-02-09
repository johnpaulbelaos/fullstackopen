import { useState, useEffect } from 'react';
import CountrySearch from './components/CountrySearch';
import Display from './components/Display';
import countryServices from './services/country';
import weatherServices from './services/weather';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const filteredCountries = filter ? countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries;
  
  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => setCountries(initialCountries));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (filteredCountries.length !== 1) {
      setCountry(event.target.value);
    }
  };

  const showCountry = (event) => {
    setFilter(event.target.name);
    setCountry(event.target.name);
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const { latlng } = filteredCountries[0].capitalInfo;
      const lat = latlng[0];
      const lon = latlng[1];
      console.log(lat, lon);

      weatherServices
        .getWeather(lat, lon)
        .then(weather => {setWeather(weather);});   
    }
  }, [country]);

  let temp = null;
  if (weather) {
    temp = weather.main.temp;
  }
  
  if (filter === '') {
    return (
    <div>
      <CountrySearch value={filter} onChange={handleFilterChange} />
    </div>
  );
  } else {
    return (
        <div>
          <CountrySearch value={filter} onChange={handleFilterChange} />
          <Display countries={filteredCountries} onClick={showCountry} temp={temp} />
        </div>
      );
  }
};

export default App;
