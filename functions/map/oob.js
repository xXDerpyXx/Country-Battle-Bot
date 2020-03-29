module.exports = function oob(x,y){
    var v = require.main.require('./vars.js');
    if(v.d.map[0] == null){
        return false;
    }
    return (x >= 0 && x < v.d.map.length && y >= 0 && y < v.d.map[0].length);
}