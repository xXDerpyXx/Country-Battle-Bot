var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        var temp = null;
        var wideness = 50
        if(args.wideness){
            wideness = parseInt(args.wideness)
        }
        var pixelcount = 1000
        var tilescale = pixelcount/wideness
        
        if(!args.width){
            temp = v.fn.map.imgmap(Math.round(v.d.settings.width/2),Math.round(v.d.settings.height/2),tilescale,wideness,v.d.map);
        }else{
            temp = v.fn.map.imgmap(Math.round(parseInt(args.width)),Math.round(parseInt(args.height)),tilescale,wideness,v.d.map);
        }
        return new v.modules.discord.MessageAttachment(temp, "image.png");
    },
    
    {
        args: [
            new v.c.cmd.Argument(
                'width',
                {
                    type: 'int',
                    required: false
                }
            ),
            new v.c.cmd.Argument(
                'height',
                {
                    type: 'int',
                    required: false
                }
            ),
            new v.c.cmd.Argument(
                'wideness',
                {
                    type: 'int',
                    required: false
                }
            )
        ]
    }
);