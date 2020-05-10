/*---Event de la page---*/
	/*---Evénement de la souris---*/
var _mouseMove = function(evt) {
	var mousePos = getMousePos(canvas, evt);
	switch (gameActived)
	{
		case "Spider" :
			mouseMoveSpider(mousePos) ;
			break ;
	}
}

var _mouseDown = function(evt) {
	var mousePos = getMousePos(canvas, evt);
	switch (gameActived)
	{
		case "Spider" :
			mouseDownSpider(mousePos) ;
			break ;
	}
}

var _mouseUp = function(evt) {
	var mousePos = getMousePos(canvas, evt);
	switch (gameActived)
	{
		case "Spider" :
			mouseUpSpider(mousePos) ;
			break ;
	}
}

	/*---Evénement de l'ecran tactile---*/
var _toucheStart = function (evt) {
	event.preventDefault() //Pour éviter la création d'autre event et event souris

	var touches = evt.changedTouches;
	var x = touches[0].pageX-2 - $("canvas").position().left;
	var y = touches[0].pageY-2 - $("canvas").position().top;

	overButton(x, y);
	downButton(x, y);
}

var _toucheEnd = function (evt) {
	event.preventDefault() //Pour éviter la création d'autre event et event souris

	var touches = evt.changedTouches;
	var x = touches[0].pageX-2 - $("canvas").position().left;
	var y = touches[0].pageY-2 - $("canvas").position().top;
	if(upButton(x, y)){butMoveTo(idButtonPress) ;}
}

var _toucheCancel = function (evt) {
	 event.preventDefault() //Pour éviter la création d'autre event et event souris

	 console.log("Cancel") ;
}

var _toucheMove = function (evt) {
	event.preventDefault() //Pour éviter la création d'autre event et event souris

	var touches = evt.changedTouches;
	var x = touches[0].pageX-2 - $("canvas").position().left;
	var y = touches[0].pageY-2 - $("canvas").position().top;
	overButton(x, y);
}

/*---Action des événement---*/
function overButton(posX, posY){
	var startX ;
	var startY ;
	var endX ;
	var endY ;

	for (var i = 0; i < buttonList.length; i++)
	{
		startY = buttonList[i][2] ;
		endX = buttonList[i][1] + buttonList[i][3];
		endY = buttonList[i][2] + buttonList[i][4];

		if (buttonList[i][0]=="Dropdown"){startX = endX - buttonList[i][4] ;}
		else {startX = buttonList[i][1] ;}

		if (startX <= posX && endX >= posX && startY <= posY && endY >= posY)
		{
			buttonList[i][6] = true ;
			drawButton(i) ;
		}
		else if (buttonList[i][6] == true)
		{
			buttonList[i][6] = false ;
			buttonList[i][7] = false ;
			drawButton(i) ;
		}
	}
}

function downButton(posX, posY){
	var startX ;
	var startY ;
	var endX ;
	var endY ;

	for (var i = 0; i < buttonList.length; i++)
	{
		startY = buttonList[i][2] ;
		endX = buttonList[i][1] + buttonList[i][3];
		endY = buttonList[i][2] + buttonList[i][4];

		if (buttonList[i][0]=="Dropdown"){startX = endX - buttonList[i][4] ;}
		else {startX = buttonList[i][1] ;}

		if (startX <= posX && endX >= posX && startY <= posY && endY >= posY)
		{
			buttonList[i][7] = true ;
			idButtonPress = i ;
			drawButton(i) ;
		}
	}
}

function upButton(posX, posY){
	var startX ;
	var startY ;
	var endX ;
	var endY ;

	if (idButtonPress != null)
	{
		if (buttonList[idButtonPress][0] == "Switch")
		{
			if(buttonList[idButtonPress][5][0] == "Flag")
			{
				if(stateSport == buttonList[idButtonPress][5][0]){stateSport = buttonList[idButtonPress][5][1] ; buttonList[idButtonPress][1] = buttonList[idButtonPress][1]+widthBar-20 ;}
				else if(stateSport == buttonList[idButtonPress][5][1]){stateSport = buttonList[idButtonPress][5][0] ; buttonList[idButtonPress][1] = buttonList[idButtonPress][1]-widthBar+20 ;}
				drawAllButton() ;
			}	
		}

		buttonList[idButtonPress][7] = false ;
		drawButton(idButtonPress) ;

		startY = buttonList[idButtonPress][2] ;
		endX = buttonList[idButtonPress][1] + buttonList[idButtonPress][3];
		endY = buttonList[idButtonPress][2] + buttonList[idButtonPress][4];

		if (buttonList[idButtonPress][0]=="Dropdown"){startX = endX - buttonList[idButtonPress][4] ;}
		else {startX = buttonList[idButtonPress][1] ;}

		if (startX <= posX && endX >= posX && startY <= posY && endY >= posY){return true ;}
		else{idButtonPress = null ;return false ;}
	}
}

/*---Gestion des événements sur le canvas---*/

function addCanvasEvent(){
	canvas.addEventListener('mousemove', _mouseMove, false);
	canvas.addEventListener('mousedown', _mouseDown, false);
	canvas.addEventListener('mouseup', _mouseUp, false);
	//canvas.addEventListener("touchstart", _toucheStart, false);
	//canvas.addEventListener("touchend", _toucheEnd, false);
	//canvas.addEventListener("touchcancel", _toucheCancel, false);
	//canvas.addEventListener("touchleave", _toucheEnd, false);
	//canvas.addEventListener("touchmove", _toucheMove, false);
}

function removeCanvasEvent(){	
	canvas.removeEventListener('mousemove', _mouseMove, false);
	canvas.removeEventListener('mousedown', _mouseDown, false);
	canvas.removeEventListener('mouseup', _mouseUp, false);
	//canvas.removeEventListener("touchstart", _toucheStart, false);
	//canvas.removeEventListener("touchend", _toucheEnd, false);
	//canvas.removeEventListener("touchcancel", _toucheCancel, false);
	//canvas.removeEventListener("touchleave", _toucheEnd, false);
	//canvas.removeEventListener("touchmove", _toucheMove, false);
}

/*---Outils---*/
//Retourne la position de la souris
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return{x: evt.clientX - rect.left, y: evt.clientY - rect.top};
}