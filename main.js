//Version 0.009
//TODO: Playtime counter
//      Date on log messages
//      More upgrades
//
//Gummy Bears amount and Gummy Bears per second
var GmB = {cantidad: 0, perSec: 1, clicks: 0, totalClicks: 0};
GmB.remClicks = 988 - GmB.clicks;
var botonUpg1 = document.getElementById("botonUpg1");
var botonUpg2 = document.getElementById("botonUpg2");
var botonUpg3 = document.getElementById("botonUpg3");
var precio1 = document.getElementById("precio1");
var precio2 = document.getElementById("precio2");
var precio3 = document.getElementById("precio3");
var botonUpg1P = document.getElementById('botonUpg1P');
var botonUpg2P = document.getElementById('botonUpg2P');
var botonUpg3P = document.getElementById('botonUpg3P');
var cantUpg0 = document.getElementById('cantUpg0');
var cantUpg1 = document.getElementById('cantUpg1');
var cantUpg2 = document.getElementById('cantUpg2');
//Upgrade constructor
function Upgrade(pb, ps, name, plural, aan, btn, prhtml, phtml, canthtml) {
    var esto = this;
    this.precioBase = pb;
    this.perSec = ps;
    this.cantidad = 0;
    this.precio = pb;
    this.name = name;
    this.pluralName = plural;
    this.aOrAn = aan;
    this.button = btn;
    this.priceHtml = prhtml;
    this.pHtml = phtml;
    this.cantidadHtml = canthtml;
    this.button.innerHTML = this.name;
    this.cantidadHtml.innerHTML = this.pluralName + ': ' + this.cantidad;
    this.discovered = 'false';
    btn.onclick = function() {
        esto.comprar();
    };

    //html.innerHTML = 'Price: ' + this.precio + ' GmB';

}
//Upgrade's buy function
Upgrade.prototype.comprar = function() {
    previousGmBPs = GmB.perSec;
    GmB.cantidad -= this.precio;
    GmB.perSec += this.perSec;
    this.cantidad++;
    updateGmB();
    this.precio = Math.ceil(this.precioBase * Math.pow(1.25, this.cantidad));
    this.priceHtml.innerHTML = 'Price: ' + this.precio + ' GmB';
    this.cantidadHtml.innerHTML = this.pluralName + ': ' + this.cantidad;
    if (this.cantidad > 1) {
        log.write("You've bought " + this.aOrAn + ' ' + this.name + '! \nYou now have ' + this.cantidad + ' ' + this.pluralName + '!');
    } else {
        log.write("You've bought " + this.aOrAn + ' ' + this.name + '! \nYou now have one ' + this.name + '!');
    }
    if (previousGmBPs <= 1157 && GmB.perSec > 1157) {
        log.write("<span style='color: red;'>You have surpassed Haribo's production rate!!!</span>");
    }
};


//Function to be executed on the setInterval()
var before = new Date();
function loop() {
    now = new Date();
    var elapsedTime = (now.getTime() - before.getTime());
    if (elapsedTime > 50) {
        GmB.cantidad += (GmB.perSec / 50) * (elapsedTime / 20);
    } else {
        GmB.cantidad += GmB.perSec / 50;
    }
    updateGmB();
    //evitarNegs();
    for (var i = 0; i < upgrade.length; i++) {
        if (GmB.cantidad >= upgrade[i].precioBase) {
            listaUpgrades.removeAttribute('hidden');
            if (upgrade[i].pHtml.hasAttribute('hidden')) {
                upgrade[i].pHtml.removeAttribute('hidden');
                upgrade[i].cantidadHtml.removeAttribute('hidden');
                if (upgrade[i].discovered === 'false') {
                    log.write("<span style='color: red;'>You've discovered the " + upgrade[i].name + "!</span>");
                    upgrade[i].discovered = 'true';
                }
            }
        }
        if (GmB.cantidad < upgrade[i].precio) {
            upgrade[i].button.disabled = true;
        }
        if (GmB.cantidad >= upgrade[i].precio) {
            upgrade[i].button.disabled = false;
        }
    }
    if (GmB.cantidad >= 100) {
        oso.removeAttribute('hidden');
    }
    before = new Date();
    document.title = Math.floor(GmB.cantidad) + ' GmB - Gummy Bears';
    /*GmB.cantidad += GmB.perSec / 120;
     updateGmB();*/
}

