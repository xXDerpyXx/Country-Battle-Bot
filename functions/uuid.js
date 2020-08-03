module.exports = function uuid(obj, rand = math) {
    do {
        var id = Math.floor(rand.random()*100000000);
    } while (obj[id]) //If there is already a property of the object with the generated UUID, generate another one.
    return id;
}