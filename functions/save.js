module.exports = function save() {
    var v = require.main.require('./vars.js');

    for (i in v.d) {
        v.modules.fs.writeFileSync(`${process.cwd()}/data/${i}.json`,JSON.stringify(v.d[i]),'utf8');
    }
}