var v = require.main.require('./vars.js');

function msToTime(ms){
    days = Math.floor(ms / 86400000); // 24*60*60*1000
    daysms = ms % 86400000; // 24*60*60*1000
    hours = Math.floor(daysms / 3600000); // 60*60*1000
    hoursms = ms % 3600000; // 60*60*1000
    minutes = Math.floor(hoursms / 60000); // 60*1000
    minutesms = ms % 60000; // 60*1000
    sec = Math.floor(minutesms / 1000);
  
    let str = "";
    if (days) str = str + days + "d";
    if (hours) str = str + hours + "h";
    if (minutes) str = str + minutes + "m";
    if (sec) str = str + sec + "s";
  
    return str;
}

module.exports = new v.c.cmd.Command(
    async (args, msg) => {
        pinger = await msg.channel.send('pinging...');
        pinger.edit("**Command to response delay**: `" + (pinger.createdAt - msg.createdAt) + "ms`\n**API**: `" + Math.round(v.client.ws.ping) + "ms`\n**Uptime**: `" + msToTime(v.client.uptime) + "`");
    },

    {
        description: 'Get the bot\'s ping.',
        hidden: true,
    }
);