module.exports = {
	apps: [
		{
			name: 'potatochips0706.com',
			script: './server.ts',
			interpreter: 'bun',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
