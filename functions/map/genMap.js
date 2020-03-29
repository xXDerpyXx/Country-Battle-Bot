module.exports = function genMap(seed){
    var v = require.main.require('./vars.js');
    let rand = v.modules.rs(seed);
    
    v.d.people = Object();
    v.d.map = Array();
    for(var x = 0; x < v.d.settings.width; x++){
        v.d.map[x] = Array();
        for(var y = 0; y < v.d.settings.height; y++){
            v.d.map[x][y] = new v.c.Tile(x,y);
            v.d.map[x][y].elevation = Math.round(v.d.settings.seaLevel+((rand.random()*v.d.settings.variation)-v.d.settings.baseHeight));
        }
    }
    /*
    for(var i = 0; i < v.d.settings.islands; i++){
        var a = Math.floor(rand.random()*v.d.settings.width);
        var b = Math.floor(rand.random()*v.d.settings.height);
        console.log(a+","+b)
        if(v.fn.map.oob(a,b)){
            console.log("island made "+v.d.settings.islandSize);
            v.d.map[a][b].elevation = v.d.settings.islandSize
        }
    }*/
    for(let k = 0; k < v.d.settings.smoothness; k++){
        let tempMap = v.d.map;
        for(let x = 0; x < v.d.settings.width; x++){
            for(let y = 0; y < v.d.settings.height; y++){
                let total = 0;
                let count = 0;
                
                for(let ix = x-1; ix < x+2; ix++){
                    for(let iy = y-1; iy < y+2; iy++){
                        let tx = ix%v.d.settings.width;
                        let ty = iy%v.d.settings.height;
                        if(v.fn.map.oob(tx,ty)){
                            count++;
                            total += v.d.map[tx][ty].elevation;
                        }
                    }
                }
                tempMap[x][y].elevation = total/count;
                tempMap[x][y].elevation += (rand.random()*v.d.settings.wackyness)-(v.d.settings.wackyness/2);
            }
        }
        v.d.map = tempMap;
    }
    for(let x = 0; x < v.d.settings.width; x++){
        for(let y = 0; y < v.d.settings.height; y++){
            //v.d.map[x][y].elevation = Math.round(v.d.map[x][y].elevation)
            if(v.fn.map.seaHeight(v.d.map[x][y].elevation) > 0){
                //console.log(v.fn.map.seaHeight(v.d.map[x][y].elevation))
                let id = v.fn.uuid(v.d.people);
                v.d.people[id] = new v.c.Person(id,x,y,v.fn.randomProperty(v.d.worldData.cultures));
            }
        }
    }
}