module.exports = function randomName(c) {
    var v = require.main.require('./vars.js');
    
    var vowels = c.vowels;
    var output = "";
    var type = "c";
    if(Math.random() > 0.5) {
        type = "v"
    }
    var letter = v.fn.pickLetter(type,c);
    for(var i = 0; i < (Math.random()*20)+1; i++) {
        if(vowels.includes(letter)) {
            type = "v"
        } else {
            type = "c"
        }
        output = output+""+letter;
        letter = v.fn.pickLetter(type,c);
    }
    return output;
}