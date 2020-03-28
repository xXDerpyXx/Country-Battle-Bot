var cultures = {
    retard: {
        vowels:["a","e","u"],
        consonants:["r","t","d","h"],
        capitalization:"random",
    },

    cabrikk: {
        vowels:["ā","ē","ī","ō","ū"],
        consonants:["ḃ", "ċ", "ḋ",  "ḳ", "ŀ", "ṅ", "ṗ", "ṛ"],
        capitalization:"start",
    },

    furry: {
        vowels:["u","o"],
        consonants:["w","x","3","n"],
        capitalization:"start",
    },

    IRS: {
        vowels:["r","u"],
        consonants:["b","r"],
        capitalization:"none",
    },

    morse: {
        vowels:["·"," "],
        consonants:["-"],
        capitalization:"none",
    },

    angery: {
        vowels:["e","a"],
        consonants:["g","h","!"],
        capitalization:"all",
    },

    gamer: {
        vowels:["gamer","weed"],
        consonants:["xx","420","epic","s3x","god","69"],
        capitalization:"random",
    },

    /*  UNFUNNY
    gay: {
        vowels:["a","y"],
        consonants:["g"],
        capitalization:"start",
    },
    */
};

for (let i in cultures) {
    cultures[i].name = i;
}

module.exports = cultures;