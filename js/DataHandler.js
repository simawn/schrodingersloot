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
    return deserialize(localStorage.getItem("items"));
}

//cash operations
function setCash(amount) {
    localStorage.setItem("cash", amount);
}

function getCash() {
    return parseInt(localStorage.getItem("cash"));
}

function addCash(amount) { //Adds to existing amount
    localStorage.setItem("cash", getCash() + amount);
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

}

//move them to a different file?
function updateCashDisplayAmt() {
    document.getElementById("cAmt").innerHTML = "💸 " + getCookie("cash") + "$ 💵";
}

function updateCashDisplayAmtCollection() {
    document.getElementById("colCashDisp").innerHTML = "💸 " + getCookie("cash") + "$ 💵";
}

/*
Set items Db if not set
Not using the functions we have set above for this since it deserializes the result
*/
//checked
function createItemDb(){
    var itemsObj = localStorage.getItem("items");
    if(itemsObj === null || itemsObj === undefined || itemsObj === ""){
        localStorage.setItem("items", "{}");
    }
}
createItemDb();
