export function getCoefCompressibility(
  temperature,
  pressure,
  concentrationCH4
) {
  return (
    -1 * 0.226 +
    9.093 * Math.pow(temperature, -0.33) -
    4.837 * Math.pow(10, -7) * pressure +
    1.988 * Math.pow(10, -7) * Math.pow(temperature, 0.15) * pressure -
    766300 * Math.pow(temperature, -2.7) * Math.pow(concentrationCH4, -1.67)
  );
}
