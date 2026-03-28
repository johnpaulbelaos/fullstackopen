import { Entry, Diagnosis, HealthCheckRating, SickLeave } from "../../types";

interface Props {
  entries : Entry[];
  diagnoses: Diagnosis[];
}

interface EntryProps {
  entry: Entry;
}

interface HealthCheckProps {
  healthCheckRating: HealthCheckRating;
}

interface HospitalProps {
  date: string;
  criteria: string;
}

interface OccupationalHealthcareProps {
  employerName: string;
  sickLeave: SickLeave | undefined;
}

const HealthCheckEntry = ({ healthCheckRating}: HealthCheckProps ) => {
  switch (healthCheckRating) {
    case 0:
      return <p><strong>Healthy</strong></p>;
    case 1:
      return <p><strong>Low Risk</strong></p>;
    case 2:
      return <p><strong>High Risk</strong></p>;
    case 3:
      return <p><strong>Critical Risk</strong></p>;
    default:
      throw new Error('error fetching health rating');
  }
};

const HospitalEntry = ({ date, criteria}: HospitalProps) => {
  return <p>Date of discharge:{date} <br/> Note:{criteria}</p>;
};

const OccupationalHealthcareEntry = ({ employerName, sickLeave }: OccupationalHealthcareProps) => {
  if (!sickLeave) {
    return <p>Employer: <em>{employerName}</em></p>;
  }
  return <p>Employer: {employerName} Sick Leave: {sickLeave.startDate} to {sickLeave.endDate}</p>;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry healthCheckRating={entry.healthCheckRating} />;
    case 'Hospital':
      return <HospitalEntry {...entry.discharge} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry employerName={entry.employerName} sickLeave={entry.sickLeave} />;
    default:
      return assertNever(entry);
  }
};

const entryStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
};

const EntryView = ({ entries, diagnoses }: Props) => {  
  return (
    <div>
      <h3>entries</h3>
      {entries.map(entry => 
        <div key={entry.id} style={entryStyle}>
          {entry.date}: <em>{entry.description}</em> 
          <ul>
            {entry.diagnosisCodes?.map(diagnosis => {
              const diagnosisDescription: string | undefined = diagnoses.find(d => d.code === diagnosis)?.name;
              return <li key={diagnosis}>{diagnosis} {diagnosisDescription}</li>;
            })}
          </ul>
          <EntryDetails entry={entry} />
          <p>diagnosed by {entry.specialist} <br/></p>
        </div>
      )}
    </div>
  );
};


export default EntryView;