//Click on Collection Button
document.getElementById("btnCollection").addEventListener("click", updateCollection);

function updateCollection() {

    var rowItemsDisplay = ""; //Need to be an empty string otherwise returns undefined

    Object.keys(itemDb).forEach((key) => {
        var localStorageKey = localStorage.getItem(key);
        rowItemsDisplay += "<tr>";
            rowItemsDisplay += `<td id="itemThumb"><img src="${localStorageKey && (getItemAmount(key) > 0)? itemDb[key]["itemThumb"] : unknownItem}"></td>`;
            rowItemsDisplay += `<td>${localStorageKey ? itemDb[key]["itemName"] : "???"}</td>`;
            rowItemsDisplay += `<td>${localStorageKey ? localStorage.getItem(key) : "???"}</td>`;
            if(localStorageKey && getItemAmount(key) > 0){
                rowItemsDisplay += `<td><button class="btn btn-danger sell" id=${key}>${itemDb[key]["itemWorth"]}$</button></td>`;
            } else {
                rowItemsDisplay += `<td></td>`;
            }
        rowItemsDisplay += "</tr>";
    });

    //Display table
    document.getElementById("colItems").innerHTML = `
    <table class="table">
        <thead>
            <th></th>
            <th>Name</th>
            <th>Amount</th>
            <th>Sell</th>
        </thead>
        <tbody>
            ${rowItemsDisplay}
        </tbody>
    `;

    //Sell button
    var classSell = document.getElementsByClassName("sell");
    for (var i = 0; i < classSell.length; i++) {
        classSell[i].addEventListener("click", sell);
    }

    updateCashDisplayAmtCollection(); //Update the cash amount displayed on Collection window
}

function sell() {
    var itemCount = getItemAmount(this.id);
    if(itemCount > 0) {
        localStorage.setItem(this.id, itemCount - 1);
        setCurrentCash(getCurrentCash() + itemDb[this.id]["itemWorth"]); //Should have a add cash method?
        updateCashDisplayAmtCollection();
        updateCashDisplayAmt();
        updateCollection();
    }

    /*
    Removing the "Sell" option in loot view
    Prevents double sale:
    Eg: User in looted item view and has keep/sell button available.
    They can open their collection and sell the current item from there.
    Then go back to looted item view and sell the item again using the 'sell' button
    */
    if(clicked){ //Is in opening/view item mode
        var curItemId = document.getElementById("item").getAttribute("data-itemId"); //Grab current item id
        if(curItemId == this.id){ //Check if current item id matches with the item trying to sell in collection
            document.getElementById("options").removeChild(document.getElementById("sell"));
        }
    }
}

function restart(){
    var restart = confirm("Are you sure you want to restart the game? All your progress and cash will be wiped out!");
    if (restart) {
        localStorage.clear();
        setCurrentCash(STARTCASH);
        updateCashDisplayAmt();
        updateCashDisplayAmtCollection();
    }
}