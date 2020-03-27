module.exports = function pickLetter(type,c) {
    var consonants = c.consonants;
    var vowels = c.vowels;
    if(type == "v") {
        if(Math.random() > 0.9) {
            return vowels[Math.floor(Math.random()*vowels.length)]
        } else {
            return consonants[Math.floor(Math.random()*consonants.length)]
        }
    } else {
        if(Math.random() > 0.5) {
            return vowels[Math.floor(Math.random()*vowels.length)]
        } else {
            return consonants[Math.floor(Math.random()*consonants.length)]
        }
    }
}