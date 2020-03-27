var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        if(v.d.worldData.cultures[args.culture] == null){
            return "that isn't a culture"
        }
        let output = String();
        for (let i = 0; i < args.amount; i++) {
            output += `${v.fn.randomName(v.d.worldData.cultures[args.culture])}\n`;
        }
        return `\`\`\`${output}\`\`\``;
    },

    {
        args: [
            new v.c.cmd.Argument(
                'culture',
                {
                    type: 'string'
                }
            ),
            new v.c.cmd.Argument(
                'amount',
                {
                    type: 'int',
                    min: 1,
                    max: 25,
                    default: 1,
                    required: false
                }
            )
        ]
    }
);