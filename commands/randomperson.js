var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        var output = String();
        var p = v.fn.randomProperty(v.d.people);
        for(let k in p){
            output += `   ${k}: ${p[k]}\n`;
        }
        return `${p.id}:\n${output}`;
    }
);