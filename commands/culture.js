var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        if (v.d.worldData.cultures[args.culture]) {
            let culture = v.d.worldData.cultures[args.culture];
            let output = `__${culture.name}__`;
            for(let i in v.d.worldData.cultures[args.culture]){
                output +=`\n\t${i}: ${v.d.worldData.cultures[args.culture][i]}`;
            }
        
            return output;
        } else return 'That culture doesn\'t exist.';
    },

    {
        description: 'Displays info on a culture.',
        args: [
            new v.c.cmd.Argument(
                'culture',
                {
                    description: 'Which culture to get info on.',
                }
            ),
        ],
    }
);