var deck ;
var board ;
var deckIsPressed ;
var movingCard ;
var validTab ;

function startSpider(level) {
	var color ;
	var repeat ;
	var temp ;
	var idElem ;

	switch (level) {
		case "easy" :
			color = ["Spades"] ;
			repeat = 8 ;
			break ;
		case "med" :
			color = ["Spades", "Heart"] ;
			repeat = 4 ;
			break ;
		case "hard" :
			color = ["Spades", "Heart", "Club", "Diamond"] ;
			repeat = 2 ;
			break ;
	}

	/*---Remplis le deck de carte---*/
	deck = [] ;
	for (var i = 0; i < repeat; i++) {
		for (var j = 0; j < color.length; j++) {
			for (var k = 1; k < 14; k++) {
				deck[deck.length] = new Card(k, color[j], 20, 20) ;
			}
		}
	}

	/*---Mélange le deck---*/
	for (var i = deck.length-1; i >= 0; i--) {
		idElem = getRandom(i, 0) ;
		temp = deck[idElem] ;
		deck[idElem] = deck[i] ;
		deck[i] = temp ;
	}

	/*---Initialise le plateau---*/
	board = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]] ;
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 10; j++) {
			board[j][i] = deck[deck.length-1] ;
			board[j][i].coordX = 150+(j*70) ;
			board[j][i].coordY = 140+(i*20) ;
			if (j>=4 && i==4){board[j][i].visible = true ;}
			deck.splice(deck.length-1, 1) ;
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i][5] = deck[deck.length-1] ;
		board[i][5].coordX = 150+(i*70) ;
		board[i][5].coordY = 140+(5*20) ;
		board[i][5].visible = true ;
		deck.splice(deck.length-1, 1) ;
	}

	validTab = [] ;

	drawSpider() ;
	addCanvasEvent() ;
}

function startTestSpider(level) {
	var color ;
	var repeat ;
	var temp ;
	var idElem ;

	switch (level) {
		case "easy" :
			color = ["Spades"] ;
			repeat = 8 ;
			break ;
		case "med" :
			color = ["Spades", "Heart"] ;
			repeat = 4 ;
			break ;
		case "hard" :
			color = ["Spades", "Heart", "Club", "Diamond"] ;
			repeat = 2 ;
			break ;
	}

	board = [];
	board[0] = [new Card(11, color[0], 0, 0),
				new Card(12, color[0], 0, 0),
				new Card(1, color[0], 0, 0),
				new Card(2, color[0], 0, 0),
				new Card(3, color[0], 0, 0),
				new Card(4, color[0], 0, 0)
	] ;
	board[1] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(2, color[0], 0, 0),
				new Card(3, color[0], 0, 0),
				new Card(5, color[0], 0, 0)
	] ;
	board[2] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(4, color[0], 0, 0),
				new Card(6, color[0], 0, 0)
	] ;
	board[3] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(5, color[0], 0, 0),
				new Card(7, color[0], 0, 0)
	] ;
	board[4] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(6, color[0], 0, 0),
				new Card(8, color[0], 0, 0),
	] ;
	board[5] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(7, color[0], 0, 0),
				new Card(9, color[0], 0, 0),
	] ;
	board[6] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(8, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
	] ;
	board[7] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(9, color[0], 0, 0),
				new Card(11, color[0], 0, 0),
	] ;
	board[8] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(12, color[0], 0, 0),
	] ;
	board[9] = [new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(10, color[0], 0, 0),
				new Card(13, color[0], 0, 0),
				new Card(13, color[0], 0, 0),
	] ;

	deck = [new Card(10, color[0], 20, 20),
			new Card(10, color[0], 20, 20),
			new Card(10, color[0], 20, 20),
			new Card(10, color[0], 20, 20),
			new Card(10, color[0], 20, 20),
			new Card(10, color[0], 20, 20),
			new Card(10, color[0], 20, 20),
			new Card(10, color[0], 20, 20),
			new Card(10, color[0], 20, 20),
			new Card(1, color[0], 20, 20)
	] ;

	for (var i = 0; i < board.length ; i++) {
		for (var j = 0; j < board[i].length ; j++) {
			board[i][j].coordX = 150+(i*70) ;
			board[i][j].coordY = 140+(j*20) ;
			if (j==board[i].length-1){board[i][j].visible = true ;}
		}
	}

	validTab = [] ;

	drawSpider() ;
	addCanvasEvent() ;
}

