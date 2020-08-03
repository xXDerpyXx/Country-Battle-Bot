module.exports = function updateAllPeople() {
    var v = require.main.require('./vars.js');

    if (!v.d.settings.paused) {
        for(var k in v.d.people){
            v.fn.people.update(k);
        }
    }
}