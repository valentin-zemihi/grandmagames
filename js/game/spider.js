var COORDDECK = [] ; //[0-x, 1-y]
var COORDFIRSTCARD = [] ; //[0-x, 1-y]
var COORDVALIDZONE = [] ; //[0-x, 1-y]
var COORDBACKZONE = [] ;
var GAPHEIGHTSTACK = 20 ;
var GAPWIDTHSTACK = 15 ;

var sizeBackZone = 50 ;

var deck ;
var board ;
var deckIsPressed ;
var movingCard ;
var validTab ;

/*[id de l'action][0-Point de départ, 0 = "deck" après un clique sur le paquet de carte, 0 = "valid" après une réussite
					1-Nombre de carte, 
					2-Point d'arrivé, 
					3-La carte du paquet de départ était révélée (bool), 
]*/ 
var saveTab ;
var backButtIsOver = false ;
var backButtIsPress = false ;

function startSpider(level) {
	var color ;
	var repeat ;
	var temp ;
	var idElem ;

	/*---Initialisie les constantes---*/
	COORDDECK = [20, canvas.height-heightCard-20] ;
	COORDFIRSTCARD = [20+widthCard+100,20] ;
	COORDVALIDZONE = [20, 20] ;
	COORDBACKZONE = [canvas.width-20-sizeBackZone, canvas.height-20-sizeBackZone]

	/*---Initialise les variables du jeu---*/
	validTab = [] ;
	saveTab = [] ;
	movingCard = [] ;

	/*---Paramètre les variables de créeation du jeu en fonction de la difficulté---*/
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
				deck[deck.length] = new Card(k, color[j], COORDDECK[0], COORDDECK[1]) ;
			}
		}
	}

	/*---Mélange le deck---*/

	deck = shuffleArray(deck) ;

	/*---Initialise le plateau---*/
	board = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]] ;
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 10; j++) {
			board[j][i] = deck[deck.length-1] ;
			board[j][i].coordX = COORDFIRSTCARD[0]+(j*70) ;
			board[j][i].coordY = COORDFIRSTCARD[1]+(i*GAPHEIGHTSTACK) ;
			if (j >= 4 && i == 4){board[j][i].visible = true ;}
			deck.splice(deck.length-1, 1) ;
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i][5] = deck[deck.length-1] ;
		board[i][5].coordX = COORDFIRSTCARD[0]+(i*70) ;
		board[i][5].coordY = COORDFIRSTCARD[1]+(5*GAPHEIGHTSTACK) ;
		board[i][5].visible = true ;
		deck.splice(deck.length-1, 1) ;
	}

	/*---Dessine le jeu---*/
	drawSpider() ;

	/*---Ajoute les événements du jeu au canvas---*/
	addCanvasEvent() ;
}

function startTestSpider(level) {
	console.log("La fonction test de Spider est vide.") ;
}

