var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    async (args, msg) => {
        console.log('Bot was shut off by an admin.')
        await msg.channel.send('Roger that.');
        process.exit();
    },

    {
        description: 'Turns off the bot.',
        adminOnly: true,
    }
);