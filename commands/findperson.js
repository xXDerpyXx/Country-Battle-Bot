var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        var output = String();
        if (!v.d.people.hasOwnProperty(args.personid))
            return 'There\'s no person with that ID.';
        var p = v.d.people[args.personid];
        for(let k in p){
            output += `   ${k}: ${p[k]}\n`;
        }
        return `${p.id}:\n${output}`;
    },

    {
        description: 'Gives you the information of a person by their id.',
        args: [
            new v.c.cmd.Argument(
                'personid',
                {
                    description: 'The ID of the person you\'re getting info on.',
                }
            ),
        ],
    }
);