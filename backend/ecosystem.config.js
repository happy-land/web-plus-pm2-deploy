require('dotenv').config();

const {
  PORT,
  JWT_SECRET,
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF,
  DEPLOY_PATH,
  TEMP_PATH = '~/temp',
  DEPLOY_REPO,
  DB_ADDRESS,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './dist/app.js',
    env_production: {
      NODE_ENV: 'production',
      PORT,
      JWT_SECRET,
      DB_ADDRESS,
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000,
      JWT_SECRET,
      DB_ADDRESS,
    },
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': `cp -Rf ./backend/* ${DEPLOY_PATH} && cp ${TEMP_PATH}/.env ${DEPLOY_PATH} && rm -rf ${TEMP_PATH} && cd ${DEPLOY_PATH} && npm i && npm run build && pm2 kill && pm2 start ecosystem.config.js && pm2 save`,
    },
  },
};
