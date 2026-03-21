import patientsData from '../../data/patients';
import { Patient, NewPatient } from '../types';

import { v1 as uuid } from 'uuid';


const getEntries = (): Omit<Patient, 'ssn'>[] => {
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

export default {
  getEntries,
  addPatient
};