function drawSpider() {

	/*---Dessine le fond du jeu---*/
	context.fillStyle = "rgb(6, 98, 59)" ;
	context.fillRect(0, 0, canvas.width, canvas.height) ;

	/*---Dessine la pioche---*/
	if (deck.length!=0){deck[0].drawVerso() ;}

	/*---Dessine validTab---*/
		//Dessine le contour de validTab
	context.strokeStyle = "rgb(255, 255, 255)" ;
	context.lineWidth = 2 ;
	context.strokeRect(canvas.width-316, 20, 296,100) ;
		//Dessine le contenu
	if (validTab.length!=0){for (var i = 0; i < validTab.length; i++){validTab[i][0].drawRecto() ;}}

	/*---Dessine le plateau de carte---*/
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			if (board[i][j].visible){board[i][j].drawRecto() ;}
			else {board[i][j].drawVerso() ;}
		}

		if(board[i].length == 0) {
			context.strokeStyle = "rgb(255, 255, 255)" ;
			context.lineWidth = 2 ;
			context.strokeRect(150+i*70, 140+j*20, widthCard, heightCard) ;
		}
	}

	//Draw moving card
	if (movingCard!=null) {
		for (var i = 0; i < movingCard.length; i++) {
			movingCard[i].drawRecto() ;
		}
	}
}

function testValid(){
	var temp ;
	var iteLoopValid ;
	var isOkLoopValid ;
	var iteruptLoopValid ;

	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			if(board[i][j].visible) {
				if(board[i][j].value==13) {
					temp = board[i][j].value ;
					iteLoopValid = j+1 ;
					isOkLoopValid = false ;
					iteruptLoopValid = false ;

					while(iteLoopValid < board[i].length && !isOkLoopValid && !iteruptLoopValid) {
						if (board[i][iteLoopValid].value == temp-1) {
							temp = board[i][iteLoopValid].value ;
							if (temp == 1) {isOkLoopValid = true ;}
						}
						else {iteruptLoopValid = true ;}
						iteLoopValid++ ;
					}
					
					if (isOkLoopValid) {
						validTab[validTab.length] =  board[i].slice(j) ;
						validTab[validTab.length-1][0].coordX = canvas.width-316+((validTab.length-1)*widthCard/2) ;
						validTab[validTab.length-1][0].coordY = 20 ;

						board[i].splice(j, board[i].length-j) ;
						if (board[i].length != 0) {
							board[i][board[i].length-1].visible = true ;
						}
					}
				}
			}
		}
	}
}

/*---Action utilisateur---*/

function mouseMoveSpider(mousePos){
	if (movingCard!=null)
	{
		for (var i = 0; i < movingCard.length; i++) {
			movingCard[i].coordX = mousePos.x-(widthCard/2) ;
			movingCard[i].coordY = mousePos.y-10+(i*20) ;
		}
		drawSpider() ;
	}
}

function mouseDownSpider(mousePos) {
	var iteLoopCol ;
	var iteLoopLin ;
	var isOkLoopClick ;
	var iteLoopTest ;
	var isOkLoopTest ;
	var temp ;
	var tempStartTab ;

	/*---Vérifie le clique sur la pioche---*/
	if(deck.length!=0){if(deck[0].isOver(mousePos)){deckIsPressed = true ;}}

	/*---Vérifie le clique sur le board---*/
	iteLoopCol = 0 ;
	isOkLoopClick = false ;
	while(iteLoopCol < board.length && !isOkLoopClick) {
		if (board[iteLoopCol].length != 0) {
			iteLoopLin = board[iteLoopCol].length-1 ;
			while(iteLoopLin >= 0 && !isOkLoopClick ) {
				if (board[iteLoopCol][iteLoopLin].visible) {
					if (board[iteLoopCol][iteLoopLin].isOver(mousePos)) {
						if (iteLoopLin == board[iteLoopCol].length-1) {
							movingCard = [board[iteLoopCol][iteLoopLin]];
							tempStartTab = iteLoopCol ; 
							board[iteLoopCol].splice(iteLoopLin, 1) ;

							isOkLoopClick = true ;
						}
						else {
							isOkLoopTest = false ;
							iteLoopTest = iteLoopLin+1 ;
							temp = board[iteLoopCol][iteLoopLin].value ;
							while(!isOkLoopTest && iteLoopTest < board[iteLoopCol].length) {
								if (board[iteLoopCol][iteLoopTest].value == temp-1) {
									if (iteLoopTest == board[iteLoopCol].length-1) {
										movingCard = board[iteLoopCol].slice(iteLoopLin) ;
										tempStartTab = iteLoopCol ;
										board[iteLoopCol].splice(iteLoopLin, board[iteLoopCol].length-iteLoopLin) ;
										isOkLoopTest = true ;

										isOkLoopClick = true ;
									}
									else{temp = board[iteLoopCol][iteLoopTest].value ;}
								}
								iteLoopTest++ ;
							}
						}
					}
				}
				iteLoopLin-- ;
			}
		}
		iteLoopCol++ ;
	}

	/*---Paramètre les données des cartes dans movingCard---*/
	if (movingCard != null) {
		for (var k = 0; k < movingCard.length; k++) {
			movingCard[k].coordX = mousePos.x-(widthCard/2) ;
			movingCard[k].coordY = mousePos.y-10+(k*20) ;
			movingCard[k].startTab = tempStartTab ;
		}			
	}
	drawSpider() ;
}

