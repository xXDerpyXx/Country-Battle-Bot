var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        let output = String();
        for (let k in v.d.settings) {
            output += `${k}: ${v.d.settings[k]}\n`;
        }
        return `\`${output}\``;
    },
    
    {
        description: 'Displays all the current settings.',

        adminOnly: true
    }
);