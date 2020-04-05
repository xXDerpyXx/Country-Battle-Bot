var v = require.main.require('./vars.js');

module.exports = new v.c.cmd.Command(
    (args, msg) => {
        if (v.d.settings.hasOwnProperty(args.setting)) {
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
                case 'boolean':
                    switch (args.newValue.toLowerCase()) {
                    case 'true':
                        v.d.settings[args.setting] = true;
                        break;
                    case 'false':
                        v.d.settings[args.setting] = false;
                        break;
                    default:
                        return 'This is a boolean setting. You must provide "true" or "false".'
                    }
                    break;
                default:
                    return typeof(v.d.settings[args.setting])+' type settings can not be changed';
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

                    required: true,
                    maxLength: 22,
                }
            ),
            new v.c.cmd.Argument(
                'newValue',
                {
                    description: 'What to change the setting to.',
                    
                    required: true,
                }
            ),
        ],
    }
);
