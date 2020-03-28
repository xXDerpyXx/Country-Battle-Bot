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
            let content = msg.content.slice(v.d.settings.prefix.length); //remove the command prefix from the message
            let args = content.split(' '); //split the message into an array of each word
            let command = args.shift(); //take the first of those words as the command
    
            if (commands[command]) { //if the command called exists,
                command = commands[command];
                msg.channel.send(await (async () => {
                    if (command.options.adminOnly && !v.d.settings.admins.includes(msg.author.id)) { //if the command is an admin only command but the user isn't an admin
                        return 'Only admins can use that command.'; //tell off the user
                    }
                    args = command.parseArgs(args);
                    if (typeof args == 'string') return args;
                    let output = await command.fn(args, msg); //run the function of the command
                    v.fn.save(); //save any changes that were made
                    if (typeof output == 'string' && output.length > 2000) return ('Command run successfully, but the output was over 2000 characters long and couldn\'t be sent entirely. Here\'s the beginning of it:\n\n' + output).slice(0, 2000); //if the generated message was too long to be sent as a discord message, tell the user their command was successful
                    return output; //send the message returned by the command's function
                })());
            }
        }
    });
});