function drawSpider() {

	/*---Dessine le fond du jeu---*/
	context.fillStyle = "rgb(6, 98, 59)" ;
	context.fillRect(0, 0, canvas.width, canvas.height) ;

	/*---Dessine la pioche---*/
	if (deck.length!=0) {
		context.save() ;
		for (var i = 0; i < deck.length; i+=10) {
			deck[i].drawVerso() ;
			context.translate(GAPWIDTHSTACK,0) ;
		}
		context.restore() ;
	}

	/*---Dessine validTab---*/
	//Dessine le contour de validTab
	context.strokeStyle = "rgb(255, 255, 255)" ;
	context.lineWidth = 2 ;
	context.strokeRect(COORDVALIDZONE[0], COORDVALIDZONE[1], widthCard, 7*GAPHEIGHTSTACK+heightCard) ;
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
			context.strokeRect(COORDFIRSTCARD[0]+i*70, COORDFIRSTCARD[1]+j*GAPHEIGHTSTACK, widthCard, heightCard) ;
		}
	}

	/*---Dessine les cartes sélectionnées---*/
	for (var i = 0; i < movingCard.length; i++) {movingCard[i].drawRecto() ;}

	/*---Dessine le bouton retour arrière---*/
	if (saveTab != 0 ) {
		if(backButtIsOver && backButtIsPress) {
			context.fillStyle = "rgb(255, 255, 255)" ;
			context.fillRect(COORDBACKZONE[0]-2, COORDBACKZONE[1]-2, sizeBackZone+4, sizeBackZone+4) ;
			context.strokeStyle = "rgb(0,0,0)" ;
			context.fillStyle = "rgb(0,0,0)" ;
		}
		else if (backButtIsOver) {
			context.fillStyle = "rgb(255, 255, 255)" ;
			context.fillRect(COORDBACKZONE[0]-2, COORDBACKZONE[1]-2, sizeBackZone+4, sizeBackZone+4) ;
			context.strokeStyle = "rgb(6, 98, 59)" ;
			context.fillStyle = "rgb(6, 98, 59)" ;
		}
		else {
			context.strokeStyle = "rgb(255, 255, 255)" ;
			context.fillStyle = "rgb(255, 255, 255)" ;
		}
		context.lineWidth = 2 ;
		context.strokeRect(COORDBACKZONE[0], COORDBACKZONE[1], sizeBackZone, sizeBackZone) ;
		context.beginPath() ;
		//Dessin de la flèche back du haut de la point A, par la pointe B, une lettre par intersection
		context.moveTo(COORDBACKZONE[0]-5+sizeBackZone/2, COORDBACKZONE[1]+10) ; //A
		context.lineTo(COORDBACKZONE[0]+5, COORDBACKZONE[1]+sizeBackZone/2) ; //A-B
		context.lineTo(COORDBACKZONE[0]-5+sizeBackZone/2, COORDBACKZONE[1]+sizeBackZone-10) ; //B-C
		context.lineTo(COORDBACKZONE[0]-5+sizeBackZone/2, COORDBACKZONE[1]+(sizeBackZone/2)+5) ; //C-D
		context.lineTo(COORDBACKZONE[0]+sizeBackZone-5, COORDBACKZONE[1]+(sizeBackZone/2)+5) ; //D-E
		context.lineTo(COORDBACKZONE[0]+sizeBackZone-5, COORDBACKZONE[1]+(sizeBackZone/2)-5) ; //E-F
		context.lineTo(COORDBACKZONE[0]-5+sizeBackZone/2, COORDBACKZONE[1]+(sizeBackZone/2)-5) ; //F-G
		context.lineTo(COORDBACKZONE[0]-5+sizeBackZone/2, COORDBACKZONE[1]+10) ; //G-A
		context.fill() 
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
						validTab[validTab.length-1][0].coordX = COORDVALIDZONE[0] ;
						validTab[validTab.length-1][0].coordY = COORDVALIDZONE[1]+(validTab.length-1)*GAPHEIGHTSTACK ;

						board[i].splice(j, board[i].length-j) ;
						saveTab[saveTab.length] = ["valid", null, i] ;
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
	for (var i = 0; i < movingCard.length; i++) {
			movingCard[i].coordX = mousePos.x-(widthCard/2) ;
			movingCard[i].coordY = mousePos.y-10+(i*GAPHEIGHTSTACK) ;
		}
	if (movingCard.length != 0) {drawSpider()} ;

	if (saveTab.length != 0)
	{
		if (mousePos.x >= COORDBACKZONE[0]-2 && mousePos.y >= COORDBACKZONE[1]-2 && mousePos.x <= COORDBACKZONE[0]+sizeBackZone+2 && mousePos.y <= COORDBACKZONE[1]+sizeBackZone+2) {
			backButtIsOver = true ;
			drawSpider()
		}
		else if (backButtIsOver) {
			backButtIsOver = false ;
			drawSpider()
		}
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

	if (backButtIsOver) {backButtIsPress = true ;}

	/*---Test le clique sur la pioche---*/
	if(deck.length!=0) {
		temp = (deck.length/10)-1 ;
		temp = GAPWIDTHSTACK*temp+COORDDECK[0]+widthCard ;
		if(mousePos.x >= COORDDECK[0] && mousePos.y >= COORDDECK[1] && mousePos.x <= temp && mousePos.y <= COORDDECK[1]+heightCard) {
			deckIsPressed = true ;
		}
	}

	/*---Test le clique sur le plateau---*/
	//Commence par la colone (LoopCol)
	iteLoopCol = 0 ;
	isOkLoopClick = false ;
	while(iteLoopCol < board.length && !isOkLoopClick) {
		//Vérifie si la colone n'est pas vide
		if (board[iteLoopCol].length != 0) {
			//Test chaque carte de la colonne en partant par la fin (LoopLin)
			iteLoopLin = board[iteLoopCol].length-1 ;
			while(iteLoopLin >= 0 && !isOkLoopClick ) {
				//Test si la carte est visible
				if (board[iteLoopCol][iteLoopLin].visible) {
					//Test si la souris est sur la carte
					if (board[iteLoopCol][iteLoopLin].isOver(mousePos)) {
						if (iteLoopLin == board[iteLoopCol].length-1) {
							movingCard = [board[iteLoopCol][iteLoopLin]];
							tempStartTab = iteLoopCol ; 
							board[iteLoopCol].splice(iteLoopLin, 1) ;
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
									}
									else{temp = board[iteLoopCol][iteLoopTest].value ;}
								}
								else{isOkLoopTest = true ;}
								iteLoopTest++ ;
							}
						}
						isOkLoopClick = true ;
					}
				}
				iteLoopLin-- ;
			}
		}
		iteLoopCol++ ;
	}

	/*---Paramètre les données des cartes dans movingCard---*/
	for (var k = 0; k < movingCard.length; k++) {
		movingCard[k].coordX = mousePos.x-(widthCard/2) ;
		movingCard[k].coordY = mousePos.y-10+(k*GAPHEIGHTSTACK) ;
		movingCard[k].startTab = tempStartTab ;
	}

	/*---Dessine le jeu---*/		
	drawSpider() ;
}

