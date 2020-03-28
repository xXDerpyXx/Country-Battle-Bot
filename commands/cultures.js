var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        return `\`\`\`\n${Object.keys(v.d.worldData.cultures).join('\n')}\`\`\``;
    },

    {
        description: 'Displays a list of all the cultures.',
    }
);