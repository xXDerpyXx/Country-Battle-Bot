module.exports = function personUpdate(id){
    var v = require.main.require('./vars.js');

    //Generate a random distance that the person will move from (-1, -1) to (1, 1)
    var x = Math.round((Math.random()*2)-1);
    var y = Math.round((Math.random()*2)-1);

    if(v.fn.map.oob(v.d.people[id].x+x,v.d.people[id].y+y)){ //If the location they're going to move to is within the boundaries of the map
        if(v.d.map[v.d.people[id].x+x][v.d.people[id].y+y].elevation > v.d.mapInfo.seaLevel){ //If the location the person is trying to move to is on land (and therefore not in the ocean)
            //move the person to the generated location
            v.d.people[id].x += x;
            v.d.people[id].y += y;
        }
        
    }
}

