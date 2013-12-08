/**Version 0.007*/ var GmB = {cantidad: 0, perSec: 1};



function Upgrade(pb, ps) {
    this.precioBase = pb;
    this.perSec = ps;
    this.cantidad = 0;
    this.precio = pb;
}

Upgrade.prototype.comprar = function() {
    GmB.cantidad = GmB.cantidad - this.precio;
    GmB.perSec = GmB.perSec + this.perSec;
    this.cantidad++;
    updateGmB();
    updateGmBPs();
    this.precio = Math.ceil(this.precioBase * Math.pow(1.15, this.cantidad));
    evitarNegs();
};

function loop() {
    GmB.cantidad = GmB.cantidad + GmB.perSec;
    updateGmB();
    evitarNegs();
    /*if (typeof saveGmB === 'undefined') {
        GmB.cantidad = 0;
        GmB.perSec = 1;
        upg.precio = 10;
    }*/
}

var upg = new Upgrade(10, 1);
var gmb = document.getElementById('gmb');
var ps = document.getElementById('ps');
var botonUpg = document.getElementById("botonUpg");
var botonSave = document.getElementById('saveButton');
var botonDeleteSave = document.getElementById('deleteSaveButton');
var precio1 = document.getElementById("precio1");
botonUpg.disabled = true;
//window.setInterval(loop, 1000);

function updateGmB() {
    gmb.innerHTML = 'Gummy Bears: ' + GmB.cantidad;
}

function updateGmBPs() {
    ps.innerHTML = 'Gummy Bears per second: ' + GmB.perSec;
}

function updatePrecioUpgrade() {
    precio1.innerHTML = 'Price: ' + upg.precio + ' GmB';
}

function update() {
    updateGmB();
    updateGmBPs();
    updatePrecioUpgrade();
}

function evitarNegs() {
    botonUpg.disabled = GmB.cantidad < upg.precio;
}

function save() {
     localStorage['GmB0.007'] = GmB.cantidad;
     localStorage['GmBPs0.007'] = GmB.perSec;
     localStorage['costoUpgrade0.007'] = upg.precio;
     localStorage['cantidadUpgrade0.007'] = upg.cantidad;
}

function load() {
    /*if (typeof saveGmB === 'undefined') {
        GmB.cantidad = 0;
        GmB.perSec = 1;
        upg.precio = 10;
    }*/
    GmB.cantidad = parseInt(localStorage['GmB0.007']);
    GmB.perSec = parseInt(localStorage['GmBPs0.007']);
    upg.precio = parseInt(localStorage['costoUpgrade0.007']);
    upg.cantidad = parseInt(localStorage['cantidadUpgrade0.007']);
    update();
}

function deleteSave() {
    var alertaSave1 = confirm('Are you sure you want to delete your save?');
    if (alertaSave1 === true) {
        var alertaSave2 = confirm('ARE YOU SURE THAT YOU ARE SURE?');
    }
    if (alertaSave2 === true) {
        localStorage['GmB0.007'] = 0;
        localStorage['GmBPs0.007'] = 1;
        localStorage['costoUpgrade0.007'] = 10;
        localStorage['cantidadUpgrade0.007'] = 0;
        load();
    }
}

botonUpg.onclick = function() {
    upg.comprar();
    precio1.innerHTML = 'Price: ' + upg.precio + ' GmB';
};

botonSave.onclick = function() {
    save();
};

botonDeleteSave.onclick = function() {
    deleteSave();
};

load();
window.setInterval(loop, 1000);

