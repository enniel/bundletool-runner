import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as tc from "@actions/tool-cache";
import * as io from "@actions/io";

const BUNDLETOOL_URL =
  "https://github.com/google/bundletool/releases/download/:version/bundletool-all-:version.jar";

const DEFAULT_VERSION = "1.8.1";

async function run() {
  try {
    // only support running on macOS or Linux
    if (process.platform !== "darwin" && process.platform !== "linux") {
      throw new Error(
        "Unsupported virtual machine: please use either macos or ubuntu VM."
      );
    }

    // custom working directory
    const workingDirectoryInput = core.getInput("working-directory");
    if (workingDirectoryInput) {
      console.log(`custom working directory: ${workingDirectoryInput}`);
    }
    const workingDirectory = !workingDirectoryInput
      ? undefined
      : workingDirectoryInput;

    // custom version
    const versionInput = core.getInput("version");
    if (versionInput) {
      console.log(`custom version: ${versionInput}`);
    }
    const version = !versionInput ? DEFAULT_VERSION : versionInput;

    // execute the custom script
    try {
      // move to custom working directory if set
      if (workingDirectory) {
        process.chdir(workingDirectory);
      }
    } catch (error: any) {
      core.setFailed(error.message);
    }

    const bundleToolPath = `${process.env.HOME}/bundletool`;
    const bundleToolFile = `${bundleToolPath}/bundletool.jar`;

    await io.mkdirP(bundleToolPath);

    core.info(`${bundleToolPath} directory created`);

    const bundletoolUrl = BUNDLETOOL_URL.replace(/:version/g, version);

    core.info(`bundletoolUrl: ${bundletoolUrl}`);

    const downloadPath = await tc.downloadTool(bundletoolUrl);

    await io.mv(downloadPath, bundleToolFile);

    core.info(`${bundleToolFile} moved to directory`);

    core.addPath(bundleToolPath);

    core.info(`${bundleToolPath} added to path`);

    await exec.exec(`chmod +x ${bundleToolFile}`);

    core.exportVariable("BUNDLETOOL_FILE_PATH", bundleToolFile);

    await io.which("bundletool.jar", true);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
