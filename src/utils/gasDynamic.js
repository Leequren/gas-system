import { getGasConst } from "./GasConst.js";
import { getCoefCompressibility } from "./coefCompressibility.js";
import { getCoefHydraulicResistance } from "./coefHydraulicResistance.js";
import { transposeMatrix } from "./transposeMatrix.js";

export function vectorMultuple(matrixValue, pressureValue) {
  const ans = Math.pow(pressureValue, 2) * matrixValue;
  return ans;
}

export function getPressureDifference(matrix, pressures, indexPipe) {
  const transposedMatrix = transposeMatrix(matrix);
  let answer = 0;
  // console.log(transposedMatrix);
  // console.log(pressures);
  for (let i = 0; i < pressures.length; ++i) {
    answer += vectorMultuple(transposedMatrix[indexPipe][i], pressures[i]);
  }
  return answer;
}

export function getGasDynamic(matrix, pressures, config) {
  const gasConst = getGasConst(config.molarWeight);
  const coefHydraulicResistance = getCoefHydraulicResistance(
    config.diameter,
    config.roughtness
  );
  const coefCompressibility = getCoefCompressibility(
    config.temperature,
    pressures[config.indexPipe],
    config.concentrationCH4
  );
  const pressureDifference = getPressureDifference(
    matrix,
    pressures,
    config.indexPipe
  );
  // console.log(pressureDifference, coefCompressibility, coefHydraulicResistance);
  const numerator = pressureDifference * Math.pow(config.diameter, 5);
  const denominator =
    coefHydraulicResistance *
    coefCompressibility *
    gasConst *
    config.temperature *
    config.length;
  // console.log(numerator, denominator);
  return (Math.PI / 4) * Math.sqrt(numerator / denominator);
}
