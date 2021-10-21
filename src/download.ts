import os from "os";
import fs from "fs";
import path from "path";
import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as tc from "@actions/tool-cache";
import * as io from "@actions/io";
import { BUNDLETOOL_URL } from "./constants";

export const download = async (version: string): Promise<void> => {
  const bundleToolPath = path.join(os.homedir(), "bundletool");
  const bundleToolFile = path.join(bundleToolPath, "bundletool.jar");

  // create folder if not exists
  await io.mkdirP(bundleToolPath);

  core.info(`${bundleToolPath} directory created`);

  const bundletoolUrl = BUNDLETOOL_URL.replace(/:version/g, version);

  core.info(`bundletoolUrl: ${bundletoolUrl}`);

  const downloadPath = await tc.downloadTool(bundletoolUrl, bundleToolFile);

  // check file exists
  if (fs.existsSync(downloadPath)) {
    core.info(`${downloadPath} exists`);
  } else {
    throw new Error(`Missing file at path: ${downloadPath}`);
  }

  core.info(`downloaded to ${downloadPath}`);

  core.addPath(bundleToolPath);

  core.info(`${bundleToolPath} added to path`);

  // make bundletool.jar executable
  await exec.exec(`chmod +x ${bundleToolFile}`);

  // export variable for reuse in other actions
  core.exportVariable("BUNDLETOOL_FILE_PATH", bundleToolFile);
};
