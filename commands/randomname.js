var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        if(v.d.worldData.cultures[args.culture] == null){
            return "that isn't a culture"
        }
        return v.fn.randomName(args.culture);
    },

    {
        args: [
            new v.c.cmd.Argument(
                'culture',
                {
                    type: 'string'
                }
            )
        ]
    }
);