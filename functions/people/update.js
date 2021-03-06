module.exports = function personUpdate(id){
    var v = require.main.require('./vars.js');

    //Generate a random distance that the person will move from (-1, -1) to (1, 1)
    var rx = Math.round((Math.random()*2)-1);
    var ry = Math.round((Math.random()*2)-1);

    var myx = v.d.people[id].x;
    var myy = v.d.people[id].y;

    var localTiles = [];
    var here = v.d.map[myx][myy];

    for(var x = myx-1; x < myx+2; x++){
        for(var y = myy-1; y < myy+2; y++){
            let loc = v.fn.map.wrap(x, y);
            var temp = v.d.map[loc.x][loc.y];
            temp.priority = 0;
            if(temp.elevation > v.d.mapInfo.seaLevel){ //this may change when boats exist
                localTiles.push(temp);
            }
        }
    }

    var variance = 5;

    for(var i = 0; i < localTiles.length;i++){
        if(localTiles[i].elevation < here.elevation){
            localTiles[i].priority += here.elevation - localTiles[i].elevation; 
        }

        localTiles[i].priority += (Math.random()*variance)-(variance/2);
    }
    for(var i = 0; i < localTiles.length;i++){
        for(var j = 0; j < localTiles.length-1;j++){
            if(localTiles[j].priority < localTiles[j+1].priority){
                temp = localTiles[j];
                localTiles[j] = localTiles[j+1];
                localTiles[j+1] = temp;
            }
        }
    }

    var t = 0
    
    if(Math.random() > 0.5){
        t = 1;
        if(Math.random() > 0.5){
            t = 2;
        }
    }
    if(localTiles.length > t){
        rx = localTiles[t].x-myx;
        ry = localTiles[t].y-myy;
    }

    let movingTo = v.fn.map.wrap(myx+rx, myy+ry); //correct out of bounds coordinates

    if(v.d.map[movingTo.x][movingTo.y].elevation > v.d.mapInfo.seaLevel){ //If the location the person is trying to move to is on land (and therefore not in the ocean)
        //move the person to the generated location
        v.d.people[id].x = movingTo.x;
        v.d.people[id].y = movingTo.y;
    }
}

