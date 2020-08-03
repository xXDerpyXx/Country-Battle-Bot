module.exports = function generate(seed){
    var v = require.main.require('./vars.js');
    
    let rand = v.modules.rs(seed);
    
    v.d.mapInfo = {
        seed: seed,
    };

    v.fn.map.genMap(rand);
}