/*if (typeof saveGmB === 'undefined') {
 GmB.cantidad = 0;
 GmB.perSec = 1;
 upg.precio = 10;
 }*/

//Variable declarations
var upgrade = new Array();
upgrade[0] = new Upgrade(30, 1, 'Cool Upgrade', 'Cool Upgrades', 'a', botonUpg1, precio1, botonUpg1P, cantUpg0);
upgrade[1] = new Upgrade(1000, 5, 'Nice Upgrade', 'Nice Upgrades', 'a', botonUpg2, precio2, botonUpg2P, cantUpg1);
upgrade[2] = new Upgrade(20000, 20, 'Awesome Upgrade', 'Awesome Upgrades', 'an', botonUpg3, precio3, botonUpg3P, cantUpg2);
var gmb = document.getElementById('gmb');
var ps = document.getElementById('ps');
var contGmB = document.getElementById('contGmB');
var contGmBs = document.getElementById('contGmBs');
var botonSave = document.getElementById('saveButton');
var botonDeleteSave = document.getElementById('deleteSaveButton');
var selectColor = document.getElementById('selectColor');
var css = document.getElementById('css');
var tabsBar = document.getElementById('tabsBar');
var fondoTabs = document.getElementById('fondoTabs');
var selectVersion = document.getElementById('selectVersion');
var submitVersion = document.getElementById('submitVersion');
var textSave = document.getElementById('textSave');
var botonTextSave = document.getElementById('botonTextSave');
var selectAll = document.getElementById('selectAll');
var clearLog = document.getElementById('clearLog');
var listaUpgrades = document.getElementById('listaUpgrades');
listaUpgrades.style.left = document.body.clientWidth - 280 - 25 + 'px';
document.getElementById('barra').style.left = document.body.clientWidth / 2 - 200 + 'px';
var oso = document.getElementById('oso');
var remClicks = document.getElementById('remClicks');
var totClicks = document.getElementById('totClicks');
var log = {
    html: document.getElementById('log'),
    write: function(msg) {
        this.html.innerHTML = msg + '<br>------------------------------------------------------<br>' + /*guiones.join('')*/this.html.innerHTML;
    }
};
//var intervalTitle = setInterval(updateTitle(), 1000);
botonUpg1.disabled = true;
botonUpg2.disabled = true;
botonUpg3.disabled = true;
//window.setInterval(loop, 1000);

//Updates HTMLs of the main GmB counter and both counters next to the tabs
function updateGmB() {
    gmb.innerHTML = 'Gummy Bears: ' + Math.floor(GmB.cantidad);
    ps.innerHTML = 'Gummy Bears per second: ' + GmB.perSec;
    contGmB.innerHTML = Math.floor(GmB.cantidad);
    contGmBs.innerHTML = Math.floor(GmB.perSec);
}

//Updates HTML of main GmB/s counter


//Updates HTML of the upgrade's price
function updatePrecios() {
    for (i = 0; i < upgrade.length; i++) {
        upgrade[i].priceHtml.innerHTML = 'Price: ' + upgrade[i].precio + ' GmB';
    }
}
function updateCantidades() {
    for (i = 0; i < upgrade.length; i++) {
        upgrade[i].cantidadHtml.innerHTML = upgrade[i].pluralName + ': ' + upgrade[i].cantidad;
    }
}
//Updates the title of the page
function updateTitle() {
    document.title = Math.floor(GmB.cantidad) + " GmB - Gummy Bears";
}

//Makes the upgrade's button appear when the GmB amount reaches the upgrade's price (10)
function aparecerBoton() {
    document.getElementById('botonUpg1P').removeAttribute('hidden');
}

//Updates everything together
function update() {
    updateGmB();
    //upgrade[0].priceHtml.innerHTML = upgrade[0].precio;
}

//Disables the upgrade's button when you don't have enough GmB to buy it
/*function evitarNegs() {
 botonUpg1.disabled = GmB.cantidad < upg1.precio;
 botonUpg2.disabled = GmB.cantidad < upg2.precio;
 botonUpg3.disabled = GmB.cantidad < upg3.precio;
 }*/

