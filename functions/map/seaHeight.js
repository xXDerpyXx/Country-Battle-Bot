module.exports = function seaHeight(e){
    var v = require.main.require('./vars.js');
    
    return e-v.d.settings.seaLevel;
}