const defaultOptions = {
    'description': 'This argument doesn\'t currently have a description.',
    'type': 'string', //type can be string, int, float,
    'required': true,
    'default': null, //only use this if options.required is false - sets the argument to this if no data is provided

    //if type is string use these
    'minLength': 1,
    'maxLength': 16,

    //if type is int or float use these
    'min': null,
    'max': null
}

module.exports = class Argument {
    constructor(name, options={}) {
        this.name = name;
        this.options = Object.assign({}, defaultOptions, options);
    }

    parse(arg) {
        let argName = this.argName();
        var err = (err) => {
            return {err: `${argName} ${err}`}
        }
        switch(this.options.type) {
            case 'string':
                if (arg.length < this.options.minLength) return err(`must be at least ${this.options.minLength} characters long.`);
                if (arg.length > this.options.maxLength) return err(`must be at most ${this.options.maxLength} characters long.`);
                break;

            case 'int': //fallthrough to float
            case 'float':
                arg = (Number(arg));
                if (!isNaN(arg)) {
                    if (this.options.type == 'int' && !Number.isInteger(arg)) return err('must be an integer.');
                    if (this.options.min && arg < this.options.min) return err(`must be at least ${this.options.min}.`);
                    if (this.options.max && arg > this.options.max) return err(`must be at most ${this.options.max}.`);
                } else return err('must be a number.');
                break;
        }
        return arg;
    }

    argName() {
        return `The argument \`${this.name}\``;
    }
}