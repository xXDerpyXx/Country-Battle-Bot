module.exports =  function randomProperty(obj, rand = Math) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * rand.random() << 0]];
};