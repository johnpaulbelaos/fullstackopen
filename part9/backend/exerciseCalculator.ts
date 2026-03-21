interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateRating = (average: number, target: number): number => {
  if (average >= target) {
    return 3;
  } else if (average > (target / 2)) {
    return 2;
  } else {
    return 1;
  }
};

const ratingDescriptor = (rating: number): string => {
  switch(rating) {
    case 3:
      return 'well done!';
    case 2:
      return 'not too bad but could be better';
    case 1:
      return 'try again';
    default:
      throw new Error('Something went wrong');
  }
};

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour).length;
  const average = hours.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / hours.length;
  const success = average >= target;
  const rating = calculateRating(average, target);
  const ratingDescription = ratingDescriptor(rating);

  return {
  periodLength,
  trainingDays,
  success,
  rating,
  ratingDescription,
  target,
  average
  };
};

if (require.main === module) {
  const target: number = Number(process.argv[2]);
  const hours: number[] = process.argv.slice(3, process.argv.length).map(Number);

  console.log(calculateExercises(hours, target));
}
