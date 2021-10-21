import fs from "fs";
import * as core from "@actions/core";
import { exec } from "@actions/exec";

interface BuildApksCommandOptions {
  bundle: string;
  output: string;
  overwrite: string;
  aapt2: string;
  ks: string;
  ksPass: string;
  ksKeyAlias: string;
  connectedDevice: string;
  deviceId: string;
  deviceSpec: string;
  mode: string;
  localTesting: string;
}

const buildApksCommand = (options: BuildApksCommandOptions) => {
  const commandLine = `java -jar ${process.env.BUNDLETOOL_FILE_PATH} build-apks`;
  if (!options.bundle) {
    throw new Error("Option `bundle` is required");
  }
  if (!options.output) {
    throw new Error("Option `output` is required");
  }

  const args = [`--bundle=${options.bundle}`, `--output=${options.output}`];

  if (options.overwrite === "true") {
    args.push("--overwrite");
  }
  if (options.aapt2) {
    args.push(`--aapt2=${options.aapt2}`);
  }
  if (options.ks) {
    args.push(`--ks=${options.ks}`);
  }
  if (options.ksPass) {
    args.push(`--ks-pass=${options.ksPass}`);
  }
  if (options.ksKeyAlias) {
    args.push(`--ks-key-alias=${options.ksKeyAlias}`);
  }
  if (options.connectedDevice === "true") {
    args.push(`--connected-device`);
  }
  if (options.deviceId) {
    args.push(`--device-id=${options.deviceId}`);
  }
  if (options.deviceSpec) {
    args.push(`--device-spec=${options.deviceSpec}`);
  }
  if (options.mode) {
    args.push(`--mode=${options.mode}`);
  }
  if (options.localTesting === "true") {
    args.push(`--local-testing=${options.localTesting}`);
  }

  return { commandLine, args };
};

interface InstallApksCommandOptions {
  apks: string;
  deviceId: string;
}

const installApksCommand = (options: InstallApksCommandOptions) => {
  const commandLine = `java -jar ${process.env.BUNDLETOOL_FILE_PATH} install-apks`;
  if (!options.apks) {
    throw new Error("Option `apks` is required");
  }

  const args = [`--apks=${options.apks}`];

  if (options.deviceId) {
    args.push(`--device-id=${options.deviceId}`);
  }

  return { commandLine, args };
};

type Options = BuildApksCommandOptions & InstallApksCommandOptions;

export const runCommand = async (
  command: string,
  options: Options
): Promise<void> => {
  if (command === "build-apks") {
    const { commandLine, args } = buildApksCommand(options);
    await exec(commandLine, args);

    // check .apks file exists
    if (fs.existsSync(options.output)) {
      core.info(`${options.output} exists`);
    } else {
      throw new Error(`Missing file at path: ${options.output}`);
    }

    return;
  }
  if (command === "install-apks") {
    const { commandLine, args } = installApksCommand(options);
    await exec(commandLine, args);

    return;
  }
  throw new Error("Command not supported!");
};
