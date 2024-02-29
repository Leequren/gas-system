import { getGasConst } from "./utils/GasConst.js";
import { getCoefCompressibility } from "./utils/coefCompressibility.js";
import { getCoefHydraulicResistance } from "./utils/coefHydraulicResistance.js";
import { getGasDynamic } from "./utils/gasDynamic.js";
import { transposeMatrix } from "./utils/transposeMatrix.js";
const testMatrix = [
  [1, 0, 0, 0, 0],
  [0, -1, 0, 0, 0],
  [0, 0, 0, -1, 0],
  [0, 0, 0, 0, -1],
  [-1, 1, 1, 0, 0],
  [0, 0, -1, 1, 1],
];
const pressures = [7000000, 5600000, 4000000, 3500000, 5980000, 5945000];
const configs = [
  {
    indexPipe: 0,
    temperature: 283,
    concentrationCH4: 0.93,
    molarWeight: 16.2,
    diameter: 1,
    roughtness: 0.01,
    length: 40000,
  },
  {
    indexPipe: 1,
    temperature: 283,
    concentrationCH4: 0.93,
    molarWeight: 16.2,
    diameter: 1,
    roughtness: 0.01,
    length: 20000,
  },
  {
    indexPipe: 2,
    temperature: 283,
    concentrationCH4: 0.93,
    molarWeight: 16.2,
    diameter: 1,
    roughtness: 0.01,
    length: 30000,
  },
  {
    indexPipe: 3,
    temperature: 283,
    concentrationCH4: 0.93,
    molarWeight: 16.2,
    diameter: 1,
    roughtness: 0.01,
    length: 15000,
  },
  {
    indexPipe: 4,
    temperature: 283,
    concentrationCH4: 0.93,
    molarWeight: 16.2,
    diameter: 1,
    roughtness: 0.01,
    length: 15000,
  },
];
// const config = {
//   indexPipe: 4,
//   temperature: 283,
//   concentrationCH4: 0.93,
//   molarWeight: 16.2,
//   diameter: 1,
//   roughtness: 0.01,
//   length: 15000,
// };
// console.log(getCoefHydraulicResistance(1000, 0.01));
// console.log(getCoefCompressibility(283, 7000000, 0.93));
// console.log(getGasConst(16.2));
function getAllQs(testMatrix, pressures, configs) {
  const Qs = [];
  for (let i = 0; i < configs.length; i++) {
    Qs.push(getGasDynamic(testMatrix, pressures, configs[i]));
  }
  return Qs;
}

function check(Qs, eps) {
  if (
    isNaN(Qs[0]) ||
    isNaN(Qs[1]) ||
    isNaN(Qs[2]) ||
    isNaN(Qs[3]) ||
    isNaN(Qs[4])
  ) {
    return false;
  }
  // console.log(Qs, eps);
  if (
    Math.abs(Qs[0] - Qs[1] - Qs[2]) <= eps &&
    Math.abs(Qs[2] - Qs[3] - Qs[4]) <= eps
  ) {
    return true;
  }

  return false;
}
// const Qs = getAllQs(testMatrix, pressures, configs);
// console.log(Qs);
// if (check(Qs, 0.005)) {
//   console.log(true);
// }
for (let i = 0; i < 10000000; i += 5000) {
  for (let j = 0; j < 10000000; j += 5000) {
    pressures[4] = i;
    pressures[5] = j;
    const Qs = getAllQs(testMatrix, pressures, configs);
    if (check(Qs, 50)) {
      console.log(Qs);
      console.log(i, j);
    }
  }
}
