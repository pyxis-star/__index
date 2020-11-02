const { ShardingManager } = require('discord.js');
const chalk = require("chalk");
const manager = new ShardingManager('./_index.js', { token: process.env.TOKEN,  totalShards: 'auto' });

manager.on('shardCreate', shard => console.log(`[ ${chalk.magenta("SHARDS")} ] - Launched shard ${shard.id}`));
manager.spawn();