function mouseUpSpider(mousePos) {
	var iteLoopDeck ;
	var isOkLoopDeck ;

	if (deckIsPressed) {
		if(deck[0].isOver(mousePos)) {
			iteLoopDeck = 0 ;
			isOkLoopDeck = false ;
			while(iteLoopDeck < board.length && !isOkLoopDeck) {
				if(board[iteLoopDeck].length == 0){isOkLoopDeck=true ;}
				iteLoopDeck++ ;
			}
			if (!isOkLoopDeck) {
				for (var i = 0; i < board.length; i++) {
					board[i][board[i].length] = deck[deck.length-1] ;
					board[i][board[i].length-1].coordX = 150+(i*70) ;
					board[i][board[i].length-1].coordY = 140+((board[i].length-1)*20) ;
					board[i][board[i].length-1].visible = true ;
					deck.splice(deck.length-1, 1) ;
				}
			}
		}
		deckIsPressed = false ;
	}

	if (movingCard != null) {
		/*---Vérifie le clique sur le board---*/
		for (var i = 0; i < board.length; i++) {
			if(board[i] != 0)
			{	
				if (mousePos.x>=board[i][0].coordX && mousePos.y>=board[i][0].coordY && mousePos.x<=(board[i][0].coordX+widthCard) && mousePos.y<=board[i][0].coordY+(board[i].length*20)+heightCard) {
					if (board[i][board[i].length-1].value==movingCard[0].value+1) {
						if (board[movingCard[0].startTab].length != 0) {board[movingCard[0].startTab][board[movingCard[0].startTab].length-1].visible = true ;}
						for (var j = 0; j < movingCard.length; j++) {
							board[i].push(movingCard[j]) ;
							board[i][board[i].length-1].coordX = 150+(i*70) ;
							board[i][board[i].length-1].coordY = 140+((board[i].length-1)*20) ;
							board[i][board[i].length-1].startTab = null ;
						}
						movingCard = null ;
					}	
				}
			}
			else {
				if (mousePos.x>=(150+(i*70)) && mousePos.y>=140&& mousePos.x<=(150+(i*70)+widthCard)) {
					if (board[movingCard[0].startTab].length != 0) {board[movingCard[0].startTab][board[movingCard[0].startTab].length-1].visible = true ;}
					board[i]= [movingCard[0]] ;
					board[i][board[i].length-1].coordX = 150+(i*70) ;
					board[i][board[i].length-1].coordY = 140+((board[i].length-1)*20) ;
					board[i][board[i].length-1].startTab = null ;
					for (var j = 1; j < movingCard.length; j++) {
						board[i].push(movingCard[j]) ;
						board[i][board[i].length-1].coordX = 150+(i*70) ;
						board[i][board[i].length-1].coordY = 140+((board[i].length-1)*20) ;
						board[i][board[i].length-1].startTab = null ;
					}
					movingCard = null ;
				}
			}
		}
	}

	if (movingCard!=null) {
		for (var i = 0; i < movingCard.length; i++) {
			if(board[movingCard[i].startTab] == null){board[movingCard[i].startTab] = [movingCard[i]] ;}
			else{board[movingCard[i].startTab].push(movingCard[i]) ;}
			board[movingCard[i].startTab][board[movingCard[i].startTab].length-1].coordX = 150+(movingCard[i].startTab*70) ;
			board[movingCard[i].startTab][board[movingCard[i].startTab].length-1].coordY = 140+((board[movingCard[i].startTab].length-1)*20) ;
			board[movingCard[i].startTab][board[movingCard[i].startTab].length-1].startTab = null ;
		}
		movingCard = null ;
	}

	testValid() ;

	drawSpider() ;
}