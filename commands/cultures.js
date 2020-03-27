var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        var output = String();
        for(var c in v.d.worldData.cultures){
            output +=`${c}\n`
            for(var k in v.d.worldData.cultures[c]){
                output += `${k}: ${v.d.worldData.cultures[c][k]}\n`;
            }
        }
        
        return output;
    }
);