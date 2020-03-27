module.exports = function oob(x,y){
    var v = require.main.require('./vars.js');
    
    return (x >= 0 && x < v.d.settings.width && y >= 0 && y < v.d.settings.height);
}