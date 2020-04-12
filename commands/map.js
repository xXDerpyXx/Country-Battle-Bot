var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    async (args, msg) => {
        let generatedMap;
        var pixelcount = 1000;
        var tilescale = pixelcount/args.radius;
        var h = false;
        if(args.heightmap == 1){
            h = true;
        }
        if (args.longitude == null) {
            generatedMap = await v.fn.map.imgmap(Math.round(v.d.mapInfo.width/2),Math.round(v.d.mapInfo.height/2),tilescale,args.radius,v.d.map,h);
        } else {
            generatedMap = await v.fn.map.imgmap(Math.round(parseInt(args.latitude)),Math.round(parseInt(args.longitude)),tilescale,args.radius,v.d.map,h);
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
                'heightmap',
                {
                    type: 'int',
                    required: false,
                    min: 0,
                    max: 1,
                    default: 0,
                }
            ),
        ],
    }
);
