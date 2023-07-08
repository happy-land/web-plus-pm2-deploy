require('dotenv').config();

const {
  PORT,
  JWT_SECRET,
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_REF,
  DEPLOY_PATH,
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
      'post-deploy': 'pwd && cd backend && npm i',
      // 'post-deploy': 'cd backend && ls && npm i && npm run build && pm2 kill && pm2 start ecosystem.config.js && pm2 save',
      // 'post-deploy': `cd ${DEPLOY_PATH} && npm i && npm run build && pm2 kill && pm2 start ecosystem.config.js && pm2 save`,
      // 'post-deploy': 'ls && cd backend && ls && cat ecosystem.config.js',
      // 'post-deploy': `cd ${DEPLOY_PATH} && ls && cat ecosystem.config.js`,
    },
  },
};
