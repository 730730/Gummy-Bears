/**Version 0.005*/ var GmB = {cantidad: 0, perSec: 1};
    


function Upgrade (pb, ps) {
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
    this.precio = Math.ceil(this.precioBase*Math.pow(1.15, this.cantidad));
    evitarNegs();
};

function loop() {
    GmB.cantidad = GmB.cantidad + GmB.perSec;
    updateGmB();
    evitarNegs();
}

var upg = new Upgrade(10, 1);
var gmb = document.getElementById('gmb');
var ps = document.getElementById('ps');
var boton1 = document.getElementById("boton1");
var precio1 = document.getElementById("precio1");
boton1.disabled = true;
window.setInterval(loop, 1000);

function updateGmB() {
    gmb.innerHTML = 'Gummy Bears: ' + GmB.cantidad;
}

function updateGmBPs() {
    ps.innerHTML = 'Gummy Bears per second: ' + GmB.perSec;
}

function evitarNegs() {
    boton1.disabled = GmB.cantidad < upg.precio;
}

boton1.onclick = function() {
    upg.comprar();
    precio1.innerHTML = 'Price: ' + upg.precio + ' GmB';
};


