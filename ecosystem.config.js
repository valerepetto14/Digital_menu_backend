module.exports = {
    apps: [
        {
            name: 'app',
            script: 'dist/src/index.js',
            instances: 1,
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
