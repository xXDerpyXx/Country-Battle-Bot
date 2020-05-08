var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        return `if the x is ${args.x} and the y is ${args.y} (${typeof args.x} ${typeof args.y}) ${JSON.stringify(v.fn.map.wrap(args.x, args.y))}`;
    },

    {
        description: 'Displays info on a culture.',
        hidden: true,
        args: [
            new v.c.cmd.Argument(
                'x',
                {
                    description: 'x',
                    type: "int",
                }
            ),
            new v.c.cmd.Argument(
                'y',
                {
                    description: 'y',
                    type: "int",
                }
            ),
        ],
    }
);