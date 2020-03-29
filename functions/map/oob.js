module.exports = function oob(x,y){
    var v = require.main.require('./vars.js');
    
    return (x >= 0 && x < v.d.mapInfo.width && y >= 0 && y < v.d.mapInfo.height);
}