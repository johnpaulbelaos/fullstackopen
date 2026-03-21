export const calculateBmi = (height: number, weight: number): string => {
  const heightMeterSquared = (height / 100) ** 2;
  const bmi = weight / heightMeterSquared;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 24.9) {
    return 'Normal range';
  } else if (bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);

  console.log(calculateBmi(height, weight));
}
