import dotenv from 'dotenv';
import defaultConfig from './default.mjs';

dotenv.config();

const environment = process.env.NODE_ENV || 'dev';

async function loadConfig() {
  const { default: environmentConfig } = await import(`./${environment}.mjs`);
  return { ...defaultConfig, ...environmentConfig };
}

export default await loadConfig();