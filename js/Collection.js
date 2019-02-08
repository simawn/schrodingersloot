//Click on Collection Button
document.getElementById("btnCollection").addEventListener("click", updateCollection);

function updateCollection() {

    var rowItemsDisplay = ""; //Need to be an empty string otherwise returns undefined

    Object.keys(itemDb).forEach((key) => {
        var localStorageKey = getItemsObj()[key];
        rowItemsDisplay += "<tr>";
            //Thumbnail
            rowItemsDisplay += `<td id="itemThumb"><img src="${localStorageKey && (getItemAmount(key) > 0)? itemDb[key]["itemThumb"] : UNKNOWNITEM}"></td>`;
            //Name
            rowItemsDisplay += `<td>${localStorageKey ? "<h6 class=" + itemDb[key]["itemRarity"] + ">" + itemDb[key]["itemName"] + "</h6>": "???"}</td>`;
            //Qty
            rowItemsDisplay += `<td>${localStorageKey ? localStorageKey.amount : "0"}</td>`;
            //Sell
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
            <th>Qty</th>
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
        removeItem(this.id);
        addCash(itemDb[this.id]["itemWorth"]);

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
    
    var lootViewSaleButton = document.getElementById("sell");
    if(clicked && (lootViewSaleButton != null || lootViewSaleButton != undefined)){ //Is in opening/view item mode and the sale button is there
        var curItemId = document.getElementById("item").getAttribute("data-itemId"); //Grab current item id
        if(curItemId == this.id){ //Check if current item id matches with the item trying to sell in collection
            document.getElementById("options").removeChild(lootViewSaleButton);
        }
    }
}

function restart(){
    var restart = confirm("Are you sure you want to restart the game? All your progress and cash will be wiped out!");
    if (restart) {
        localStorage.clear();
        location.reload(true);
    }
}