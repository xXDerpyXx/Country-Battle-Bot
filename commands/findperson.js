var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        if (!v.d.people.hasOwnProperty(args.personid))
            return 'There\'s no person with that ID.';
        return v.fn.people.describePerson(args.personid);
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