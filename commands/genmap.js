var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    async (args, msg) => {
        await v.fn.discord.showLoading(msg);
        v.fn.map.genMap();
        return 'Map made.';
    },
    
    {
        description: 'Regenerates the map.',
        adminOnly: true,
    }
);