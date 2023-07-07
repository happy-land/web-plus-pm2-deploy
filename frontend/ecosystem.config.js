require('dotenv').config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/master',
  TEMP_PATH = '~/temp',
  DEPLOY_REPO,
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: TEMP_PATH,
      'post-deploy': `npm run build && scp -r ./build/* praktikum@51.250.94.150:/home/praktikum/mesto-frontend`,
    }
  }
}