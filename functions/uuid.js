module.exports = function uuid(obj) {
    do {
        var id = Math.floor(Math.random()*100000000);
    } while (obj[id]) //If there is already a property of the object with the generated UUID, generate another one.
    return id;
}