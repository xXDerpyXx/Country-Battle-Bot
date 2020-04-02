var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    async (args, msg) => {
        await v.fn.discord.showLoading(msg);
        let seed = (args.seed != null ? args.seed : msg.id);
        v.fn.map.genMap(seed);
        return `Map made with seed \`${seed}\`.`;
    },
    
    {
        description: 'Regenerates the map.',
        adminOnly: true,

        args: [
            new v.c.cmd.Argument(
                'seed',
                {
                    description: 'What seed should be used to generate the map. This only affects the world; not the people who live on it.',
                    required: false,

                    type: 'string',
                    maxLength: 256,
                }
            ),
        ]
    }
);