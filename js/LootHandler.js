var boxElement = document.getElementById("animBox"); //Injecting animation in id=animBox

//Box animation params for Lottie
var boxAnimParams = {
  container: boxElement,
  renderer: "html",
  loop: true,
  autoplay: false,
  path: "assets/gfx/box/boxMerge.json"
};

var boxAnimation; //Actual animation. Setup in start function

//Item animation params for Lottie. Orange Cat is default.
var itemAnimParams = {
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

/*
When pressing on "Keep" or "Sell", it will register as a 
click and go immediately to opening box. We don't want that to happen.
So we create an idleMode flag to prevent that
*/
var idleMode = true;

function startBoxAnimation() {
    boxAnimation = bodymovin.loadAnimation(boxAnimParams);
    boxAnimation.addEventListener("DOMLoaded", () => { //When animation data is loaded
        updateCashDisplayAmt();
        idleMode = true;
        boxAnimation.playSegments([31, 156], true); //Jump up and down (idle pose)
        boxElement.addEventListener("click", clickOpen);
    });
}

function clickOpen() {
    var curCash = getCurrentCash();
    if (idleMode && curCash < BOXOPENINGCOST) {
        $('#oocpop').modal('show');
    }
    else if (idleMode && curCash >= BOXOPENINGCOST) {
        openBox();
    };
}

var clicked = false; //Prevents spam click triggers

function openBox() {
    if (clicked) return;
    idleMode = false;
    clicked = true;
    boxAnimation.playSegments([210, 290], true); //Box opening animation. 210-354 for full length
    setCurrentCash(getCurrentCash() - BOXOPENINGCOST);
    updateCashDisplayAmt();
    boxAnimation.addEventListener("loopComplete", () => { //When the animation is over
        boxAnimation.destroy();
        showPrize(getRandom());
    });
}

function getRandom() {
  return Math.random();
}

function showPrize(randNum) {
    var itemAnimation;
    var itemName;
    var itemWorth;
    var itemId;

    //RNG: Item is determined in here.
    for(var i = 0; i < Object.keys(itemDb).length; i++){
        var key = Object.keys(itemDb)[i]; //In case we have keys other than ints
        var itemChance = itemDb[key]["itemChance"];
        
        if(randNum < itemChance){
            itemName = itemDb[key]["itemName"];
            itemAnimParams.path = itemDb[key]["itemPath"];
            itemWorth = itemDb[key]["itemWorth"];
            itemId = key;
            break;
        }
        randNum -= itemChance;
    }

    //Add item to DB
    var itemAmount = getItemAmount(itemId);
    console.log("Cur:" + itemAmount);
    if (itemAmount === undefined) {
        localStorage.setItem(itemId, 1);
    } else {
        localStorage.setItem(itemId, itemAmount + 1);
    }

    itemAmount = getItemAmount(itemId); //Updates item amount. Needed for keep/sell below.
    console.log("Upd:" + itemAmount);

    //Generate spot for item animation
    var itemDiv = document.createElement("div");
    itemDiv.setAttribute("id", "item");
    itemDiv.setAttribute("data-itemId", itemId);

    //Item animation display
    itemAnimParams.container = itemDiv; //Override default item container
    itemAnimation = bodymovin.loadAnimation(itemAnimParams);

    //Generate area for item name
    var itemDescDiv = document.createElement("div");
    itemDescDiv.setAttribute("id", "desc");
    var h1 = document.createElement("h2");
    h1.setAttribute("class", itemDb[itemId]["itemRarity"]);
    var h1Text = document.createTextNode(itemName); //Display item name
    h1.appendChild(h1Text);
    itemDescDiv.appendChild(h1);

    //Generate area for buttons
    var itemOptionDiv = document.createElement("div");
    itemOptionDiv.setAttribute("id", "options");

    //Generate "keep" button
    var keepButton = document.createElement("button");
    keepButton.setAttribute("id", "keep");
    keepButton.setAttribute("class", "btn btn-success");
    var button1Text = document.createTextNode("Open more");
    keepButton.appendChild(button1Text);
    itemOptionDiv.appendChild(keepButton);

    //Generate "sell" button
    var sellButton = document.createElement("button");
    sellButton.setAttribute("id", "sell");
    sellButton.setAttribute("class", "btn btn-danger");
    var button2Text = document.createTextNode("Sell for " + itemWorth + "$");
    sellButton.appendChild(button2Text);
    itemOptionDiv.appendChild(sellButton);

    //Inject elements
    boxElement.appendChild(itemDescDiv);
    boxElement.appendChild(itemDiv);
    boxElement.appendChild(itemOptionDiv);

    //Keep button action
    keepButton.addEventListener("click", keep);

    //Sell button action
    sellButton.addEventListener("click", sell);

    function keep() {
        resetStage();
    }

    function sell() {
        localStorage.setItem(itemId, itemAmount - 1);
        var newWalletValue = getCurrentCash() + itemWorth;
        setCurrentCash(newWalletValue);
        resetStage();
    }
    
    //When clicking on a button, reset everything
    function resetStage() {
        itemAnimation.destroy();
        boxElement.removeChild(itemDescDiv);
        boxElement.removeChild(itemDiv);
        boxElement.removeChild(itemOptionDiv);
        clicked = false;
        startBoxAnimation();
    }
}
