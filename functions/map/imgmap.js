var fs = require("fs");
var c = require("canvas");

var validMapTypes = ['default', 'heightmap'];

module.exports = async function imgmap(cx,cy, scale = 50, radius = 50, map, mapType = validMapTypes[0]){
    return new Promise(async (res, rej) => {
        if (!validMapTypes.includes(mapType)) rej(new Error('mapType is invalid.'));

        var v = require.main.require('./vars.js');
        

        if(radius > 100 || scale > 1000){
            radius = 100;
            scale = 1000;
        }
        var xoffset = (radius-cx)*scale;
        var yoffset = (radius-cy)*scale;
        var img = c.createCanvas(radius * 2 * scale,radius * 2 * scale); //find something to make canvas
        var biomeImages = Object();
        for (imageFilename of v.modules.fs.readdirSync('./images/biomes')) {
            biomeImages[imageFilename.slice(0,-4)] = await c.loadImage('./images/biomes/'+imageFilename); //.slice to remove the ".png"
        }
        
        var ctx = img.getContext("2d"); // get canvas context 
        ctx.font = scale + "px Serif";
        var px = 0;
        var py = 0;
        for(var y = cy-radius; y < cy+radius;y++){
            for(var x = cx-radius; x < cx+radius;x++){
                if(!v.fn.map.oob(x,y)){
                    ctx.fillStyle = "#000000";
                    ctx.fillRect((x * scale)+xoffset, (y*scale)+yoffset, scale, scale);
                    continue;
                }else{
                    if(!map[x] || !map[x][y]){
                        ctx.fillStyle = "#000000";
                        ctx.fillRect((x-radius) * scale, (y-radius)*scale, scale, scale);
                        continue;
                    }
                    var e = v.fn.map.seaHeight(map[x][y].elevation);
                    if(mapType == "heightmap"){
                        var temp = 150-(e*20);
                        temp = Math.round(temp);
                        ctx.fillStyle = "rgb("+(temp)+","+(temp)+","+(temp)+")";
                        ctx.fillRect((x * scale)+xoffset, (y*scale)+yoffset, scale, scale);
                        continue;
                    }
                    
                    var drawn = false;
                    if(e <= 0){
                        //ctx.fillStyle = "rgb(10,10,200)";
                        ctx.drawImage(biomeImages.ocean,(x * scale)+xoffset, (y*scale)+yoffset, scale, scale)
                        drawn = true;
                    }else if(e <= v.d.mapInfo.shoreHeight){
                        ctx.drawImage(biomeImages.beach,(x * scale)+xoffset, (y*scale)+yoffset, scale, scale)
                        drawn = true;
                        /*
                        var temp = 230 - (e*10)
                        temp = Math.round(temp);
                        ctx.fillStyle = "rgb("+(temp)+","+(temp)+","+(182)+")";*/
                    }else if(e <= v.d.mapInfo.mountainHeight){
                        ctx.drawImage(biomeImages.forest,(x * scale)+xoffset, (y*scale)+yoffset, scale, scale)
                        drawn = true;
                        /*
                        var temp = 150-(e*20);
                        temp = Math.round(temp);
                        ctx.fillStyle = "rgb("+(60)+","+(temp+00)+","+(30)+")";
                        */
                    }else{
                        ctx.drawImage(biomeImages.mountain,(x * scale)+xoffset, (y*scale)+yoffset, scale, scale)
                        drawn = true;
                        /*
                        var temp = ((e-6)*20)+100;
                        temp = Math.round(temp);
                        ctx.fillStyle = "rgb("+(temp)+","+(temp)+","+(temp)+")";
                        */
                    }
                    if(!drawn)
                        ctx.fillRect((x * scale)+xoffset, (y*scale)+yoffset, scale, scale);
                }
                
                px++;
            }
            px = 0;
            py++;
        }
        ctx.fillStyle = "#000000";
        if(mapType == 'default'){
            for(var k in v.d.people){
                //console.log(v.d.people[k]);
                //ctx.fillRect(v.d.people[k].x * scale, v.d.people[k].y * scale, scale, scale);
                if(v.fn.map.oob(v.d.people[k].x,v.d.people[k].y))
                    ctx.fillRect(Math.floor(((v.d.people[k].x+Math.random())) * scale)+xoffset, Math.floor(((v.d.people[k].y+Math.random())) * scale)+yoffset, scale/10, scale/10);
            }
        }
        /*
        let promises = Object.entries(v.d.people).filter(a => a[0] != id).map(([k,p]) => {
            return doDraw(k);
        });
        await Promise.all(promises);
        await doDraw(id);
        async function doDraw(k) {
            var here = districttoxy(v.d.people[k].district);
            
            var x = here[0];
            var y = here[1];
            x = x - cx + radius;
            y = y - cy + radius;
            if(v.d.people[k].avatarURL == null || v.d.people[k].avatarURL == "./humanperson.png") {
                let user = await client.fetchUser(v.d.people[k].id);
                v.d.people[k].avatarURL = user.avatarURL;
            }
            if(x * scale < img.width && x * scale > 0 && y * scale < img.height && y * scale > 0) {
                let avatar;
                try {
                    avatar = await download_image(v.d.people[k].avatarURL);
                }
                catch(e) {
                    avatar = v.c.person;
                }
                if(map[v.d.people[k].district].biome == "ocean"){
                    ctx.drawImage(boat,x * scale, y * scale,scale,scale);
                    ctx.drawImage(avatar,(x * scale)+((scale * 0.33)/2), y * scale,scale*0.67,scale*0.67);
                    ctx.drawImage(boattop,x * scale, y * scale,scale,scale);
                }else{
                    ctx.drawImage(avatar,(x * scale) + (scale * 0.1), (y * scale) + (scale *0.1 ),scale*0.8,scale*0.8);
                }
            }
        }
        */
        res(img.createPNGStream());//("image/png",{ compressionLevel: 3, filters: img.PNG_FILTER_NONE });
    });
}

module.exports.validMapTypes = validMapTypes;