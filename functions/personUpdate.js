module.exports = function personUpdate(id){
    var v = require.main.require('./vars.js');

    var x = Math.round((Math.random()*2)-1);
    var y = Math.round((Math.random()*2)-1);
    if(v.fn.map.oob(v.d.people[id].x+x,v.d.people[id].y+y)){
        if(v.d.map[v.d.people[id].x+x][v.d.people[id].y+y].elevation > v.d.mapInfo.seaLevel){
            v.d.people[id].x += x;
            v.d.people[id].y += y;
        }
        
    }
}

