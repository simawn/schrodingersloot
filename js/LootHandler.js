var boxElement = document.getElementById("animBox"); //Injecting animation in id=animBox

//BOX
var boxAnimParams = {
  //Animation params
  container: boxElement,
  renderer: "html",
  loop: true,
  autoplay: false,
  path: "assets/gfx/box/boxMerge.json"
};

var box; //Actual animation. Setup in start function

//itemParams. Orangecat is default.
var itemParams = {
  container: boxElement,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "assets/gfx/cat/catA.json"
};

//START
document.addEventListener("DOMContentLoaded", () => {
  //When content of the page is loaded
  startBoxAnimation();
});

function getPrize() {
  //RNG
  return Math.random();
}

function showPrize(randNum) { //Process random number
    var itemName; //set
    var item; //Animation load
    var worth; //set
    var itemId; //set

    for(var i = 0; i < Object.keys(itemDb).length; i++){
        var key = Object.keys(itemDb)[i]; //In case we have keys other than ints
        var itemChance = itemDb[key]["itemChance"];
        
        console.log(`rng: ${randNum}, itemchance ${itemChance}, key: ${key}`);
        if(randNum < itemChance){
            itemName = itemDb[key]["itemName"];
            itemParams.path = itemDb[key]["itemPath"];
            worth = itemDb[key]["itemWorth"];
            itemId = key;
            console.log(itemName);
            break;
        }
        randNum -= itemChance;
    }

    //Generate spot for item animation
    var itemDiv = document.createElement("div");
    itemDiv.setAttribute("id", "item");

    //Item animation display
    itemParams.container = itemDiv; //Mod injection params
    item = bodymovin.loadAnimation(itemParams); //Load cat model

    //Description field on item
    var desc = document.createElement("div");
    desc.setAttribute("id", "desc");
    var h1 = document.createElement("h2");
    h1.setAttribute("id", itemDb[itemId]["itemType"]);
    var h1Text = document.createTextNode(itemName);
    h1.appendChild(h1Text);
    desc.appendChild(h1);

    //Generate spot for buttons
    var optionDiv = document.createElement("div");
    optionDiv.setAttribute("id", "options");

    //Keep
    var button1 = document.createElement("button");
    button1.setAttribute("id", "keep");
    button1.setAttribute("class", "btn btn-success");
    var button1Text = document.createTextNode("Keep");
    button1.appendChild(button1Text);
    optionDiv.appendChild(button1);

    //Sell
    var button2 = document.createElement("button");
    button2.setAttribute("id", "sell");
    button2.setAttribute("class", "btn btn-danger");
    var button2Text = document.createTextNode("Sell for " + worth + "$");
    button2.appendChild(button2Text);
    optionDiv.appendChild(button2);

    //Inject elements
    boxElement.appendChild(desc);
    boxElement.appendChild(itemDiv);
    boxElement.appendChild(optionDiv);

    //When clicking on a button, reset everything
    function resetStage() {
        item.destroy();
        boxElement.removeChild(desc);
        boxElement.removeChild(itemDiv);
        boxElement.removeChild(optionDiv);
        clicked = false;
        startBoxAnimation();
    }

    //Button actions
    button1.addEventListener("click", () => { //Keep
        var itemAmount = getItemAmount(itemId);
        //console.log(itemAmount);
        if (itemAmount === undefined) {
            localStorage.setItem(itemId, 1);
        } else {
            localStorage.setItem(itemId, itemAmount + 1);
        }
        resetStage();
    });

    button2.addEventListener("click", () => { //Sell
        var newWalletValue = getCurrentCash() + worth;
        setCurrentCash(newWalletValue);
        resetStage();
    });
}

var clicked = false; //Checking for multiple clicks

function openBox() {
    if (clicked) return;
    idleMode = false;
    clicked = true; //Avoid multiple clicks
    box.playSegments([210, 290], true); //210-354 FOR FULL LENGTH
    setCurrentCash(getCurrentCash() - BOXOPENINGCOST);
    updateCashDisplayAmt();
    getPrize();
    box.addEventListener("loopComplete", () => {
        box.destroy();
        showPrize(getPrize());
    });
}



/*
When pressing on "Keep" or "Sell", it will register as a 
click and go immediately to opening box. We don't want that to happen.
So we create an idleMode flag to prevent that
*/
var idleMode = true;

function startBoxAnimation() {

    box = bodymovin.loadAnimation(boxAnimParams);
    box.addEventListener("DOMLoaded", () => { //When animation data is loaded

        var curCash = getCurrentCash();
        updateCashDisplayAmt();

        idleMode = true;

        box.playSegments([31, 156], true); //Jump up and down (idle pose)

        boxElement.addEventListener("click", clickOpen);
    });
}

function clickOpen() {
    var curCash = getCurrentCash();
    if ((curCash < BOXOPENINGCOST) && idleMode) {
        $('#oocpop').modal('show');
        /* feeling generous?
        alert("Looks like you have ran out of cash :(. Here's 50$");
        setCurrentCash(curCash + 50);
        updateCashDisplayAmt();
        curCash = getCurrentCash();
        */
    }
    else if (idleMode && curCash >= BOXOPENINGCOST) {
        openBox();
    };
}