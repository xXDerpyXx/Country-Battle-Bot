var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        v.fn.map.genMap();
        return 'Map made.';
    },
    
    {
        description: 'Regenerates the map.',
        adminOnly: true,
    }
);