//Function used to save the game
function save() {
    localStorage['GmB0.009'] = GmB.cantidad;
    localStorage['GmBPs0.009'] = GmB.perSec;
    for (var j = 0; j < upgrade.length; j++) {
        localStorage['costoUpgrade0.009' + j] = upgrade[j].precio;
        localStorage['cantidadUpgrade0.009' + j] = upgrade[j].cantidad;
        localStorage['upgradeDiscovered' + j] = upgrade[j].discovered;
    }
    /*localStorage['costoUpgrade'] = upgrade[0].precio;
     localStorage['cantidadUpgrade'] = upgrade[0].cantidad;*/
    localStorage['color0.009'] = selectColor.selectedIndex;
    localStorage['log0.009'] = log.html.innerHTML;
    storageToText();
    log.write('<span style="color: red;"><b>Your game has been saved.\nYou can copy the text from the "Text save" field and keep it to load this save later.</b></span>');
}

//Function used to load the game
function load() {
    if (localStorage['GmB0.009']) {
        GmB.cantidad = parseInt(localStorage['GmB0.009']);
        GmB.perSec = parseInt(localStorage['GmBPs0.009']);
        update();
    }
    if (localStorage['color0.009']) {
        selectColor.selectedIndex = parseInt(localStorage['color0.009']);
        selectColor.onchange();
    }
    if (localStorage['costoUpgrade0.0090']) {
        for (var j = 0; j < upgrade.length; j++) {
            upgrade[j].precio = parseInt(localStorage[('costoUpgrade0.009' + j)]);
            upgrade[j].cantidad = parseInt(localStorage['cantidadUpgrade0.009' + j]);
            upgrade[j].discovered = localStorage['upgradeDiscovered' + j];
        }
    }
    if (localStorage['log0.009']) {
        log.html.innerHTML = localStorage['log0.009'];
    }
    updatePrecios();
    updateCantidades();
}

function storageToText() {
    var array = [
        localStorage['GmB0.009'],
        localStorage['GmBPs0.009'],
        localStorage['color0.009'],
        localStorage['costoUpgrade0.0090'],
        localStorage['costoUpgrade0.0091'],
        localStorage['costoUpgrade0.0092'],
        localStorage['cantidadUpgrade0.0090'],
        localStorage['cantidadUpgrade0.0091'],
        localStorage['cantidadUpgrade0.0092'],
        localStorage['log0.009']
    ];
    textSave.value = array.join();
}

function textToStorage() {
    var array = textSave.value.split(',');
    localStorage['GmB0.009'] = array[0];
    localStorage['GmBPs0.009'] = array[1];
    localStorage['color0.009'] = array[2];
    localStorage['costoUpgrade0.0090'] = array[3];
    localStorage['costoUpgrade0.0091'] = array[4];
    localStorage['costoUpgrade0.0092'] = array[5];
    localStorage['cantidadUpgrade0.0090'] = array[6];
    localStorage['cantidadUpgrade0.0091'] = array[7];
    localStorage['cantidadUpgrade0.0092'] = array[8];
    localStorage['log0.009'] = array[9];
}
//Function used to delete the savegame
function deleteSave() {
    var alertaSave1 = confirm('Are you sure you want to delete your save?');
    if (alertaSave1 === true) {
        var alertaSave2 = confirm('ARE YOU SURE THAT YOU ARE SURE?');
    }
    if (alertaSave2 === true) {
        GmB.cantidad = 0;
        GmB.perSec = 1;
        localStorage['GmB0.009'] = 0;
        localStorage['GmBPs0.009'] = 1;
        for (var j = 0; j < upgrade.length; j++) {
            localStorage['costoUpgrade0.009' + j] = upgrade[j].precioBase;
            localStorage['cantidadUpgrade0.009' + j] = 0;
            localStorage['upgradeDiscovered' + j] = 'false';
            upgrade[j].pHtml.setAttribute('hidden');
            upgrade[j].cantidadHtml.setAttribute('hidden');
            upgrade[j].discovered = 'false';
        }
        listaUpgrades.setAttribute('hidden');
        oso.setAttribute('hidden');
        //localStorage['costoUpgrade'] = 10;
        //localStorage['cantidadUpgrade'] = 0;
        localStorage['log0.009'] = '';
        window.clearInterval(interval);
        load();
        before = new Date();
        interval = window.setInterval(loop, 20);
        log.html.innerHTML = '<span style="color: red;">Poof! You have deleted your save!</span>';
    }
}

