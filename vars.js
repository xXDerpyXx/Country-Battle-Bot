const requireDir = require('require-dir');
const fs = require('fs');
const {createCanvas} = require("canvas");
const discord = require('discord.js');
var client = new discord.Client();
client.login(require("./token.js"));

const c = requireDir('./classes', {recurse: true});
const fn = requireDir('./functions', {recurse: true});
const consts = requireDir('./consts', {recurse: true});

if (!fs.existsSync(`${process.cwd()}/data`)) fs.mkdirSync('data'); //If the data folder doesn't exist (it won't upon new clone because the directory is empty), create it
for (i in consts.defaultFiles) {
    let path = `${process.cwd()}/data/${i}`;
    if (!fs.existsSync(path)) { //If a data file doesn't exist,
        fs.writeFileSync(path, JSON.stringify(consts.defaultFiles[i]), 'utf8'); //create it with the default value
    }
}

var d = requireDir('./data', {recurse: true});

module.exports = {
    c: c,
    d: d,
    fn: fn,
    consts: consts,
    modules: {
        discord: discord,
        fs: fs,
        requireDir: requireDir,
        canvas: require('canvas'),
        createCanvas: createCanvas,
        rs: require('random-seed'),
    },
    client: client,
};