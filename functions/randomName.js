module.exports = function randomName(c, rand = Math) {
    var v = require.main.require('./vars.js');
    
    var vowels = c.lang.vowels;
    var output = "";
    var type = "c";
    if(rand.random() > 0.5) { // 5/10 of the time,
        type = "v";
    }

    //Generate a random first letter and capitalise it based on the language's naming rules
    var letter = v.fn.pickLetter(type, c, rand);
    if(c.lang.capitalization == "start" || (c.capitalization == "random" && rand.random() >0.5)|| c.lang.capitalization == "all"){
        letter = letter.toUpperCase();
    }
    
    for(var i = 0; i < (rand.random()*20)+1; i++) {
        if(vowels.includes(letter)) {
            type = "v";
        } else {
            type = "c";
        }
        output = output+letter;
        letter = v.fn.pickLetter(type, c, rand);
        if((c.lang.capitalization == "random" && rand.random() >0.5) || c.lang.capitalization == "all"){
            letter = letter.toUpperCase();
        }
    }
    return output;
}