module.exports = {
    apps: [
        {
            name: 'app',
            script: 'dist/src/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
        },
    ],
    deploy: {
        development: {
            user: 'ubuntu',
            host: '15.229.105.249',
            key: '/Users/admin/Desktop/digitalMenu/digital_menu_key/digital_menu.pem',
            ref: 'origin/develop',
            repo: 'https://github.com/valerepetto14/Digital_menu_backend',
            path: '/home/ubuntu/Digital_menu_backend',
            'post-deploy': 'npm install && tsc && pm2 reload ecosystem.config.js --env development',
        },
    },
};
