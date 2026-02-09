const Country = ({ name, id, onClick }) => {
  return (
    <>
      {name} <Show name={name} value={id} onClick={onClick} /><br></br>
    </>
  );
};

const Show = ({ onClick, name, value }) => 
  <button name={name} value={value} onClick={onClick}>show</button>;

const LanguageList = ({ language }) => {
  return (
    <li>
      {language}
    </li>
  );
};

const Display = ({ countries, onClick, temp }) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    );
  } else if (countries.length === 1) {
    const country = {...countries[0]};
    const languages = Object.entries(country.languages);
    return (
      <div>
        <h1>
          {country.name.common}
        </h1>
        <p>
          {`Capital ${country.capital[0]}`} <br></br>
          {`Area ${country.area}`}
        </p>
        <h2>
          Languages
        </h2>
        <ul>
          {languages.map(language => <LanguageList key={language[0]} language={language[1]} />)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h2>
          Weather in {country.capital[0]}
        </h2>
        <p>
          Temperature {temp}
        </p>

      </div>
    );
  } else {
    return (
      countries.map(country => 
        <Country key={country.cca2} id={country.cca2} 
        name={country.name.common} onClick={onClick} />)
    );
  }
}

export default Display;