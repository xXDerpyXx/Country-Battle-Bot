module.exports = {
    'countries.json': Object(),

    'people.json': Object(),
    
    'map.json': Array(),

    'settings.json': {
        paused: false,
        tickDelay: 10000,

        width: 100,
        height: 100,

        seaLevel: 15,
        baseHeight: 20,
        variation: 40,
        smoothness: 20,
        wackyness: 0.4,
        shoreHeight: 0.3,
        mountainHeight: 1,
        rivers: false,
        riverChance: 0.001,
        riverDepth: 2,
        
        prefix: '$',
        maxNonAdminChainLength: 5,
        genocide: true,
        admins: [
            "246589957165023232",
            "106068236000329728",
        ],
    },

    'mapInfo.json': null,

    'worldData.json': {
        cultures: Object(),
    },
}
