module.exports = function save() {
    var v = require.main.require('./vars.js');
    
    const p = process.cwd() + '/data/';
    v.modules.fs.writeFileSync(p+"countries.json",JSON.stringify(v.d.countries),'utf8');
    v.modules.fs.writeFileSync(p+"map.json",JSON.stringify(v.d.map),'utf8');
    v.modules.fs.writeFileSync(p+"settings.json",JSON.stringify(v.d.settings),'utf8');
    v.modules.fs.writeFileSync(p+"worldData.json",JSON.stringify(v.d.worldData),'utf8');
    v.modules.fs.writeFileSync(p+"people.json",JSON.stringify(v.d.people),'utf8');
}