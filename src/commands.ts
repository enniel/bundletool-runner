import { exec } from "@actions/exec";

interface Options {
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

const buildApksCommand = (options: Options) => {
  const commandLine = `java -jar ${process.env.BUNDLETOOL_FILE_PATH} build-apks`;
  if (!options.bundle) {
    throw new Error("Option `bundle` is required");
  }
  if (!options.output) {
    throw new Error("Option `output` is required");
  }

  const args = [`--bundle=${options.bundle}`, `--output=${options.output}`];

  if (options.overwrite) {
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
  if (options.connectedDevice) {
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
  if (options.localTesting) {
    args.push(`--local-testing=${options.localTesting}`);
  }

  return { commandLine, args };
};

export const runCommand = (
  command: string,
  options: Options
): Promise<number> => {
  if (command === "build-apks") {
    const { commandLine, args } = buildApksCommand(options);
    return exec(commandLine, args);
  }
  throw new Error("Command not supported!");
};
