//Version 0.008
//Gummy Bears amount and Gummy Bears per second
var GmB = {cantidad: 0, perSec: 1};


//Upgrade constructor
function Upgrade(pb, ps) {
    this.precioBase = pb;
    this.perSec = ps;
    this.cantidad = 0;
    this.precio = pb;
}
//Upgrade's buy function
Upgrade.prototype.comprar = function() {
    GmB.cantidad = GmB.cantidad - this.precio;
    GmB.perSec = GmB.perSec + this.perSec;
    this.cantidad++;
    updateGmB();
    updateGmBPs();
    this.precio = Math.ceil(this.precioBase * Math.pow(1.25, this.cantidad));
    evitarNegs();
};
//Function to be executed on the setInterval()
var delay = 1000/120;
function loop() {
    now = new Date();
    var elapsedTime = (now.getTime() - before.getTime());
    if(elapsedTime > 120) {
        GmB.cantidad += (GmB.perSec / 120)*(elapsedTime/delay); 
    }else{
    GmB.cantidad += GmB.perSec / 120;
    }
    updateGmB();
    evitarNegs();
    if (GmB.cantidad >= upg.precio) {
        aparecerBoton();
    }
    before = new Date();
    document.title = Math.floor(GmB.cantidad) + ' GmB - Gummy Bears';
}    
    
    /*if (typeof saveGmB === 'undefined') {
     GmB.cantidad = 0;
     GmB.perSec = 1;
     upg.precio = 10;
     }*/

//Variable declarations
var upg = new Upgrade(10, 1);
var gmb = document.getElementById('gmb');
var ps = document.getElementById('ps');
var contGmB = document.getElementById('contGmB');
var contGmBs = document.getElementById('contGmBs');
var botonUpg = document.getElementById("botonUpg");
var botonSave = document.getElementById('saveButton');
var botonDeleteSave = document.getElementById('deleteSaveButton');
var selectColor = document.getElementById('selectColor');
var css = document.getElementById('css');
var tabsBar = document.getElementById('tabsBar');
var precio1 = document.getElementById("precio1");
var selectVersion = document.getElementById('selectVersion');
var submitVersion = document.getElementById('submitVersion');
var before = new Date();
//var intervalTitle = setInterval(updateTitle(), 1000);
botonUpg.disabled = true;
//window.setInterval(loop, 1000);

//Updates HTMLs of the main GmB counter and both counters next to the tabs
function updateGmB() {
    gmb.innerHTML = 'Gummy Bears: ' + Math.floor(GmB.cantidad);
    contGmB.innerHTML = Math.floor(GmB.cantidad);
    contGmBs.innerHTML = Math.floor(GmB.perSec);
}

//Updates HTML of main GmB/s counter
function updateGmBPs() {
    ps.innerHTML = 'Gummy Bears per second: ' + GmB.perSec;
}

//Updates HTML of the upgrade's price
function updatePrecioUpgrade() {
    precio1.innerHTML = 'Price: ' + upg.precio + ' GmB';
}

//Updates the title of the page
function updateTitle() {
    document.title = Math.floor(GmB.cantidad) + " GmB - Gummy Bears";
}

//Makes the upgrade's button appear when the GmB amount reaches the upgrade's price (10)
function aparecerBoton() {
    document.getElementById('botonUpgP').removeAttribute('hidden');
}

//Updates everything together
function update() {
    updateGmB();
    updateGmBPs();
    updatePrecioUpgrade();
}

//Disables the upgrade's button when you don't have enough GmB to buy it
function evitarNegs() {
    botonUpg.disabled = GmB.cantidad < upg.precio;
}

//Function used to save the game
function save() {
    localStorage['GmB0.008'] = GmB.cantidad;
    localStorage['GmBPs0.008'] = GmB.perSec;
    localStorage['costoUpgrade0.008'] = upg.precio;
    localStorage['cantidadUpgrade0.008'] = upg.cantidad;
    localStorage['color0.008'] = selectColor.selectedIndex;
    alert('Your game has been saved.');
}

//Function used to load the game
function load() {
    if (localStorage['GmB0.008']) {
        GmB.cantidad = parseInt(localStorage['GmB0.008']);
        GmB.perSec = parseInt(localStorage['GmBPs0.008']);
        upg.precio = parseInt(localStorage['costoUpgrade0.008']);
        upg.cantidad = parseInt(localStorage['cantidadUpgrade0.008']);        
        update();
    }
    if (localStorage['color0.008']) {
        selectColor.selectedIndex = parseInt(localStorage['color0.008']);
        selectColor.onchange();
    }
}

//Function used to delete the savegame
function deleteSave() {
    var alertaSave1 = confirm('Are you sure you want to delete your save?');
    if (alertaSave1 === true) {
        var alertaSave2 = confirm('ARE YOU SURE THAT YOU ARE SURE?');
    }
    if (alertaSave2 === true) {
        localStorage['GmB0.008'] = 0;
        localStorage['GmBPs0.008'] = 1;
        localStorage['costoUpgrade0.008'] = 10;
        localStorage['cantidadUpgrade0.008'] = 0;
        load();
        alert('Your game has been deleted.');
    }
}

//Buys the upgrade when its button is clicked
botonUpg.onclick = function() {
    upg.comprar();
    precio1.innerHTML = 'Price: ' + upg.precio + ' GmB';
};

//Saves the game when the Save button is pressed
botonSave.onclick = function() {
    save();
};

//Deletes the savegame when the Delete save button is pressed
botonDeleteSave.onclick = function() {
    deleteSave();
};

selectColor.onchange = function() {
    switch(selectColor.selectedIndex) {
        case 0: css.setAttribute('href', 'tabcontent_red.css'); tabsBar.style.borderColor = '#FA4E4E'; break;
        case 1: css.setAttribute('href', 'tabcontent_yellow.css'); tabsBar.style.borderColor = '#F0C900'; break;
        case 2: css.setAttribute('href', 'tabcontent_blue.css'); tabsBar.style.borderColor = '#4D8DAD'; break;
        case 3: css.setAttribute('href', 'tabcontent_green.css'); tabsBar.style.borderColor = '#40DA33'; break;
        case 4: css.setAttribute('href', 'tabcontent_orange.css'); tabsBar.style.borderColor = '#FF8500'; break;
        case 5: css.setAttribute('href', 'tabcontent_purple.css'); tabsBar.style.borderColor = '#D600FF'; break;
        case 6: css.setAttribute('href', 'tabcontent_pink.css'); tabsBar.style.borderColor = '#FF91DC'; break;
    }
};

selectVersion.onchange = function() {
    switch(selectVersion.selectedIndex) {
        case 0: submitVersion.setAttribute('href', 'Versiones/0.004/AppletForm.html'); break;
        case 1: submitVersion.setAttribute('href', 'Versiones/0.005/GummyBears.html'); break;
        case 2: submitVersion.setAttribute('href', 'Versiones/0.006/GummyBears.html'); break;
        case 3: submitVersion.setAttribute('href', 'Versiones/0.007/GummyBears.html'); break;
    }
};
//Initialization of the game
load();

window.setInterval(loop, delay);

