import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const workspace = resolve(process.cwd());
const deploymentDirectory = resolve(workspace, "dist");
const serverEntrypoint = resolve(deploymentDirectory, "server", "index.js");
const hostingSource = resolve(workspace, ".openai", "hosting.json");
const hostingDirectory = resolve(deploymentDirectory, ".openai");
const hostingDestination = resolve(hostingDirectory, "hosting.json");

if (!serverEntrypoint.startsWith(`${deploymentDirectory}\\`) && !serverEntrypoint.startsWith(`${deploymentDirectory}/`)) {
  throw new Error("Refusing to inspect a server entrypoint outside the deployment directory.");
}

if (!existsSync(serverEntrypoint)) {
  throw new Error(`vinext server entrypoint not found at ${serverEntrypoint}`);
}

if (!existsSync(hostingSource)) {
  throw new Error(`Sites hosting metadata not found at ${hostingSource}`);
}

mkdirSync(hostingDirectory, { recursive: true });
copyFileSync(hostingSource, hostingDestination);

console.log(`Prepared Sites metadata at ${hostingDestination}`);
