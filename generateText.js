// get a random element from an array of any size
const rElem = function(arr){
    if (arr.length > 0){
        return arr[Math.floor(Math.random() * arr.length)];
    }
    return "";
}

// get a random element from an array of any size
// there is a Chance that this array will return Nothing
const rElemCN = function(arr){
    arr.push("")
    if (arr.length > 0){
        return arr[Math.floor(Math.random() * arr.length)];
    }
    return "";
}

const describeItems = function(items) {

    if (items.length < 1) {return;}

    let itemAdj = ["instersting", "intriguing", "sinister", "strange"];
    let roomAdj = ["dimly lit", "dark", "dusty"];
    let itemsLocation = rElem(["the far wall", "the center of the room", "the left wall", "the right wall"]);
    let itemsLayout = rElem(["lying in a " + rElem(["heap", "pile"]) + " near ", "scattered about ", "lying near ", "aranged neatly near "]);

    let result = "As " + rElem([
        ("your gaze sweeps the " + rElemCN(roomAdj) + " room"),

        ("you " + rElem(["gaze","peer","look"]) + " around the " + rElemCN(roomAdj) + " room"),

        ("you "+ rElemCN(["hold your torch aloft and "]) + rElem(["gaze","peer","look"]) + " into the " + rElemCN(roomAdj) + " room")
    ]) + ", you notice ";

    if (items.length < 2){
        result += "something " + rElemCN(itemAdj) + " near " + itemLocation + ". It" + rElem(["appears to be", "is"]) + items[0];
    } else {
        result += items.length + " " + rElemCN(itemAdj) + " objects " + itemsLayout + itemsLocation + ". You can see ";
        
        for(let i = 0; i < items.length; i++){
            let desc = items[i].description;
            if (i+1 == items.length) {
                result += ". You can also see " + desc;
            } else {
                result += desc;
            }
        }
    }

    return result;
}

const describeBasicFeatures = function(room) {
    let roomAdv= rElem(["a small", "a large", "a tiny", "a damp", "a grand", "a decrepit", "a majestic", "a sinister looking", "an eerie", "an enormous", "a vast"]);
    let specialRoom = [
        ("statue garden. " + rElem(["A menagerie of beasts, frozen mid-pounce,", "Beautiful stone maidens", "Wicked looking gargoyles", "A vast array of mythical creatures"]) + " stare eerilie down at you from their pedestals."),
        ("wine cellar. Cobwebs and racks of dusty bottles line the walls. The air smells faintly of old grapes."),
        ("conservatory. The mossy walls are lined with a variety of strange plants and the air is thick and humid."), 
        ("workshop. The floor is covered in bits of flaking metal and rotted wood. A pile of old tools sits in one corner but they appear too rusted to be of any real use."),  
        ("empty storage room. The walls, floor and celing are carved from " + rElem(["pine", "birch", "rough hewn stone"]) + " and the air smells faintly of " + rElem(["wood", "roasting meat", "honey", "spices"]) +"."),
        ("room carved entierly from " + rElem(["marble", "jade", "iron", "a deep red stone"]) + ". The walls, celing and floor " + rElem(["sparkle", "glimmer", "twinkle", "shine"]) + " with a mysterious light."),
        ("lounge. Rich tapestries adorn the walls and the floor is covered by a thick expensive carpet.")
    ]

    let result = rElem(["Before you lies a ", "You behold a ", "Before you is a "]);
    result += rElem(specialRoom);

    let doorAdj = ["an old", "a", "a solid looking", "an ornate", "a plain", "an imposing", "a simple"];
    let doorColor = ["black", "blue", "beige", "purple", "wooden", "stone", "iron"];

    let describeRoomPart = function(arr, beginning) {
        let myString = beginning;
        arr.forEach(elem =>{
            if (elem != arr[0]){
                myString += " Next to it is ";
            } else if (elem != arr[0]  && elem != arr[1]){
                myString += " Next to that is ";
            }

            if (elem == "door"){
                myString += rElem(doorAdj) + " " + rElem(doorColor) + " door.";
            } else if (elem == "fountain") {
                myString += "a small " + rElem(["marble", "jade", "crystal", "stone"]) + " fountain.";
            } else if (elem == "trap door") {
                myString += rElem(doorAdj) + " " + rElem(doorColor) + " trap door.";
            } else {
                myString += "a " + elem +".";
            }
        })
        return myString;
    }

    if (room.backWall.length > 0){
        result += describeRoomPart(room.backWall, " Next to you is ");
    }
    if (room.leftWall.length > 0){
        result += describeRoomPart(room.leftWall, " To your left is ");
    }
    if (room.rightWall.length > 0){
        result += describeRoomPart(room.rightWall, " To your right is ");
    }
    if (room.frontWall.length > 0){
        result += describeRoomPart(room.frontWall, " On the far wall is ");
    }
    if (room.celing.length > 0){
        result += describeRoomPart(room.celing, " On the celing, there is ");
    }
    if (room.center.length > 0){
        result += describeRoomPart(room.center, " In the center of the room is ");
    }
    return result;
}

const describeEnemies = function(arr){
    return "";
}

/*
In similar literature, if there is a large enemy in a room then 
the main character uaually does not notice any items/small details.

This function returns a text description to display before 
enemies are defeated and an item description to display 
after enemies are defeated as well as a boolean that tells
you if any enemies exist.
*/
const describeRoom = function(room){
    let beforeEnemiesDefeated = "";
    beforeEnemiesDefeated += describeBasicFeatures(room);
    let enemDescrip = describeEnemies(room.enemies);
    beforeEnemiesDefeated += enemDescrip;

    let afterEnemiesDefeated = "";
    afterEnemiesDefeated += describeItems(room.items)

    return {
        before: beforeEnemiesDefeated, 
        after: afterEnemiesDefeated, 
        enemiesExist: (enemDescrip.length > 0) 
    }
}


let myRoom = {
    
    leftWall: ["door"],
    rightWall:["fountain"],
    frontWall:["chest"],
    backWall:[],
    center:["trap door"],
    celing:["chandelier"],

    items: [  
                {
                    name: "Scroll of Firebending", 
                    type: "scroll",
                    description: "an ancient looking sheaf of parchement rolled into a tight cylendar and bound with twine. It is strangely warm to the touch." 
                },
                {
                    name: "Large Ruby",
                    type: "jewel",
                    description: "a large ruby. It glows deep crimson in the torchlight."
                }
            ],

    enemies: []
}

console.log(describeRoom(myRoom).before);
console.log(describeRoom(myRoom).after);
//document.getElementById("myList").append(describeRoom(myRoom).after);
