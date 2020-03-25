const {createCanvas} = require("canvas");
var c = require("canvas");
var settings = require("./settings.json");

function oob(x,y){
    return (x >= 0 && x < settings.width && y >= 0 && y < settings.height);
}

function seaHeight(e){
    return e-settings.seaLevel;
}

module.exports = function imgmap(cx,cy, scale, radius, map){
    if(radius > 100 || scale > 1000){
        radius = 100;
        scale = 1000
    }
    var img = createCanvas(radius * 2 * scale,radius * 2 * scale) //find something to make canvas
    var ctx = img.getContext("2d") // get canvas context 
    ctx.font = scale + "px Serif";
    var px = 0;
    var py = 0;
    for(var y = cy-radius; y < cy+radius;y++){
        for(var x = cx-radius; x < cx+radius;x++){
            if(!oob(x,y)){
                ctx.fillStyle = "#000000"
                ctx.fillRect(px * scale, py*scale, scale, scale);
                continue;
            }else{
                if(map[x][y] == null){
                    ctx.fillStyle = "#000000"
                    ctx.fillRect(px * scale, py*scale, scale, scale);
                    continue;
                }
                var e = seaHeight(map[x][y].elevation);
                if(e <= 0){
                    ctx.fillStyle = "rgb(10,10,200)"
                }else if(e <= 1){
                        var temp = 230 - (e*10)
                        ctx.fillStyle = "rgb("+(temp)+","+(temp)+","+(182)+")"
                }else if(e <= 6){
                    var temp = e*20
                    ctx.fillStyle = "rgb("+(40)+","+(temp)+","+(20)+")"
                }else{
                    var temp = (e-6)*20
                    ctx.fillStyle = "rgb("+(temp)+","+(temp)+","+(temp)+")"
                }
                 
                ctx.fillRect(px * scale, py * scale, scale, scale);
            }
            
            px++;
        }
        px = 0;
        py++;
    }
    /*
    let promises = Object.entries(people).filter(a => a[0] != id).map(([k,p]) => {
        return doDraw(k);
    });
    await Promise.all(promises);
    await doDraw(id);
    async function doDraw(k) {
        var here = districttoxy(people[k].district);
        
        var x = here[0];
        var y = here[1];
        x = x - cx + radius;
        y = y - cy + radius;
        if(people[k].avatarURL == null || people[k].avatarURL == "./humanperson.png") {
            let user = await client.fetchUser(people[k].id);
            people[k].avatarURL = user.avatarURL;
        }
        if(x * scale < img.width && x * scale > 0 && y * scale < img.height && y * scale > 0) {
            let avatar;
            try {
                avatar = await download_image(people[k].avatarURL)
            }
            catch(e) {
                avatar = person
            }
            if(map[people[k].district].biome == "ocean"){
                ctx.drawImage(boat,x * scale, y * scale,scale,scale);
                ctx.drawImage(avatar,(x * scale)+((scale * 0.33)/2), y * scale,scale*0.67,scale*0.67);
                ctx.drawImage(boattop,x * scale, y * scale,scale,scale);
            }else{
                ctx.drawImage(avatar,(x * scale) + (scale * 0.1), (y * scale) + (scale *0.1 ),scale*0.8,scale*0.8);
            }
        }
    }
    */
    return img.createPNGStream();//("image/png",{ compressionLevel: 3, filters: img.PNG_FILTER_NONE });
}