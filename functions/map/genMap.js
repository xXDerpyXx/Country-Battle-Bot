module.exports = function genMap(seed){
    var v = require.main.require('./vars.js');
    let rand = v.modules.rs(seed);
    
    v.d.mapInfo = {
        seed: seed,
    };
    for (i of ['width', 'height', 'seaLevel', 'baseHeight', 'variation', 'smoothness', 'wackyness', 'shoreHeight', 'mountainHeight', 'genocide']) {
        v.d.mapInfo[i] = v.d.settings[i];
    }
    
    v.d.people = Object();
    v.d.map = Array();
    for(var x = 0; x < v.d.mapInfo.width; x++){
        v.d.map[x] = Array();
        for(var y = 0; y < v.d.mapInfo.height; y++){
            v.d.map[x][y] = new v.c.Tile(x,y);
            v.d.map[x][y].elevation = Math.round(v.d.mapInfo.seaLevel+((rand.random()*v.d.mapInfo.variation)-v.d.mapInfo.baseHeight));
        }
    }
    /*
    for(var i = 0; i < v.d.mapInfo.islands; i++){
        var a = Math.floor(rand.random()*v.d.mapInfo.width);
        var b = Math.floor(rand.random()*v.d.mapInfo.height);
        console.log(a+","+b)
        if(v.fn.map.oob(a,b)){
            console.log("island made "+v.d.mapInfo.islandSize);
            v.d.map[a][b].elevation = v.d.mapInfo.islandSize
        }
    }*/
    for(let k = 0; k < v.d.mapInfo.smoothness; k++){
        let tempMap = v.d.map;
        for(let x = 0; x < v.d.mapInfo.width; x++){
            for(let y = 0; y < v.d.mapInfo.height; y++){
                let total = 0;
                let count = 0;
                
                for(let ix = x-1; ix < x+2; ix++){
                    for(let iy = y-1; iy < y+2; iy++){
                        let tx = ix%v.d.mapInfo.width;
                        let ty = iy%v.d.mapInfo.height;
                        if(v.fn.map.oob(tx,ty)){
                            count++;
                            total += v.d.map[tx][ty].elevation;
                        }
                    }
                }
                tempMap[x][y].elevation = total/count;
                tempMap[x][y].elevation += (rand.random()*v.d.mapInfo.wackyness)-(v.d.mapInfo.wackyness/2);
            }
        }
        v.d.map = tempMap;
    }
    for(let x = 0; x < v.d.mapInfo.width; x++){
        for(let y = 0; y < v.d.mapInfo.height; y++){
            //v.d.map[x][y].elevation = Math.round(v.d.map[x][y].elevation)
            if(v.fn.map.seaHeight(v.d.map[x][y].elevation) > 0){
                //console.log(v.fn.map.seaHeight(v.d.map[x][y].elevation))
                let id = v.fn.uuid(v.d.people);
                v.d.people[id] = new v.c.Person(id,x,y,v.fn.randomProperty(v.d.worldData.cultures));
            }
        }
    }
}