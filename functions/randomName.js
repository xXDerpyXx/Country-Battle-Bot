module.exports = function randomName(c) {
    var v = require.main.require('./vars.js');
    
    var vowels = c.vowels;
    var output = "";
    var type = "c";
    if(Math.random() > 0.5) { // 5/10 of the time,
        type = "v";
    }
    var letter = v.fn.pickLetter(type,c);
    if(c.capitalization == "start" || (c.capitalization == "random" && Math.random() >0.5)|| c.capitalization == "all"){
        letter = letter.toUpperCase();
    }
    
    for(var i = 0; i < (Math.random()*20)+1; i++) {
        if(vowels.includes(letter)) {
            type = "v";
        } else {
            type = "c";
        }
        output = output+letter;
        letter = v.fn.pickLetter(type,c);
        if((c.capitalization == "random" && Math.random() >0.5) || c.capitalization == "all"){
            letter = letter.toUpperCase();
        }
    }
    return output;
}