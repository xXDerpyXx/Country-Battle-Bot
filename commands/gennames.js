var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        if(v.d.worldData.cultures[args.culture] == null){
            return "that isn't a culture"
        }
        let output = String();
        for (let i = 0; i < args.amount; i++) {
            output += v.fn.randomName(v.d.worldData.cultures[args.culture]) + (args.amount <= 25 ? '\n' : ' '); 
        }
        return `\`\`\`${output}\`\`\``;
    },

    {
        description: 'Generate a list of names from a culture\'s language.',
        
        args: [
            new v.c.cmd.Argument(
                'culture',
                {
                    description: 'Which culture\'s language\'s names will be generated for.',

                    type: 'string'
                }
            ),
            new v.c.cmd.Argument(
                'amount',
                {
                    description: 'How many names will be generated. Default 1.',

                    type: 'int',
                    min: 1,
                    max: 150,
                    default: 1,
                    required: false,
                }
            )
        ]
    }
);
