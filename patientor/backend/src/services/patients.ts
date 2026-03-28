import patientsData from '../../data/patients';
import { Patient, NewPatient, NonSensitivePatient, EntryWithoutId, Entry } from '../types';

import { v1 as uuid } from 'uuid';


const getEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patientsData.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient => {
  return patientsData.filter(patient => patient.id === id)[0];
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patientsData.map(patient => {
    if (patient.id === id) {
      patient.entries.push(newEntry);
      return patient;
    }
    return patient;
  });

  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getPatient,
  addEntry
};