var v = require("./vars");
const client = new v.modules.discord.Client();

if(v.d.worldData == null){
    v.d.worldData = {
        cultures:{},
    }
}

//add all already defined funny cultures to the world's cultures - Note: do this after generating the random cultures
v.d.worldData.cultures = Object.assign(v.d.worldData.cultures, v.consts.funnyCultures);


setInterval(function(){
    for(var k in v.d.people){
        v.fn.personUpdate(k);
    }
},1000)

const commands = v.modules.requireDir('./commands');

v.client.on('ready', () => {
    console.log('Successfully connected to discord.');

    v.client.on('message', async (msg) => {
        if (v.client.user.id == msg.author.id) return; //if the message was sent by our bot user, exit
        if(msg.content.startsWith(v.d.settings.prefix)) { //if the message is a command
            if (msg.content.startsWith(v.d.settings.prefix + '{')) {
                let cmdsString = msg.content.slice(v.d.settings.prefix.length+1,-1); //remove (prefix+"{") and "}"
                let cmds = cmdsString.split(';');
                if (cmds.length > v.d.settings.maxNonAdminChainLength && !v.d.settings.admins.includes(msg.author.id)) return msg.channel.send(`You must be an admin to chain more than ${v.d.settings.maxNonAdminChainLength} commands at a time.`);
                for (i of cmds) {
                    if (i.startsWith(v.d.settings.prefix)) runCommand(msg, i);
                    else {
                        msg.channel.send(`The command \`${i}\` doesn't start with the correct prefix`);
                    }
                }
            } else runCommand(msg);
        }
    });
});

async function runCommand(msg, cmdString=msg.content) {
    let content = cmdString.slice(v.d.settings.prefix.length); //remove the command prefix from the message
    let args = content.split(' '); //split the message into an array of each word
    let command = args.shift(); //take the first of those words as the command

    msg.channel.send(await (async () => {
        if (commands[command] != null) { //if the command called exists,
            command = commands[command];

            if (command.options.adminOnly && !v.d.settings.admins.includes(msg.author.id)) { //if the command is an admin only command but the user isn't an admin
                return 'Only admins can use that command.'; //tell off the user
            }
            args = command.parseArgs(args);
            if (typeof args == 'string') return args;
            try {
                let output = await command.fn(args, msg); //run the function of the command
                v.fn.save(); //save any changes that were made
                if (typeof output == 'string' && output.length > 2000) return ('Command run successfully, but the output was over 2000 characters long and couldn\'t be sent entirely. Here\'s the beginning of it:\n\n' + output).slice(0, 2000); //if the generated message was too long to be sent as a discord message, tell the user their command was successful
                return output; //send the message returned by the command's function
            } catch (err) {
                console.log(err);
                return 'Error running command. Alert an admin.';
            }
        } else return `\`${v.d.settings.prefix}${command}\` isn't a command.`;
    })());
}