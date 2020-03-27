var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        return v.fn.map.oob(parseInt(content[1]),parseInt(content[2]));
    }
);