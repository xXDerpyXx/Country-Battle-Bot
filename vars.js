const requireDir = require('require-dir');
const {createCanvas} = require("canvas");
const discord = require('discord.js');
var client = new discord.Client();
client.login(require("./token.js"));

var c = requireDir('./classes', {recurse: true});
var fn = requireDir('./functions', {recurse: true});
var d = requireDir('./data', {recurse: true});
var consts = requireDir('./consts', {recurse: true});

module.exports = {
    c: c,
    d: d,
    fn: fn,
    consts: consts,
    modules: {
        discord: discord,
        fs: require('fs'),
        requireDir: requireDir,
        canvas: require('canvas'),
        createCanvas: createCanvas
    },
    client: client
};