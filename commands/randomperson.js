var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        var p = v.fn.randomProperty(v.d.people);
        if(p == undefined || p.id == undefined){
            return 'No person found';
        }
        return v.fn.people.describePerson(p.id);
    },

    {
        description: 'Gives you the information of a random person.',
    }
);