module.exports = function pickLetter(type,c) {
    var constanants = c.constanants;
    var vowels = c.vowels;
    if(type == "v") {
        if(Math.random() > 0.5) {
            return vowels[Math.floor(Math.random*vowels.length)]
        } else {
            return constanants[Math.floor(Math.random*constanants.length)]
        }
    } else {
        if(Math.random() > 0.8) {
            return vowels[Math.floor(Math.random*vowels.length)]
        } else {
            return constanants[Math.floor(Math.random*constanants.length)]
        }
    }
}