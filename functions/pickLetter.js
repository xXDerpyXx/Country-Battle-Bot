module.exports = function pickLetter(type,c) {
    var consonants = c.consonants;
    var vowels = c.vowels;
    if(type == "v") {
        if(Math.random() > 0.9) { //one tenth of the time, return a vowel
            return vowels[Math.floor(Math.random()*vowels.length)];
        } else { //nine tenths of the time, return a consonant
            return consonants[Math.floor(Math.random()*consonants.length)];
        }
    } else {
        if(Math.random() > 0.5) { //half of the time, return a vowel
            return vowels[Math.floor(Math.random()*vowels.length)];
        } else { //half of the time, return a consonant
            return consonants[Math.floor(Math.random()*consonants.length)];
        }
    }
}