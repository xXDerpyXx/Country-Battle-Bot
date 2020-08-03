module.exports = function pickLetter(type,c, rand = Math) {
    var consonants = c.lang.consonants;
    var vowels = c.lang.vowels;
    if(type == "v") {
        if(rand.random() > 0.9) { //one tenth of the time, return a vowel
            return vowels[Math.floor(rand.random()*vowels.length)];
        } else { //nine tenths of the time, return a consonant
            return consonants[Math.floor(rand.random()*consonants.length)];
        }
    } else {
        if(rand.random() > 0.5) { //half of the time, return a vowel
            return vowels[Math.floor(rand.random()*vowels.length)];
        } else { //half of the time, return a consonant
            return consonants[Math.floor(rand.random()*consonants.length)];
        }
    }
}