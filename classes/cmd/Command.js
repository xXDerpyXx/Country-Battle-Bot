const defaultOptions = {
    'adminOnly': false,
    'description': 'This command doesn\'t currently have a description.',
    'args': Array(),
}

module.exports = class Command {
    constructor(fn, options={}) {
        this.fn = fn;
        this.options = Object.assign({}, defaultOptions, options);
    }

    parseArgs(args) {
        if (args.length <= this.options.args.length) { //As long as there isn't more arguments than there should be
            let parsedArgs = Object();
            for (let i = 0; i < this.options.args.length; i++) {
                let arg = this.options.args[i];
                if (args[i] != null) {
                    let parsedArg = arg.parse(args[i]);
                    if (typeof parsedArg == 'object' && parsedArg.hasOwnProperty('err')) {
                        return parsedArg.err;
                    } else {
                        parsedArgs[arg.name] = parsedArg;
                    }
                } else if (arg.options.required) return `${arg.argName()} must be provided.`;
                else if (arg.options.default) parsedArgs[arg.name] = arg.options.default;
                else parsedArgs[arg.name] = null;
            }
            return parsedArgs;
        } else return 'You\'ve provided too many arguments.';
    }
}