import { UniversalGasConst } from "../config/config.js";

export function getGasConst(molarWeight) {
  return UniversalGasConst / molarWeight;
}
