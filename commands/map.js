var v = require.main.require('./vars.js');
const {validMapTypes} = require.main.require('./functions/map/imgmap');

module.exports = new v.c.cmd.Command(
    async (args, msg) => {
        if (!validMapTypes.includes(args.mapType)) return `\`${args.mapType}\` isn't a valid map type.`;
        let generatedMap;
        var pixelcount = 1000;
        var tilescale = pixelcount/args.radius;
        if (args.longitude == null) {
            generatedMap = await v.fn.map.imgmap(Math.round(v.d.mapInfo.width/2),Math.round(v.d.mapInfo.height/2),tilescale,args.radius,v.d.map,args.mapType);
        } else {
            generatedMap = await v.fn.map.imgmap(Math.round(parseInt(args.latitude)),Math.round(parseInt(args.longitude)),tilescale,args.radius,v.d.map,args.mapType);
        }
        return new v.modules.discord.MessageAttachment(generatedMap, 'map.png', 'image.png');
    },
    
    {
        description: 'Generates and shows an image of the map.',

        args: [
            new v.c.cmd.Argument(
                'latitude',
                {
                    type: 'int',
                    required: false,
                }
            ),
            new v.c.cmd.Argument(
                'longitude',
                {
                    type: 'int',
                    required: false,
                }
            ),
            new v.c.cmd.Argument(
                'radius',
                {
                    type: 'int',
                    required: false,
                    min: 1,
                    max: 100,
                    default: 50,
                }
            ),
            new v.c.cmd.Argument(
                'mapType',
                {
                    description: 'The type of map which will be generated.',

                    type: 'string',
                    required: false,
                    default: 'default',
                }
            ),
        ],
    }
);
