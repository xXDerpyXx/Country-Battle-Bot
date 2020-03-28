var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        return v.fn.map.oob(args.x,args.y);
    },

    {
        description: 'Tells you if a set of coordinates are within the bounds of the map.',

        args: [
            new v.c.cmd.Argument(
                'x',
                {
                    description: 'The... x coordinate to check..? This one\'s kinda self-explanatory.',

                    type: 'int',
                }
            ),
            new v.c.cmd.Argument(
                'y',
                {
                    description: 'The... y coordinate to check..? This one\'s kinda self-explanatory.',

                    type: 'int',
                }
            ),
        ],
    }
);