//Buys the upgrade when its button is clicked
/*botonUpg.onclick = function() {
 upg.comprar();
 precio1.innerHTML = 'Price: ' + upg.precio + ' GmB';
 };*/

//Saves the game when the Save button is pressed
botonSave.onclick = function() {
    save();
};

//Deletes the savegame when the Delete save button is pressed
botonDeleteSave.onclick = function() {
    deleteSave();
};

botonTextSave.onclick = function() {
    textToStorage();
    load();
    log.write('<span style="color: red;">You have loaded a text save!</span>');
};

selectAll.onclick = function() {
    textSave.select();
};

clearLog.onclick = function() {
    log.html.innerHTML = '';
};

oso.onclick = function() {
    if (oso.className !== 'disabled') {
        GmB.cantidad += 1;
        GmB.clicks += 1;
        GmB.totalClicks += 1;
        GmB.remClicks = 988 - GmB.clicks;
        remClicks.innerHTML = GmB.remClicks;
        totClicks.innerHTML = GmB.totalClicks;
        oso.className = 'clicked';
        window.setTimeout(function() {
            if (GmB.clicks >= 988) {
                oso.className = 'disabled';
                oso.setAttribute('src', 'oso_grande_gris.gif');
            } else {
                oso.className = 'normal';
            }
        }, 100);
    }
};


selectColor.onchange = function() {
    switch (selectColor.selectedIndex) {
        case 0:
            css.setAttribute('href', 'tabcontent_red.css');
            tabsBar.style.borderColor = '#FA4E4E';
            fondoTabs.style.backgroundColor = '#DB1212';
            break;
        case 1:
            css.setAttribute('href', 'tabcontent_yellow.css');
            tabsBar.style.borderColor = '#F0C900';
            fondoTabs.style.backgroundColor = '#C2B100';
            break;
        case 2:
            css.setAttribute('href', 'tabcontent_blue.css');
            tabsBar.style.borderColor = '#4D8DAD';
            fondoTabs.style.backgroundColor = '#005C8A';
            break;
        case 3:
            css.setAttribute('href', 'tabcontent_green.css');
            tabsBar.style.borderColor = '#40DA33';
            fondoTabs.style.backgroundColor = '#0E9602';
            break;
        case 4:
            css.setAttribute('href', 'tabcontent_orange.css');
            tabsBar.style.borderColor = '#FF8500';
            fondoTabs.style.backgroundColor = '#C76800';
            break;
        case 5:
            css.setAttribute('href', 'tabcontent_purple.css');
            tabsBar.style.borderColor = '#D600FF';
            fondoTabs.style.backgroundColor = '#9F00C7';
            break;
        case 6:
            css.setAttribute('href', 'tabcontent_pink.css');
            tabsBar.style.borderColor = '#FF91DC';
            fondoTabs.style.backgroundColor = '#F11FD0';
            break;
    }
};

selectVersion.onchange = function() {
    switch (selectVersion.selectedIndex) {
        case 0:
            submitVersion.setAttribute('href', 'Versiones/0.004/AppletForm.html');
            break;
        case 1:
            submitVersion.setAttribute('href', 'Versiones/0.005/GummyBears.html');
            break;
        case 2:
            submitVersion.setAttribute('href', 'Versiones/0.006/GummyBears.html');
            break;
        case 3:
            submitVersion.setAttribute('href', 'Versiones/0.007/GummyBears.html');
            break;
        case 4:
            submitVersion.setAttribute('href', 'Versiones/0.008/GummyBears.html');
            break;
    }
};
//Initialization of the game
load();
interval = window.setInterval(loop, 20);
//intervalTimePlayed = window.setInterval(secondsToTime(), 1000);
/*function secondsToTime() {
 var secs;
 secs = new Date();
 secs -= inicio;
 console.log(secs);
 var hours = Math.floor(secs / (60 * 60));
 
 var divisor_for_minutes = secs % (60 * 60);
 var minutes = Math.floor(divisor_for_minutes / 60);
 
 var divisor_for_seconds = divisor_for_minutes % 60;
 var seconds = Math.ceil(divisor_for_seconds);
 
 var obj = {
 "h": hours,
 "m": minutes,
 "s": seconds
 };
 console.log(obj);
 hora.innerHTML = secs;
 }*/


