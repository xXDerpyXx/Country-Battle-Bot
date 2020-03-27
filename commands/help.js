var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        var commands = v.modules.requireDir('./commands');
        if (args.cmd) { //if the user has specified a command to get help on
            cmd = commands[args.cmd]
            if (cmd) {
                return `${args.cmd}: ${cmd.options.description}`
            } else return 'That command doesn\'t exist';
        } else {
            let output = String();
            for (i of Object.keys(commands).sort()) {
                if (commands[i].options.adminOnly) {
                    if (v.d.settings.admins.includes(msg.author.id)) {
                        output += `${i}\n`;
                    }
                } else {
                    output += `${i}\n`;
                }
            }
            return `Type \`${v.d.settings.prefix}help {command}\` to get help on a specific command.\nHere are all the commands.\n\`\`\`${output}\`\`\``;
        }
    },
    
    {
        description: 'Shows information on how to use commands.',
        args: [
            new v.c.cmd.Argument(
                'cmd',
                {
                    required: false
                }
            )
        ]
    }
);