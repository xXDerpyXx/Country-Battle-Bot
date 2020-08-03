module.exports = function describePerson(id) {
    var v = require.main.require('./vars.js');
    let output = String();
    let p = v.d.people[id];
    for(let k in p){
        output += `   ${k}: ${(typeof p[k] == 'object' && !Array.isArray(p[k]) ? JSON.stringify(p[k]) : p[k])}\n`;
    }
    return `${p.id}:\n${output}`;
};