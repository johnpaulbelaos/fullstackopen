import { useState, useEffect } from 'react';

import type { DiaryEntry, Weather, Visibility } from "./types";
import { getAllEntry, createEntry } from './diaryService';

const App = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [visibility, setVisibility] = useState('great');
  const [comment, setComment] = useState('');
  const [entry, setEntry] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntry().then(data => {
      setEntry(data)
    })
  }, [])

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry({ date: date, weather: weather, visibility: visibility, comment:comment }).then(data => {
      setEntry(entry.concat(data))
    })
    setDate('')
    setComment('')
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          <label>
            date
            <input
              type='date'
              value={date}
              onChange={(event) => setDate(event.target.value)} 
            />
          </label>
        </div>
        <div>
          <label>
            weather
            <input
              type='radio'
              value='sunny'
              name='weather'
              id='sunny'
              onChange={(event) => setWeather(event.target.value)} 
            />
            <label htmlFor='sunny'>sunny</label>

            <input
              type='radio'
              value='rainy'
              name='weather'
              id='rainy'
              onChange={(event) => setWeather(event.target.value)} 
            />
            <label htmlFor='rainy'>rainy</label>

            <input
              type='radio'
              value='cloudy'
              name='weather'
              id='cloudy'
              onChange={(event) => setWeather(event.target.value)} 
            />
            <label htmlFor='cloudy'>cloudy</label>

            <input
              type='radio'
              value='stormy'
              name='weather'
              id='stormy'
              onChange={(event) => setWeather(event.target.value)} 
            />
            <label htmlFor='stormy'>stormy</label>

            <input
              type='radio'
              value='windy'
              name='weather'
              id='windy'
              onChange={(event) => setWeather(event.target.value)} 
            />
            <label htmlFor='windy'>windy</label>
          </label>
        </div>
        <div>
          <label>
            visibility
            <input
              type='radio'
              value='great'
              name='visibility'
              id='great'
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor='great'>great</label>

            <input
              type='radio'
              value='good'
              name='visibility'
              id='good'
              onChange={(event) => setVisibility(event.target.value)} 
            />
            <label htmlFor='good'>good</label>

            <input
              type='radio'
              value='ok'
              name='visibility'
              id='ok'
              onChange={(event) => setVisibility(event.target.value)} 
            />
            <label htmlFor='ok'>ok</label>

            <input
              type='radio'
              value='poor'
              name='visibility'
              id='poor'
              onChange={(event) => setVisibility(event.target.value)} 
            />
            <label htmlFor='poor'>poor</label>
          </label>
        </div>
        <div>
          <label>
            comment
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)} 
            />
          </label>
        </div>
        <button type='submit'>add</button>
      </form>

      <h2>Diary entries</h2>

      {entry.map(entry =>
        <div  key={entry.id}>
          <h3>{entry.date}</h3>
          <p>
            weather: {entry.weather}<br/>
            visibility: {entry.visibility}<br/>
          </p>
        </div>
      )}
    </div>
  )
}
export default App