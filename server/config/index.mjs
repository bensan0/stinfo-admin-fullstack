import defaultConfig from './default.mjs';

const environment = process.env.NODE_ENV || 'default';

async function loadConfig() {
  const { default: environmentConfig } = await import(`./${environment}.mjs`);
  return { ...defaultConfig, ...environmentConfig };
}

export default await loadConfig();