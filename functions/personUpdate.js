module.exports = function personUpdate(id){
    var v = require.main.require('./vars.js');

    //Generate a random distance that the person will move from (-1, -1) to (1, 1)
    var rx = Math.round((Math.random()*2)-1);
    var ry = Math.round((Math.random()*2)-1);

    var myx = v.d.people[id].x
    var myy = v.d.people[id].y

    var localTiles = [];
    var here = v.d.map[v.d.people[id].x][v.d.people[id].y]

    for(var x = myx-1; x < myx+1; x++){
        for(var y = myy-1; x < myy+1; y++){
            if(v.fn.map.oob(x,y)){
                localTiles.push(v.d.map[x][y]);
            }
        }
    }

    if(v.fn.map.oob(myx+rx,myy+ry)){ //If the location they're going to move to is within the boundaries of the map
        if(v.d.map[myx+rx][myy+ry].elevation > v.d.mapInfo.seaLevel){ //If the location the person is trying to move to is on land (and therefore not in the ocean)
            //move the person to the generated location
            v.d.people[id].x += rx;
            v.d.people[id].y += ry;
        }
        
    }
}

