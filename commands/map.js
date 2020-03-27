var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        var temp = null;
        var radius = 50
        if(args.radius){
            radius = parseInt(args.radius)
        }
        var pixelcount = 1000
        var tilescale = pixelcount/radius
        
        if(!args.width){
            temp = v.fn.map.imgmap(Math.round(v.d.settings.width/2),Math.round(v.d.settings.height/2),tilescale,radius,v.d.map);
        }else{
            temp = v.fn.map.imgmap(Math.round(parseInt(args.latitude)),Math.round(parseInt(args.longitude)),tilescale,radius,v.d.map);
        }
        return new v.modules.discord.MessageAttachment(temp, "image.png");
    },
    
    {
        args: [
            new v.c.cmd.Argument(
                'latitude',
                {
                    type: 'int',
                    required: false
                }
            ),
            new v.c.cmd.Argument(
                'longitude',
                {
                    type: 'int',
                    required: false
                }
            ),
            new v.c.cmd.Argument(
                'radius',
                {
                    type: 'int',
                    required: false
                }
            )
        ]
    }
);
