function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

if (getCookie("cash") == null) {
    setCookie("cash", STARTCASH, 30);
}

function updateCashDisplayAmt() {
    document.getElementById("cAmt").innerHTML = "💸 " + getCookie("cash") + "$ 💵";
}

function updateCashDisplayAmtCollection() {
    document.getElementById("colCashDisp").innerHTML = "💸 " + getCookie("cash") + "$ 💵";
}

function getCurrentCash() {
    return parseInt(getCookie("cash"));
}

function setCurrentCash(amount) {
    setCookie("cash", amount, 30);
}

function getItemAmount(itemName) {
    var itemCount = localStorage.getItem(itemName);
    if (itemCount != null || itemCount != undefined) return parseInt(itemCount);
}
