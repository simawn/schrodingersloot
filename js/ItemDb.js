const itemDb = {
    0: {
        itemName: "Black Cat",
        itemPath: "assets/gfx/cat/catBlack.json",
        itemWorth: 36,
        itemThumb: "assets/img/small/catBlack.png",
        itemChance: 0.073,
        itemRarity: "uncommon",
    },
    1: {
        itemName: "White Striped Cat",
        itemPath: "assets/gfx/cat/catBlackWhite.json",
        itemWorth: 36,
        itemThumb: "assets/img/small/catWhiteBlack.png",
        itemChance: 0.073,
        itemRarity: "uncommon",
    },
    2: {
        itemName: "Orange cat",
        itemPath: "assets/gfx/cat/catA.json",
        itemWorth: 36,
        itemThumb: "assets/img/small/catA.png",
        itemChance: 0.073,
        itemRarity: "uncommon",
    },
    3: {
        itemName: "Poison Flask",
        itemPath: "assets/gfx/obj/poison.json",
        itemWorth: 9,
        itemThumb: "assets/img/small/poison.png",
        itemChance: 0.5,
        itemRarity: "common",
    },
    4: {
        itemName: "Blue Cat",
        itemPath: "assets/gfx/cat/catBlue.json",
        itemWorth: 81,
        itemThumb: "assets/img/small/catBlue.png",
        itemChance: 0.03,
        itemRarity: "rare",
    },
    5: {
        itemName: "Octocat",
        itemPath: "assets/gfx/cat/octoCat.json",
        itemWorth: 4321,
        itemThumb: "assets/img/small/octoCat.png",
        itemChance: 0.01,
        itemRarity: "mythic",
    },
    6: {
        itemName: "Lucky Cat",
        itemPath: "assets/gfx/cat/luckyCat.json",
        itemWorth: 8888,
        itemThumb: "assets/img/small/luckyCat.png",
        itemChance: 0.005,
        itemRarity: "mythic",
    },
    7: {
        itemName: "Meowth",
        itemPath: "assets/gfx/cat/meowth.json",
        itemWorth: 81,
        itemThumb: "assets/img/small/meowth.png",
        itemChance: 0.03,
        itemRarity: "rare",
    },
    8: {
        itemName: "Polite Cat",
        itemPath: "assets/gfx/cat/catPolite.json",
        itemWorth: 81,
        itemThumb: "assets/img/small/catPolite.png",
        itemChance: 0.03,
        itemRarity: "rare",
    },
    9: {
        itemName: "Calico Cat",
        itemPath: "assets/gfx/cat/catCalico.json",
        itemWorth: 36,
        itemThumb: "assets/img/small/catCalico.png",
        itemChance: 0.073,
        itemRarity: "uncommon",
    },
    10: {
        itemName: "Grey Cat",
        itemPath: "assets/gfx/cat/catGrey.json",
        itemWorth: 36,
        itemThumb: "assets/img/small/catGrey.png",
        itemChance: 0.073,
        itemRarity: "uncommon",
    },
    11: {
        itemName: "Odd Eyed Cat",
        itemPath: "assets/gfx/cat/catOddEyed.json",
        itemWorth: 81,
        itemThumb: "assets/img/small/catOddEyed.png",
        itemChance: 0.03,
        itemRarity: "rare",
    },
};

//Debug
//Displays the number needed to get an item
function displayRNG(){
    var curChance = 0;
    Object.keys(itemDb).forEach((key) => {
        var itemChance = itemDb[key]["itemChance"];
        console.log(`[${curChance};${curChance + itemChance}) : ${itemDb[key]["itemName"]}`);
        curChance += itemChance;
    });
}
/*
ItemDb.js:105 [0;0.073) : Black Cat
ItemDb.js:105 [0.073;0.146) : White Striped Cat
ItemDb.js:105 [0.146;0.21899999999999997) : Orange cat
ItemDb.js:105 [0.21899999999999997;0.719) : Poison Flask
ItemDb.js:105 [0.719;0.749) : Blue Cat
ItemDb.js:105 [0.749;0.759) : Octocat
ItemDb.js:105 [0.759;0.764) : Lucky Cat
ItemDb.js:105 [0.764;0.794) : Meowth
ItemDb.js:105 [0.794;0.8240000000000001) : Polite Cat
ItemDb.js:105 [0.8240000000000001;0.897) : Calico Cat
ItemDb.js:105 [0.897;0.97) : Grey Cat
ItemDb.js:105 [0.97;1) : Odd Eyed Cat
*/