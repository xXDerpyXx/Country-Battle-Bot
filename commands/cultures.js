var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        let output = String();
        for(let c in v.d.worldData.cultures){
            output +=`\n${v.d.worldData.cultures[c].name}`;
        }
        
        return `\`\`\`${output}\`\`\``;
    },

    {
        description: 'Displays a list of all the cultures.',
    }
);