function mouseUpSpider(mousePos) {
	var iteLoopDeck ;
	var isOkLoopDeck ;
	var idCardBack ;
	var idColStartBack ;
	var idColEndBack ;

	/*---Action sur le bouton retour en arrière---*/
	if (backButtIsOver && backButtIsPress) 
	{
		switch (saveTab[saveTab.length-1][0]) {
			case "deck" :
				for (var i = board.length-1; i >= 0; i--) {
					deck.push(board[i][board[i].length-1]) ;
					deck[deck.length-1].coordX = COORDDECK[0] ;
					deck[deck.length-1].coordY = COORDDECK[1] ;
					board[i].splice(board[i].length-1, 1) ;
				}
				break ;
			case "valid" :
			/*---Action : Annule la mise dans la colonne valid---*/
				for (var i = 0; i < validTab[validTab.length-1].length; i++) {
					board[saveTab[saveTab.length-1][2]].push(validTab[validTab.length-1][i]) ;
					board[saveTab[saveTab.length-1][2]][board[saveTab[saveTab.length-1][2]].length-1].coordX = COORDFIRSTCARD[0]+(saveTab[saveTab.length-1][2]*70);
					board[saveTab[saveTab.length-1][2]][board[saveTab[saveTab.length-1][2]].length-1].coordY = COORDFIRSTCARD[1]+((board[saveTab[saveTab.length-1][2]].length-1)*GAPHEIGHTSTACK);
					
				}
				validTab.splice(validTab.length-1, 1) ;
				
				/*---Retire la dernière entrée de sauvegarde---*/
				saveTab.splice(saveTab.length-1, 1) ;

			default :
			/*---Action : Annule le coup précédent---*/

				idColStartBack = saveTab[saveTab.length-1][0] ;
				idColEndBack = saveTab[saveTab.length-1][2] ;
				idCardBack = board[idColEndBack].length - saveTab[saveTab.length-1][1] ;
	
				/*---Cache la carte précédement cachée---*/
				//Vérifie si la colone n'est pas vide
				if (board[idColStartBack].length != 0) {
					if (saveTab[saveTab.length-1][3]) {
						board[idColStartBack][board[idColStartBack].length-1].visible = false ;
					}
				}
	
				/*---Replace les cartes dans la colonne précédente---*/
				while (idCardBack < board[idColEndBack].length) 
				{
					board[idColStartBack].push(board[idColEndBack][idCardBack]) ;
					board[idColStartBack][board[idColStartBack].length-1].coordX = COORDFIRSTCARD[0]+(idColStartBack*70);
					board[idColStartBack][board[idColStartBack].length-1].coordY = COORDFIRSTCARD[1]+((board[idColStartBack].length-1)*GAPHEIGHTSTACK);
					board[idColEndBack].splice(idCardBack, 1) ;	
				}
				break ;
		} 

		/*---Retire la dernière entrée de sauvegarde---*/
		saveTab.splice(saveTab.length-1, 1) ;
		//Test si le tableau de sauvegarde est vide : 
		if (saveTab.length == 0) {
			//Si oui : Change la variable du mouse over (le bouton disparaît)
			backButtIsOver = false ;
		}
		backButtIsPress = false ;
	}
	else if (backButtIsPress) {
		backButtIsPress = false ;
	}

	/*---Action si le relâchement est sur le deck---*/
	if (deckIsPressed) {
		//Vérifie si la souris est toujours sur le deck
		temp = (deck.length/10)-1 ;
		temp = GAPWIDTHSTACK*temp+COORDDECK[0]+widthCard ;
		if(mousePos.x >= COORDDECK[0] && mousePos.y >= COORDDECK[1] && mousePos.x <= temp && mousePos.y <= COORDDECK[1]+heightCard) {
			//Vérifie si toute les colonnes sont pleines
			iteLoopDeck = 0 ;
			isOkLoopDeck = false ;
			while(iteLoopDeck < board.length && !isOkLoopDeck) {
				if(board[iteLoopDeck].length == 0){isOkLoopDeck=true ;}
				iteLoopDeck++ ;
			}
			//Exécute l'action si les les colonnes sont pleines
			if (!isOkLoopDeck) {
				//Distribue une carte sur chaque colonne
				for (var i = 0; i < board.length; i++) {
					board[i].push(deck[deck.length-1]) ;
					board[i][board[i].length-1].coordX = COORDFIRSTCARD[0]+(i*70) ;
					board[i][board[i].length-1].coordY = COORDFIRSTCARD[1]+((board[i].length-1)*GAPHEIGHTSTACK) ;
					board[i][board[i].length-1].visible = true ;
					deck.splice(deck.length-1, 1) ;
				}
				//Ajoute l'action à la sauvegarde
				saveTab[saveTab.length] = ["deck"] ;
			}
		}
		deckIsPressed = false ;
	}

	/*---Action si le relachement est sur le plateau---*/
	if (movingCard.length != 0) {
		//Vérifie le clique sur le board
		for (var i = 0; i < board.length; i++) {
			//Vérifie si la colone n'est pas vide
			if(board[i] != 0)
			{	
				//Vérifie si la souris est sur la pile de carte
				if (mousePos.x>=board[i][0].coordX && mousePos.y>=board[i][0].coordY && mousePos.x<=(board[i][0].coordX+widthCard) && mousePos.y<=board[i][0].coordY+(board[i].length*GAPHEIGHTSTACK)+heightCard) {
					//Vérifie si la première carte de movingCard et la dernière carte de la colone se suive
					if (board[i][board[i].length-1].visible && board[i][board[i].length-1].value==movingCard[0].value+1) {
						//Ajout de la sauvegarde
						saveTab[saveTab.length] = [movingCard[0].startTab, movingCard.length, i] ;
						//Révèle la carte sous le paquet précédent
						if (board[movingCard[0].startTab].length != 0) {
							if(board[movingCard[0].startTab][board[movingCard[0].startTab].length-1].visible) {saveTab[saveTab.length-1][3] = false ;}
							else {
								board[movingCard[0].startTab][board[movingCard[0].startTab].length-1].visible = true ;
								saveTab[saveTab.length-1][3] = true ;
							}	
						}

						//Ajoute les carte à la colone
						for (var j = 0; j < movingCard.length; j++) {
							board[i].push(movingCard[j]) ;
							board[i][board[i].length-1].coordX = COORDFIRSTCARD[0]+(i*70) ;
							board[i][board[i].length-1].coordY = COORDFIRSTCARD[1]+((board[i].length-1)*GAPHEIGHTSTACK) ;
							board[i][board[i].length-1].startTab = null ;
						}

						movingCard = [] ;
					}	
				}
			}
			else {
				//Vérifie si la souris est dans la colonne vide
				if (mousePos.x >= (COORDFIRSTCARD[0]+(i*70)) && mousePos.y >= COORDFIRSTCARD[1] && mousePos.x <= (COORDFIRSTCARD[0]+(i*70)+widthCard)) {
					//Ajout de la sauvegarde
					saveTab[saveTab.length] = [movingCard[0].startTab, movingCard.length, i] ;
					//Révèle la carte sous le paquet précédent
					if (board[movingCard[0].startTab].length != 0) {
						if(board[movingCard[0].startTab][board[movingCard[0].startTab].length-1].visible) {saveTab[saveTab.length-1][3] = false ;}
						else {
							board[movingCard[0].startTab][board[movingCard[0].startTab].length-1].visible = true ;
							saveTab[saveTab.length-1][3] = true ;
						}	
					}

					board[i]= [movingCard[0]] ;
					board[i][board[i].length-1].coordX = COORDFIRSTCARD[0]+(i*70) ;
					board[i][board[i].length-1].coordY = COORDFIRSTCARD[1]+((board[i].length-1)*GAPHEIGHTSTACK) ;
					board[i][board[i].length-1].startTab = null ;
					for (var j = 1; j < movingCard.length; j++) {
						board[i].push(movingCard[j]) ;
						board[i][board[i].length-1].coordX = COORDFIRSTCARD[0]+(i*70) ;
						board[i][board[i].length-1].coordY = COORDFIRSTCARD[1]+((board[i].length-1)*GAPHEIGHTSTACK) ;
						board[i][board[i].length-1].startTab = null ;
					}

					movingCard = [] ;
				}
			}
		}
	}

	if (movingCard!=null) {
		for (var i = 0; i < movingCard.length; i++) {
			if(board[movingCard[i].startTab] == null){board[movingCard[i].startTab] = [movingCard[i]] ;}
			else{board[movingCard[i].startTab].push(movingCard[i]) ;}
			board[movingCard[i].startTab][board[movingCard[i].startTab].length-1].coordX = COORDFIRSTCARD[0]+(movingCard[i].startTab*70) ;
			board[movingCard[i].startTab][board[movingCard[i].startTab].length-1].coordY = COORDFIRSTCARD[1]+((board[movingCard[i].startTab].length-1)*GAPHEIGHTSTACK) ;
			board[movingCard[i].startTab][board[movingCard[i].startTab].length-1].startTab = null ;
		}
		movingCard = [] ;
	}

	testValid() ;

	drawSpider() ;
}

/*---Outils---*/
function shuffleArray(tab) {
	var temp ;
	var tempTab = tab ;
	var idElem ;

	for (var i = tempTab.length-1; i >= 0; i--) {
		idElem = getRandom(i, 0) ;
		temp = tempTab[idElem] ;
		tempTab[idElem] = tempTab[i] ;
		tempTab[i] = temp ;
	}

	return tempTab ;
}