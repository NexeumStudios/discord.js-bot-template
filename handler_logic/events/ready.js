const { ActivityType } = require('discord.js');
const { client } = require('../../');
const chalk = require('chalk');

client.on("ready", async () => {
    const activities = [{ name: `The Ultimate FiveM Status Bot!`, type: ActivityType.Custom }];
    async function setStatus() {
        var activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity);
    };
    await setStatus();
    console.log(chalk.red(`[CLIENT]: Logged in as ${client.user.tag}!`));
});