import * as core from "@actions/core";
import { parseInputs } from "./inputs";
import { runCommand } from "./commands";
import { download } from "./download";

async function run() {
  try {
    // only support running on macOS or Linux
    if (process.platform !== "darwin" && process.platform !== "linux") {
      throw new Error(
        "Unsupported virtual machine: please use either macos or ubuntu VM."
      );
    }

    const {
      workingDirectory,
      version,
      command,
      bundle,
      output,
      overwrite,
      aapt2,
      ks,
      ksPass,
      ksKeyAlias,
      connectedDevice,
      deviceId,
      deviceSpec,
      mode,
      localTesting,
    } = parseInputs();

    // move to custom working directory if set
    if (workingDirectory) {
      process.chdir(workingDirectory);
    }

    await download(version);

    if (command) {
      await runCommand(command, {
        bundle,
        output,
        overwrite,
        aapt2,
        ks,
        ksPass,
        ksKeyAlias,
        connectedDevice,
        deviceId,
        deviceSpec,
        mode,
        localTesting,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
