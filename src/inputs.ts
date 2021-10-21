import * as core from "@actions/core";
import { INPUTS } from "./constants";

type Inputs = typeof INPUTS;
type name = keyof Inputs;
type Result = {
  [key in name]: Inputs[name]["value"];
};

export const parseInputs = (): Result => {
  const inputs = (Object.keys(INPUTS) as name[]).reduce((accum, name) => {
    const { key, value } = INPUTS[name];
    const input = core.getInput(key) || value;

    core.info(`${name}: ${input}`);

    accum[name] = input;

    return accum;
  }, {} as Result);
  return inputs;
};
