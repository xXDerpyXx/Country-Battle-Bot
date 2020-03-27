var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        return Object.keys(v.d.people).length;
    }
);