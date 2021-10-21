export const DEFAULT_VERSION = "1.8.1";

export const INPUTS = {
  version: {
    key: "version",
    value: DEFAULT_VERSION,
  },
  workingDirectory: {
    key: "working-directory",
    value: "",
  },
  command: {
    key: "command",
    value: "",
  },
  bundle: {
    key: "bundle",
    value: "",
  },
  output: {
    key: "output",
    value: "",
  },
  overwrite: {
    key: "overwrite",
    value: "false",
  },
  aapt2: {
    key: "aapt2",
    value: "",
  },
  ks: {
    key: "ks",
    value: "",
  },
  ksPass: {
    key: "ks-pass",
    value: "",
  },
  ksKeyAlias: {
    key: "ks-key-alias",
    value: "",
  },
  connectedDevice: {
    key: "connected-device",
    value: "false",
  },
  deviceId: {
    key: "device-id",
    value: "",
  },
  deviceSpec: {
    key: "device-spec",
    value: "",
  },
  mode: {
    key: "mode",
    value: "",
  },
  localTesting: {
    key: "local-testing",
    value: "",
  },
  apks: {
    key: "apks",
    value: "",
  },
};

export const BUNDLETOOL_URL =
  "https://github.com/google/bundletool/releases/download/:version/bundletool-all-:version.jar";
