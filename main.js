var v = require("./vars");
const client = new v.modules.discord.Client();

if(v.d.worldData == null){
    v.d.worldData = {
        cultures:{},
    }
}

v.d.worldData.cultures["gay"] = {
    vowels:["a","y"],
    consonants:["g"],
    name:"gay"
}
v.d.worldData.cultures["retard"] = {
    vowels:["a","e","u"],
    consonants:["r","t","d","h"],
    name:"retard"
}

v.d.worldData.cultures["cabrikk"] = {
    vowels:["ā","ē","ī","ō","ū"],
    consonants:["ḃ", "ċ", "ḋ",  "ḳ", "ŀ", "ṅ", "ṗ", "ṛ"],
    name:"cabrikk"
}

v.d.worldData.cultures["furry"] = {
    vowels:["u","o"],
    consonants:["w","x","3","n"],
    name:"furry"
}



setInterval(function(){
    for(var k in v.d.people){
        v.fn.personUpdate(k);
    }
},1000)

const commands = v.modules.requireDir('./commands');

v.client.on('message', msg => {
    if (v.client.user.id == msg.author.id) return; //if the message was sent by our bot user, exit
    if(msg.content.startsWith(v.d.settings.prefix)) { //if the message is a command
        let content = msg.content.slice(v.d.settings.prefix.length); //remove the command prefix from the message
        let args = content.split(' '); //split the message into an array of each word
        let command = args.shift(); //take the first of those words as the command

        if (commands[command]) { //if the command called exists,
            command = commands[command];
            msg.channel.send((() => {
                if (command.options.adminOnly && !v.d.settings.admins.includes(msg.author.id)) { //if the command is an admin only command but the user isn't an admin
                    return 'Only admins can use that command.'; //tell off the user
                }
                args = command.parseArgs(args);
                if (typeof args == 'string') return args;
                let output = command.fn(args, msg); //run the function of the command
                v.fn.save(); //save any changes that were made
                return output; //send the message returned by the command's function
            })());
        }
    }
});

v.client.on('ready', () => {
    console.log('Successfully connected to discord.');
});