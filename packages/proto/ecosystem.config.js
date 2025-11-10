const path = require('path');
const os = require('os');

module.exports = {
  apps: [{
    name: 'proto-server',
    script: 'http-server',
    args: 'dist -p 3000',
    cwd: path.join(__dirname),
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    env: {
      NODE_ENV: 'production'
    },
    error_file: path.join(os.homedir(), 'logs', 'proto-error.log'),
    out_file: path.join(os.homedir(), 'logs', 'proto-out.log'),
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};

