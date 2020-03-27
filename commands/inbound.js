var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        return v.fn.map.oob(args.x,args.y);
    },

    {
        args: [
            new v.c.cmd.Argument(
                'x',
                {
                    type: 'int'
                }
            ),
            new v.c.cmd.Argument(
                'y',
                {
                    type: 'int'
                }
            )
        ]
    }
);