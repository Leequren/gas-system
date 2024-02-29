//принимает диаметр в метрах, а переводит в миллиметры
export function getCoefHydraulicResistance(diameter, roughtness) {
  const temp = (2 * roughtness) / (diameter * 1000);
  return 0.067 * Math.pow(temp, 0.2);
}
