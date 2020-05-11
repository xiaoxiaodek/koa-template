let instances = require('os').cpus().length;
if (instances > 8) {
  instances = 8;
}

module.exports = {
  apps: [
    {
      name: 'template',
      script: './app.js',
      log_date_format: 'YY-MM-DD HH:mm:ss',
      instances,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'dev'
      },
      env_sit: {
        NODE_ENV: 'sit'
      },
      env_uat: {
        NODE_ENV: 'uat'
      },
      env_prod: {
        NODE_ENV: 'prod'
      }
    }
  ]
};
