function correct(n, max) {
    while (true) {
        console.log(n, max)
        if (n < 0)
            n = max + n;
        else if (n >= max)
            n = n - max;
        else
            return n;
    }
}

module.exports = function wrap(x,y){
    var v = require.main.require('./vars.js');

    return {
        x: correct(x, v.d.mapInfo.width),
        y: correct(y, v.d.mapInfo.height)
    };
}