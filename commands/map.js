var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        let temp;
        var pixelcount = 1000;
        var tilescale = pixelcount/args.radius;
        
        if(args.longitude == null){
            temp = v.fn.map.imgmap(Math.round(v.d.mapInfo.width/2),Math.round(v.d.mapInfo.height/2),tilescale,args.radius,v.d.map);
        }else{
            temp = v.fn.map.imgmap(Math.round(parseInt(args.latitude)),Math.round(parseInt(args.longitude)),tilescale,args.radius,v.d.map);
        }
        return new v.modules.discord.MessageAttachment(temp, 'map.png', 'image.png');
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
        ],
    }
);
