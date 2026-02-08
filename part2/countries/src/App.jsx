import { useState, useEffect } from 'react';
import axios from 'axios';
import CountrySearch from './components/CountrySearch';
import Display from './components/Display';
import countryServices from './services/country';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => setCountries(initialCountries));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const showCountry = (event) => {
    setFilter(event.target.name);
  };
  
  const filteredCountries = filter ? countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries;
  
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
        <Display countries={filteredCountries} onClick={showCountry} />
      </div>
    );
  }
};

export default App;
