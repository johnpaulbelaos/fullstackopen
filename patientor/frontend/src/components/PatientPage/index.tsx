import { SyntheticEvent, useState } from "react";

import { Diagnosis, EntryWithoutId, Patient } from "../../types";
import EntryView from "./EntryView";

import patientService from "../../services/patients";


interface Props {
  patient : Patient | null;
  diagnoses: Diagnosis[];
}

interface EntryFormProps {
  id: string;
}

const EntryForm = ({ id }: EntryFormProps) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [codes, setCodes] = useState<string[]>([]);
  const [type, setType] = useState<string>('HealthCheck');
  const [rating, setRating] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');
  const [employer, setEmployer] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const formStyle = {
    paddingTop: 1,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'dotted',
    borderWidth: 2,
    marginBottom: 5
  };

  const addCode = () => {
    setCodes(codes.concat(code));
    setCode('');
  };

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (type === 'HealthCheck') {
      const healthCheckRating = +rating;
      if (healthCheckRating <= 3 && healthCheckRating >= 0) {
        const entry: EntryWithoutId = {
          description,
          date,
          specialist,
          diagnosisCodes: codes,
          type,
          healthCheckRating
        };

        const result = await patientService.addEntry(id, entry);
        console.log(result);
      } else {
        throw new Error('incorrect health check rating input');
      }

    } else if (type === 'Hospital') {
      const entry: EntryWithoutId = {
        description,
        date,
        specialist,
        diagnosisCodes: codes,
        type,
        discharge: {
          date: dischargeDate,
          criteria
        }
      };
      
      const result = await patientService.addEntry(id, entry);
      console.log(result);
    } else if (type === 'OccupationalHealthcare') {
      const entry: EntryWithoutId = {
        description,
        date,
        specialist,
        diagnosisCodes: codes,
        type,
        employerName: employer,
        sickLeave: {
          startDate,
          endDate
        }
      };

      const result = await patientService.addEntry(id, entry);
      console.log(result);
    }
    setCode('');
    setCodes([]);
    setCriteria('');
    setDate('');
    setDescription('');
    setDischargeDate('');
    setEmployer('');
    setEndDate('');
    setRating('');
    setSpecialist('');
    setStartDate('');
  };

  return (
    <div style={formStyle}>
      <button onClick={() => setType('HealthCheck')} type="button">
        health check entry
      </button>
      <button onClick={() => setType('Hospital')} type="button">
        hospital entry
      </button>
      <button onClick={() => setType('OccupationalHealthcare')} type="button">
        occupational healthcare entry
      </button>
      <h3>New {type} Entry</h3>
      <form onSubmit={submit}>
        <div>
          description
          <input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          date
          <input
            type='date'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          specialist
          <input
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </div>
        <div>
          diagnosis codes
          <input
            value={code}
            onChange={({ target }) => setCode(target.value)}
          />
          <button onClick={addCode} type="button">
            add code
          </button>
          <div>codes: {codes.join(', ')}</div>
        </div>
        <br /><div style={{ display: type === 'HealthCheck' ? '' : 'none' }}>
          rating
          <input
            value={rating}
            onChange={({ target }) => setRating(target.value)}
          />
        </div>
        <div style={{ display: type === 'Hospital' ? '' : 'none' }}>
          discharge
          <div>
            date
            <input
              type='date'
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
          </div>
          <div>
            criteria
            <input
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </div>
        </div>
        <div style={{ display: type === 'OccupationalHealthcare' ? '' : 'none' }}>
          <div>
          employer name
            <input
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            />
          </div>
          <br/>sick leave
          <div>
            start date
            <input
              type='date'
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
          </div>
          <div>
            end date
            <input
              type='date'
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </div>
        </div>
        <br/><button type="submit">add</button>
      </form>
    </div>
  );
};

const PatientPage = ({ patient, diagnoses }: Props) => {
  if (!patient) {
    return null;
  }
  
  return (
    <div>
      <h2>{patient.name} - {patient.gender}</h2>
      <p>
        ssh: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      <EntryForm id={patient.id} />
      <EntryView entries={patient.entries} diagnoses={diagnoses} />
    </div>
  );
};


export default PatientPage;