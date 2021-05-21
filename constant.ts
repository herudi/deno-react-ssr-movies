import { parseFlag } from "./deps/deps-server.ts";

const env = parseFlag(Deno.args);
const DEFAULT_PORT = 3000;

export const DENO_ENV = env.deno_env || "development";
export const PORT = env.port ? Number(env.port) : DEFAULT_PORT;
export const BASE_URL = env.base_url || "http://localhost:" + DEFAULT_PORT;
export const BROWSER_PATH = DENO_ENV === 'production' ? '/assets/bundle.js' : '/development.js';