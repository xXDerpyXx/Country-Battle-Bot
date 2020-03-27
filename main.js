var token = require("./token.js");//"MzU1NDI2OTc2NzAzNzA5MTk1.XTNrNw.IPNYzM41oeaygn7_QZMCKBIMUPE";
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

var maputils = require("./maputils.js");
var countries = require("./countries.json");
var map = require ("./map.json");
var settings = require("./settings.json")
var worldData = null;
var people = require("./people.json");
var person = require("./person.js");
try{
    worldData = require("./worldData.json");
}catch(err){

}

if(worldData == null){
    worldData = {
        cultures:{},
    }
}

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

const {createCanvas} = require("canvas");
var c = require("canvas");

worldData.cultures["gay"] = {
    vowels:["a","y"],
    constanants:["g"],
    name:"gay"
}

function imgmap(cx,cy, scale, radius, map){
    if(radius > 100 || scale > 1000){
        radius = 100;
        scale = 1000
    }
    var xoffset = (radius-cx)*scale;
    var yoffset = (radius-cy)*scale;
    var img = createCanvas(radius * 2 * scale,radius * 2 * scale) //find something to make canvas
    var ctx = img.getContext("2d") // get canvas context 
    ctx.font = scale + "px Serif";
    var px = 0;
    var py = 0;
    for(var y = cy-radius; y < cy+radius;y++){
        for(var x = cx-radius; x < cx+radius;x++){
            if(!oob(x,y)){
                ctx.fillStyle = "#000000"
                ctx.fillRect((x * scale)+xoffset, (y*scale)+yoffset, scale, scale);
                continue;
            }else{
                if(map[x][y] == null){
                    ctx.fillStyle = "#000000"
                    ctx.fillRect((x-radius) * scale, (y-radius)*scale, scale, scale);
                    continue;
                }
                var e = seaHeight(map[x][y].elevation);
                if(e <= 0){
                    ctx.fillStyle = "rgb(10,10,200)"
                }else if(e <= settings.shoreHeight){
                    var temp = 230 - (e*10)
                    temp = Math.round(temp);
                    ctx.fillStyle = "rgb("+(temp)+","+(temp)+","+(182)+")"
                }else if(e <= settings.mountainHeight){
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
    for(var k in people){
        //console.log(people[k]);
        //ctx.fillRect(people[k].x * scale, people[k].y * scale, scale, scale);
        if(oob(people[k].x,people[k].y))
            ctx.fillRect(Math.floor(((people[k].x+Math.random())) * scale)+xoffset, Math.floor(((people[k].y+Math.random())) * scale)+yoffset, scale/10, scale/10);
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
class tile{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.elevation = 10;
        this.building = null;
    }
}

function uuid(obj){
    while(true){
        var id = Math.floor(Math.random()*100000000)
        if(obj[id] == null){
            return id;
        }
    }
}

function genMap(){
    people = {};
    map = [];
    for(var x = 0; x < settings.width; x++){
        map[x] = [];
        for(var y = 0; y < settings.height; y++){
            map[x][y] = new tile(x,y);
            map[x][y].elevation = Math.round(settings.seaLevel+((Math.random()*settings.variation)-settings.baseHeight))
        }
    }
    /*
    for(var i = 0; i < settings.islands; i++){
        var a = Math.floor(Math.random()*settings.width);
        var b = Math.floor(Math.random()*settings.height);
        console.log(a+","+b)
        if(oob(a,b)){
            console.log("island made "+settings.islandSize);
            map[a][b].elevation = settings.islandSize
        }
    }*/
    for(var k = 0; k < settings.smoothness; k++){
        var tempMap = map;
        for(var x = 0; x < settings.width; x++){
            for(var y = 0; y < settings.height; y++){
                var total = 0;
                var count = 0;
                
                for(var ix = x-1; ix < x+2; ix++){
                    for(var iy = y-1; iy < y+2; iy++){
                        var tx = ix%settings.width;
                        var ty = iy%settings.height;
                        if(oob(tx,ty)){
                            count++;
                            total += map[tx][ty].elevation;
                        }
                    }
                }
                tempMap[x][y].elevation = total/count;
                tempMap[x][y].elevation += (Math.random()*settings.wackyness)-(settings.wackyness/2)
            }
        }
        map = tempMap;
    }
    for(var x = 0; x < settings.width; x++){
        for(var y = 0; y < settings.height; y++){
            //map[x][y].elevation = Math.round(map[x][y].elevation)
            if(seaHeight(map[x][y].elevation) > 0){
                //console.log(seaHeight(map[x][y].elevation))
                var id = uuid(people);
                people[id] = new person(id,x,y,randomProperty(worldData.cultures));
            }
        }
    }
}

function oob(x,y){
    return (x >= 0 && x < settings.width && y >= 0 && y < settings.height);
}

function seaHeight(e){
    return e-settings.seaLevel;
}

function asciiMap(xq,yq,size){
    var output = "";
    for(var x = xq-size; x < xq+size; x++){
        for(var y = yq-size; y < yq+size; y++){
            if(oob(x,y)){
                var s = seaHeight(map[x][y].elevation);
                if(s <= 0){
                    output +="~"
                }else if(s <= 1){
                    output +="."
                }else if(s <= 3){
                    output +=","
                }else if(s <= 6){
                    output +="-"
                }else{
                    output +="^"
                }
               //output += seaHeight(map[x][y].elevation);
            }else{
                output +=" "
            }
        }
        output += "\n"
    }
    return output;
}

function save(){
    fs.writeFileSync("./countries.json",JSON.stringify(countries),'utf8');
    fs.writeFileSync("./map.json",JSON.stringify(map),'utf8');
    fs.writeFileSync("./settings.json",JSON.stringify(settings),'utf8');
    fs.writeFileSync("./worldData.json",JSON.stringify(worldData),'utf8');
    fs.writeFileSync("./people.json",JSON.stringify(people),'utf8');

}

save();

var prefix = settings.prefix;
console.log(settings.admins)

function personUpdate(id){
    var x = Math.round((Math.random()*2)-1)
    var y = Math.round((Math.random()*2)-1)
    if(oob(people[id].x+x,people[id].y+y)){
        if(map[people[id].x+x][people[id].y+y].elevation > settings.seaLevel){
            people[id].x += x;
            people[id].y += y;
        }
        
    }
}

setInterval(function(){
    for(var k in people){
        personUpdate(k);
    }
},1000)

client.on('message', msg => {
    content = msg.content.split(" ");
    console.log(msg.author.id);
    if(settings.admins.includes(msg.author.id)){
        if(content[0] == prefix+"settings"){
            var output = "`";
            for(var k in settings){
                output += k+": "+settings[k]+"\n";
            }
            msg.channel.send(output+"`");
        }
        if(content[0] == prefix+"set"){
            if(content[1] != null && content[2] != null){
                if(settings[content[1]] != null){
                    if(typeof(settings[content[1]]) == "number"){
                        settings[content[1]] = parseFloat(content[2])
                    }

                    if(typeof(settings[content[1]]) == "string"){
                        settings[content[1]] = content[2]
                    }
                    msg.channel.send("setting changed!");
                }
            }
        }
        if(content[0] == prefix+"genmap"){
            genMap();
            msg.channel.send("map made");
        }
    }
    if(content[0] == prefix+"map"){
        var temp = null;
        var wideness = 50
        if(content[3] != null){
            wideness = parseInt(content[3])
        }
        var pixelcount = 1000
        var tilescale = pixelcount/wideness
        
        if(content[1] == null){
            temp = imgmap(Math.round(settings.width/2),Math.round(settings.height/2),tilescale,wideness,map);
        }else{
            temp = imgmap(Math.round(parseInt(content[1])),Math.round(parseInt(content[2])),tilescale,wideness,map);
        }
        msg.channel.send(new Discord.Attachment(temp, "image.png"));
    }

    if(content[0] == prefix+"randomperson"){
        var output = "";
        var p = randomProperty(people);
        for(var k in p){
            output += "   "+k+": "+p[k]+"\n"
        }
        msg.channel.send(p.id+":\n"+output);
    }

    if(content[0] == prefix+"cultures"){
        var output = "";
        for(var c in worldData.cultures){
            output +=c+"\n"
            for(var k in worldData.cultures[c]){
                output += k+": "+worldData.cultures[c][k]+"\n"
            }
        }
        
        msg.channel.send(output);
    }

    if(content[0] == prefix+"personcount"){
        msg.channel.send(Object.keys(people).length);
    }
    
    if(content[0] == prefix+"inbound"){
        msg.channel.send(oob(parseInt(content[1]),parseInt(content[2])))
    }
    save();
});
client.login(token);
