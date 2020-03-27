const Discord = require("discord.js");
const fs = require("fs");
var c = require("canvas");
const client = new Discord.Client();

var maputils = require("./maputils.js");
var countries = require("./data/countries.json");
var map = require ("./data/map.json");
var settings = require("./settings.json")
var worldData = null;
var people = require("./data/people.json");
var person = require("./person.js");
try{
    worldData = require("./data/worldData.json");
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

class tile {
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
    var output = String();
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
    fs.writeFileSync("./data/countries.json",JSON.stringify(countries),'utf8');
    fs.writeFileSync("./data/map.json",JSON.stringify(map),'utf8');
    fs.writeFileSync("./settings.json",JSON.stringify(settings),'utf8');
    fs.writeFileSync("./data/worldData.json",JSON.stringify(worldData),'utf8');
    fs.writeFileSync("./data/people.json",JSON.stringify(people),'utf8');
}

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

class msgCommand {
    constructor(fn, adminOnly=false) {
        this.fn = fn;
        this.adminOnly = adminOnly;
    }
}

const commands = {
    'settings': new msgCommand(
        (args, msg) => {
            let output = String();
            for (let k in settings) {
                output += `${k}: ${settings[k]}\n`;
            }
            return `\`${output}\``;
        },
        true
    ),
    'set': new msgCommand(
        (args, msg) => {
            if (args.length == 2) {
                if (settings[args[0]]) {
                    if (typeof(settings[args[0]]) == "number"){
                        settings[args[0]] = parseFloat(args[1]);
                    } else if (typeof(settings[args[0]]) == "string"){
                        settings[args[0]] = args[1];
                    }
                    return 'Setting changed!';
                } else return 'That isn\'t a valid setting.';
            } else return 'Wrong amount of arguments provided.';
        },
        true
    ),
    'genmap': new msgCommand(
        (args, msg) => {
            genMap();
            return 'Map made.';
        },
        true
    ),
    'map': new msgCommand(
        (args, msg) => {
            let temp = null;
            let wideness = 50
            if(!args[2]){
                wideness = parseInt(args[2])
            }
            let pixelcount = 1000
            let tilescale = pixelcount/wideness
            
            if(!args[0]){
                temp = imgmap(Math.round(settings.width/2),Math.round(settings.height/2),tilescale,wideness,map);
            }else{
                temp = imgmap(Math.round(parseInt(args[0])),Math.round(parseInt(args[1])),tilescale,wideness,map);
            }
            return new Discord.MessageAttachment(temp, "image.png");
        }
    ),
    'randomperson': new msgCommand(
        (args, msg) => {
            var output = String();
            var p = randomProperty(people);
            for(let k in p){
                output += `   ${k}: ${p[k]}\n`;
            }
            return `${p.id}:\n${output}`;
        }
    ),
    'cultures': new msgCommand(
        (args, msg) => {
            var output = String();
            for(var c in worldData.cultures){
                output +=`${c}\n`
                for(var k in worldData.cultures[c]){
                    output += `${k}: ${worldData.cultures[c][k]}\n`;
                }
            }
            
            return output;
        }
    ),
    'personcount': new msgCommand(
        (args, msg) => {
            return Object.keys(people).length;
        }
    ),
    'inbound': new msgCommand(
        (args, msg) => {
            return oob(parseInt(content[1]),parseInt(content[2]));
        }
    )
}

client.on('message', msg => {
    if(msg.content.startsWith(settings.prefix)) { //if the message is a command
        let content = msg.content.slice(settings.prefix.length); //remove the command prefix from the message
        let args = content.split(' '); //split the message into an array of each word
        let command = args.shift(); //take the first of those words as the command

        if (commands[command]) { //if the command called exists,
            command = commands[command];
            msg.channel.send((() => {
                if (command.adminOnly && !settings.admins.includes(msg.author.id)) { //if the command is an admin only command but the user isn't an admin
                    return 'Only admins can use that command.'; //tell off the user
                }
                let output = command.fn(args, msg); //run the function of the command
                save(); //save any changes that were made
                return output; //send the message returned by the command's function
            })());
        }
    }
});

function main() {
    client.login(require("./token.js"));
}

main();