var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        if (v.d.settings[args.setting]) {
            switch (typeof(v.d.settings[args.setting])) {
                case 'number':
                    let num = parseFloat(args.newValue);
                    if (isNaN(num)) {
                        return 'This setting must be changed to a number.';
                    } else {
                        v.d.settings[args.setting] = parseFloat(args.newValue);
                    }
                    break;
                case 'string':
                    v.d.settings[args.setting] = args.newValue;
                    break;
            }
            return 'Setting changed!';
        } else return 'That isn\'t a valid setting.';
    },
    
    {
        description: 'Changes a setting.',

        adminOnly: true,
        args: [
            new v.c.cmd.Argument(
                'setting',
                {
                    description: 'The name of the setting to change.',

                    required: true
                }
            ),
            new v.c.cmd.Argument(
                'newValue',
                {
                    description: 'What to change the setting to.',
                    
                    required: true
                }
            )
        ]
    }
);