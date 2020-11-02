const { Client, Collection } = require('discord.js');
const App = require('./app');
const fs = require("fs");

module.exports = class IndexClient extends Client {
	constructor(options = {}) {
		super(options)

		this.commands = new Collection();
		this.aliases = new Collection();
		this.cooldowns = new Collection();
		this.categories = fs.readdirSync('./src/commands/');
		this.port = process.env.PORT;
	}

	async init() {
		['command'].forEach(handler => {
			require(`./bot/handlers/${handler}`)(this);
		});

		fs.readdir('./src/bot/events', (err, files) => {
			if (err) return console.log(err);

			files.forEach(file => {
				if (!file.endsWith('.js')) return;

				const events = require(`./bot/events/${file}`);
				let eventName = file.split('.')[0];
				this.on(eventName, events.bind(null, this)
			});
		});

		this.login((process.env.TOKEN)).then(() => {
			const server = new App(this);

			server.init()
		});
	}
}