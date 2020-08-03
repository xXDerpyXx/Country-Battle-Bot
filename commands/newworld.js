var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    async (args, msg) => {
        await v.fn.discord.showLoading(msg);
        let seed = (args.seed != null ? args.seed : msg.id);
        v.fn.world.generate(seed);
        return `Map made with seed \`${seed}\`.`;
    },
    
    {
        description: 'Completely deletes the current world and creates a new one.',
        adminOnly: true,

        args: [
            new v.c.cmd.Argument(
                'seed',
                {
                    description: 'What seed should be used to generate the new world.',
                    required: false,

                    type: 'string',
                    maxLength: 256,
                }
            ),
        ]
    }
);