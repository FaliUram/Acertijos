/*Programacion en javaScript*/
var piezas = document.getElementsByClassName('movil');

//recorrido piezas mediante setattribute
for(var i=0;i<piezas.length;i++){
	piezas[i].setAttribute("width", 100);
	piezas[i].setAttribute("height",80);
    piezas[i].setAttribute("x", Math.floor((Math.random() * 550) + 640));
	piezas[i].setAttribute("y", Math.floor((Math.random() * 9) + 1));
    //moviento onmousedown
    piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)");
}

//variables para almacenar inf movi
var elementSelect = 0;  
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

//funcion seleccionar elemento
function seleccionarElemento(evt) {
	elementSelect = reordenar(evt);//almacenamiento de cada pieza'event'
	currentX = evt.clientX;        //se guarda posicion del mouse cuando se da click
	currentY = evt.clientY;        //se guarda posicion del mouse cuando se da click
	currentPosx = parseFloat(elementSelect.getAttribute("x"));  //se obtiene valor de la posicion mediante get attribute  
	currentPosy = parseFloat(elementSelect.getAttribute("y"));  //se obtiene valor de la posicion
    elementSelect.setAttribute("onmousemove","moverElemento(evt)");//agragamos evento, para llamar funcion mover elementos 
}
// funcion mover elemento
function moverElemento(evt){
    //se calcula diferencia entre ouse y actual
	var dx = evt.clientX - currentX;
	var dy = evt.clientY - currentY;
    //se agraga posicion a estas variables
	currentPosx = currentPosx + dx;
	currentPosy = currentPosy + dy;
    //se actualiza posicion mediante setAttribute
	elementSelect.setAttribute("x",currentPosx);
	elementSelect.setAttribute("y",currentPosy);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
	elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");
	iman();
}

//funcion desselccionr elemento
function deseleccionarElemento(evt){
	testing();
	if(elementSelect != 0){			
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
}


var entorno = document.getElementById('entorno');

function reordenar(evt){
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}


var origX = [200,304,466,200,333,437,200,304,466];   
var origY = [100,100,100,233,204,233,337,366,337];

//para que la pieza quede fija a un punto
function iman(){
	for(var i=0;i<piezas.length;i++){
		if (Math.abs(currentPosx-origX[i])<15 && Math.abs(currentPosy-origY[i])<15) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}

var win = document.getElementById("win");

function testing() {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for(var i=0;i<piezas.length;i++){
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));    
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			bien_ubicada = bien_ubicada + 1;
		}
	}
	if(bien_ubicada == 20){
		win.play();
	}
}

/**
 * Encuentra las opciones correctas
 */
function  findCorrectAnswer() {
	
}

