module.exports = function imgmap(cx,cy, scale = 50, radius = 50, map){
    var v = require.main.require('./vars.js');
    
    if(radius > 100 || scale > 1000){
        radius = 100;
        scale = 1000
    }
    var xoffset = (radius-cx)*scale;
    var yoffset = (radius-cy)*scale;
    var img = v.modules.createCanvas(radius * 2 * scale,radius * 2 * scale) //find something to make canvas
    var ctx = img.getContext("2d") // get canvas context 
    ctx.font = scale + "px Serif";
    var px = 0;
    var py = 0;
    for(var y = cy-radius; y < cy+radius;y++){
        for(var x = cx-radius; x < cx+radius;x++){
            if(!v.fn.map.oob(x,y)){
                ctx.fillStyle = "#000000"
                ctx.fillRect((x * scale)+xoffset, (y*scale)+yoffset, scale, scale);
                continue;
            }else{
                if(map[x][y] == null){
                    ctx.fillStyle = "#000000"
                    ctx.fillRect((x-radius) * scale, (y-radius)*scale, scale, scale);
                    continue;
                }
                var e = v.fn.map.seaHeight(map[x][y].elevation);
                if(e <= 0){
                    ctx.fillStyle = "rgb(10,10,200)"
                }else if(e <= v.d.settings.shoreHeight){
                    var temp = 230 - (e*10)
                    temp = Math.round(temp);
                    ctx.fillStyle = "rgb("+(temp)+","+(temp)+","+(182)+")"
                }else if(e <= v.d.settings.mountainHeight){
                    var temp = 150-(e*20)
                    temp = Math.round(temp);
                    ctx.fillStyle = "rgb("+(60)+","+(temp+00)+","+(30)+")"
                }else{
                    var temp = ((e-6)*20)+100
                    temp = Math.round(temp);
                    ctx.fillStyle = "rgb("+(temp)+","+(temp)+","+(temp)+")"
                }
                 
                ctx.fillRect((x * scale)+xoffset, (y*scale)+yoffset, scale, scale);
            }
            
            px++;
        }
        px = 0;
        py++;
    }
    ctx.fillStyle = "#000000";
    for(var k in v.d.people){
        //console.log(v.d.people[k]);
        //ctx.fillRect(v.d.people[k].x * scale, v.d.people[k].y * scale, scale, scale);
        if(v.fn.map.oob(v.d.people[k].x,v.d.people[k].y))
            ctx.fillRect(Math.floor(((v.d.people[k].x+Math.random())) * scale)+xoffset, Math.floor(((v.d.people[k].y+Math.random())) * scale)+yoffset, scale/10, scale/10);
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
                avatar = await download_image(v.d.people[k].avatarURL)
            }
            catch(e) {
                avatar = v.c.person
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
    return img.createPNGStream();//("image/png",{ compressionLevel: 3, filters: img.PNG_FILTER_NONE });
}