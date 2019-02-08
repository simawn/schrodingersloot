//data transfer operations
function serialize(jsonObj) {
    return JSON.stringify(jsonObj);
}

function deserialize(jsonString) {
    return JSON.parse(jsonString);
}

function setItemsObj(itemsObj){
    localStorage.setItem("items", serialize(itemsObj));
}

function getItemsObj(){
    createItemDb();
    return deserialize(localStorage.getItem("items"));
}

//cash operations
function setCash(amount) {
    localStorage.setItem("cash", amount);
}

function getCash() {
    createWallet();
    return parseInt(localStorage.getItem("cash"));
}

function addCash(amount) { //Adds to existing amount
    localStorage.setItem("cash", getCash() + amount);
}

function removeCash(amount) {
    var curCash = getCash();
    var afterCash = curCash - amount;
    if(afterCash >= 0){
        setCash(afterCash);
        return true;
    }
    return false;
}

//Items database operations
function getItemAmount(itemId) {
    var itemsObj = getItemsObj();
    if(itemsObj[itemId] === undefined) return 0;
    return itemsObj[itemId].amount;
}

function addItem(itemId) { //Increase by 1
    var itemsObj = getItemsObj();
    if(itemsObj[itemId]){ //If entry exists
        itemsObj[itemId].amount++;
    } else { //If entry DNE
        var newItem = {
            [itemId] : {
                "amount" : 1,
            },
        }
        itemsObj = {...itemsObj, ...newItem};
    }
    setItemsObj(itemsObj);
}

function removeItem(itemId) { //Decrease by 1
    var itemsObj = getItemsObj();
    if(itemsObj[itemId]){ //If entry exists
        if(itemsObj[itemId].amount >= 1 ) itemsObj[itemId].amount--;
        else return false;
    } else { //If entry DNE
        return false;
    }
    setItemsObj(itemsObj);
    return true;
}

//new user operations
function createItemDb(){
    var itemsObj = localStorage.getItem("items");
    if(itemsObj === null || itemsObj === undefined || itemsObj === ""){
        localStorage.setItem("items", "{}");
    }
}

function createWallet(){
    var wallet = localStorage.getItem("cash");
    if(wallet === null || wallet === undefined || wallet === ""){
        localStorage.setItem("cash", STARTCASH);
    }
}

createItemDb();
createWallet();
