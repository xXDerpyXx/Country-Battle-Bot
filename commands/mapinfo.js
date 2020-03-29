var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        let output = String();
        for (let k in v.d.mapInfo) {
            output += `${k}: ${v.d.mapInfo[k]}\n`;
        }
        return `\`${output}\``;
    },
    
    {
        description: 'Displays the generation settings used for the current map.',
    }
);