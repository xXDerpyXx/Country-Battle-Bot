var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        var commands = v.modules.requireDir('./commands');
        if (args.cmd) { //if the user has specified a command to get help on
            cmd = commands[args.cmd]
            if (cmd) {
                let output = Object();
                for (let arg of cmd.options.args) {
                    let fullDesc = String();

                    fullDesc += ` (${(arg.options.required ? 'required' : 'optional')}): ${arg.options.description}\n`;

                    output[arg.name] = fullDesc; 
                }
                let argsDesc = String();
                for (i in output) {
                    argsDesc += `\`${i}\`${output[i]}`;
                }
                return `\`${v.d.settings.prefix}${args.cmd}${(Object.keys(output).length > 0 ? ` {${Object.keys(output).join('} {')}}` : ``)}\`: ${cmd.options.description}\n\n${argsDesc}`;
            } else return 'You can\'t get help on a command which doesn\'t exist.';
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
            return `Type \`${v.d.settings.prefix}help {command}\` to get help on a specific command.\nHere are all the commands.\n\`\`\`\n${output}\`\`\``;
        }
    },
    
    {
        description: 'Shows information on how to use commands.',
        args: [
            new v.c.cmd.Argument(
                'cmd',
                {
                    description: 'Which command to get help on. If not supplied, a list of commands will be shown.',

                    required: false
                }
            )
        ]
    }
);
