var LISTGAME ; //contient la liste des jeux
var detailActived ; //sauvegarde l'id de la div détaillée
var gamesActived ; //sauvegarde le jeu activé

var canvas ;
var context ;

window.onload = function()
{
	initListGame() ; //Initialise la liste des jeux

	setHomeHtml() ; //remplit la page web
}

function initListGame() {
	LISTGAME = [] ;

	LISTGAME[LISTGAME.length] = new Game("Spider", "Spider Solitaire", null, "Card", "Spider est un jeu de cartes de type réussite.", "1 couleur", "desc_med", "desc_hard") ;
}

function setHomeHtml() {
	var element ;
	var tempTxt ;
	var listCategory = [] ;
	var isFind ;
	var loopIte ;

	$("#base").empty() ;

	element = document.createElement("div") ;
	element.className = "row" ;
	element.id = "zoneHead" ;
	document.getElementById("base").appendChild(element) ;

		element = document.createElement("div") ;
		element.className = "col-xs-6 col-sm-6 col-md-6" ;
		element.id = "zoneTitle" ;
		document.getElementById("zoneHead").appendChild(element) ;

			element = document.createElement("div") ;
			element.className = "row" ;
			element.id = "zoneTitleRow" ;
			document.getElementById("zoneTitle").appendChild(element) ;

				element = document.createElement("div") ;
				element.className = "col-xs-3 col-sm-3 col-md-3" ;
				element.id = "titleLogo" ;
				document.getElementById("zoneTitleRow").appendChild(element) ;

					element = document.createElement("div") ;
					element.className = "logo" ;
					document.getElementById("titleLogo").appendChild(element) ;

				element = document.createElement("div") ;
				element.className = "col-xs-9 col-sm-9 col-md-9 vertCenter title" ;
				element.id = "titleTxt" ;
				tempTxt = document.createTextNode("Grandma Games") ;
				element.appendChild(tempTxt) ;
				document.getElementById("zoneTitleRow").appendChild(element) ;

		element = document.createElement("div") ;
		element.className = "col-xs-6 col-sm-6 col-md-6" ;
		element.id = "zoneProfil" ;
		document.getElementById("zoneHead").appendChild(element) ;

			element = document.createElement("div") ;
			element.className = "row" ;
			element.id = "zoneProfilRow" ;
			document.getElementById("zoneProfil").appendChild(element) ;

				element = document.createElement("div") ;
				element.className = "col-xs-9 col-sm-9 col-md-9"
				element.id = "zoneProfilTxt" ;
				document.getElementById("zoneProfilRow").appendChild(element) ;

					element = document.createElement("div") ;
					element.className = "row namePlayer vertCenter" ;
					element.id = "profilName" ;
					tempTxt = document.createTextNode("Grandma Player") ;
					element.appendChild(tempTxt) ;
					document.getElementById("zoneProfilTxt").appendChild(element) ;

					element = document.createElement("div") ;
					element.className = "row linkPlayer vertCenter" ;
					element.id = "profilLink" ;
					document.getElementById("zoneProfilTxt").appendChild(element) ;

						element = document.createElement("a") ;
						tempTxt = document.createTextNode("Accéder au profil") ;
						element.appendChild(tempTxt) ;
						document.getElementById("profilLink").appendChild(element) ;

				element = document.createElement("div") ;
				element.className = "col-xs-3 col-sm-3 col-md-3" ;
				element.id = "zoneProfilImg" ;
				document.getElementById('zoneProfilRow').appendChild(element) ;

					element = document.createElement("div") ;
					element.className = "logoPlayer" ;
					element.id = "profilImg" ;
					document.getElementById("zoneProfilImg").appendChild(element) ;

	element = document.createElement("div") ;
	element.className = "row" ;
	element.id = "zoneGames" ;
	document.getElementById("base").appendChild(element) ;

	for (var i = 0; i < LISTGAME.length; i++) {
		if(document.getElementById("zone"+LISTGAME[i].category+"Games") == null)
		{
			element = document.createElement("div") ;
			element.className = "row" ;
			element.id = "zone"+LISTGAME[i].category+"Games" ;
			document.getElementById("zoneGames").appendChild(element) ;

				element = document.createElement("div") ;
				element.className = "row vertCenter titleCategory" ;
				element.id = "title"+LISTGAME[i].category+"Games" ;
				switch (LISTGAME[i].category) {
					case 'Card' :
						tempTxt = document.createTextNode("Jeu de carte");
						break ;
					case 'Memory' :
						tempTxt = document.createTextNode("Jeu de mémoire");
						break ;
				}
				element.appendChild(tempTxt) ;
				document.getElementById("zone"+LISTGAME[i].category+"Games").appendChild(element) ;

				listCategory[listCategory.length] = [LISTGAME[i].category, -1]
		}

		isFind = false ;
		loopIte = 0 ;

		while (!isFind && loopIte <= LISTGAME.length)
		{
			if (LISTGAME[i].category == listCategory[loopIte][0])
			{
				listCategory[loopIte][1] += 1 ;
				isFind = true ;
			}
			else{loopIte++ ;}
		}

		if (document.getElementById("list"+LISTGAME[i].category+"Games"+(Math.floor(listCategory[loopIte][1]/4))) == null){
			element = document.createElement("div") ;
			element.className = "row" ;
			element.id = "list"+LISTGAME[i].category+"Games"+(Math.floor(listCategory[loopIte][1]/4)) ;
			document.getElementById("zone"+LISTGAME[i].category+"Games").appendChild(element) ;
		}

		

			element = document.createElement("div") ;
			element.className = "col-xs-3 col-sm-3 col-md-3 card" ;
			element.id = "zone"+LISTGAME[i].tag ;
			document.getElementById("list"+LISTGAME[i].category+"Games"+(Math.floor(listCategory[loopIte][1]/4))).appendChild(element) ;

				element = document.createElement("div") ;
				element.id = "heading"+LISTGAME[i].tag ;
				$("#zone"+LISTGAME[i].tag).append(element) ;
				$("#heading"+LISTGAME[i].tag).attr("data-toggle", "collapse") ;
				$("#heading"+LISTGAME[i].tag).attr("data-target", "#detail"+LISTGAME[i].tag) ;
				$("#heading"+LISTGAME[i].tag).attr("aria-expanded", "false") ;
				$("#heading"+LISTGAME[i].tag).attr("aria-controls", "detail"+LISTGAME[i].tag) ;

					element = document.createElement("div") ;
					element.id = "vignette"+LISTGAME[i].tag ;
					element.className = "vignette" ;
					$("#heading"+LISTGAME[i].tag).append(element) ;

						element = document.createElement("h5") ;
						tempTxt = document.createTextNode(LISTGAME[i].name) ;
						element.appendChild(tempTxt) ;
						$("#vignette"+LISTGAME[i].tag).append(element) ;

					element = document.createElement("div") ;
					element.id = "detail"+LISTGAME[i].tag ;
					element.className = "collapse" ;
					$("#zone"+LISTGAME[i].tag).append(element) ;
					$("#detail"+LISTGAME[i].tag).attr("aria-labelledby", "headingOne"+LISTGAME[i].tag) ;
					$("#detail"+LISTGAME[i].tag).attr("data-parent", "#zone"+LISTGAME[i].tag) ;

						element = document.createElement("div") ;
						element.id = "desc"+LISTGAME[i].tag ;
						element.className = "row" ;
						tempTxt = document.createTextNode(LISTGAME[i].desc) ;
						element.appendChild(tempTxt) ;
						$("#detail"+LISTGAME[i].tag).append(element) ;

						element = document.createElement("div") ;
						element.id = "desc"+LISTGAME[i].tag+"Easy" ;
						element.className = "btn btn-light row playButton" ;
						$("#detail"+LISTGAME[i].tag).append(element) ;
						$("#desc"+LISTGAME[i].tag+"Easy").attr("type", "button") ;
						$("#desc"+LISTGAME[i].tag+"Easy").attr("onclick", "startGame('"+LISTGAME[i].tag+"', 'easy')") ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail inCenterAll" ;
							$(element).append("<img src='img/star.png'>") ;
							$("#desc"+LISTGAME[i].tag+"Easy").append(element) ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail" ;
							tempTxt = document.createTextNode(LISTGAME[i].descEasy) ;
							element.appendChild(tempTxt) ;
							$("#desc"+LISTGAME[i].tag+"Easy").append(element) ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail score" ;
							tempTxt = document.createTextNode("Score") ;
							element.appendChild(tempTxt) ;
							$("#desc"+LISTGAME[i].tag+"Easy").append(element) ;

						element = document.createElement("div") ;
						element.id = "desc"+LISTGAME[i].tag+"Med" ;
						element.className = "btn btn-light row playButton" ;
						$("#detail"+LISTGAME[i].tag).append(element) ;
						$("#desc"+LISTGAME[i].tag+"Med").attr("type", "button") ;
						$("#desc"+LISTGAME[i].tag+"Med").attr("onclick", "startGame('"+LISTGAME[i].tag+"', 'med')") ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail inCenterAll" ;
							$(element).append("<img src='img/star.png'>") ;
							$(element).append("<img src='img/star.png'>") ;
							$("#desc"+LISTGAME[i].tag+"Med").append(element) ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail" ;
							tempTxt = document.createTextNode(LISTGAME[i].descMed) ;
							element.appendChild(tempTxt) ;
							$("#desc"+LISTGAME[i].tag+"Med").append(element) ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail score" ;
							tempTxt = document.createTextNode("Score") ;
							element.appendChild(tempTxt) ;
							$("#desc"+LISTGAME[i].tag+"Med").append(element) ;

						element = document.createElement("div") ;
						element.id = "desc"+LISTGAME[i].tag+"Hard" ;
						element.className = "btn btn-light row playButton" ;
						$("#detail"+LISTGAME[i].tag).append(element) ;
						$("#desc"+LISTGAME[i].tag+"Hard").attr("type", "button") ;
						$("#desc"+LISTGAME[i].tag+"Hard").attr("onclick", "startGame('"+LISTGAME[i].tag+"', 'hard')") ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail inCenterAll" ;
							$(element).append("<img src='img/star.png'>") ;
							$(element).append("<img src='img/star.png'>") ;
							$(element).append("<img src='img/star.png'>") ;
							$("#desc"+LISTGAME[i].tag+"Hard").append(element) ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail" ;
							tempTxt = document.createTextNode(LISTGAME[i].descHard) ;
							element.appendChild(tempTxt) ;
							$("#desc"+LISTGAME[i].tag+"Hard").append(element) ;

							element = document.createElement("div") ;
							element.className = "col-xs-4 col-sm-4 col-md-4 detail score" ;
							tempTxt = document.createTextNode("Score") ;
							element.appendChild(tempTxt) ;
							$("#desc"+LISTGAME[i].tag+"Hard").append(element) ;
	}
}

function startGame(game, level) {
	setGameHtml() ;

	canvas = document.getElementById("gameBoard") ;
	if (canvas)
	{
		context = canvas.getContext("2d") ;
		if (context)
		{
				switch (game) {
					case "Spider" :
						gameActived = "Spider" ;
						startSpider(level) ;
						break ;
					default :
						console.log(game+" n'est pas paramètré.")
						break ;
				}
		}
		else {alert("Impossible de récupérer le context du canvas.") ;}
	}
	else {alert("Impossible de récupérer le canvas.") ;}
}

function setGameHtml() {
	var element ;
	var tempTxt ;

	$("#base").empty() ;

	element = document.createElement("div") ;
	element.className = "row" ;
	element.id = "zoneHead" ;
	document.getElementById("base").appendChild(element) ;

		element = document.createElement("div") ;
		element.className = "col-xs-6 col-sm-6 col-md-6 vertCenter" ;
		element.id = "zoneBack" ;
		document.getElementById("zoneHead").appendChild(element) ;

			element = document.createElement("div") ;
			element.className = "row vertCenter" ;
			element.id = "zoneBackRow" ;
			document.getElementById("zoneBack").appendChild(element) ;

				element = document.createElement("button") ;
				element.className = "btn btn-primary" ;
				element.id = "btnBack" ;
				tempTxt = document.createTextNode("Retour au menu") ;
				element.appendChild(tempTxt) ;
				document.getElementById("zoneBackRow").appendChild(element) ;
				$("#btnBack").attr("onclick", "setHomeHtml()") ;

		element = document.createElement("div") ;
		element.className = "col-xs-6 col-sm-6 col-md-6" ;
		element.id = "zoneProfil" ;
		document.getElementById("zoneHead").appendChild(element) ;

			element = document.createElement("div") ;
			element.className = "row" ;
			element.id = "zoneProfilRow" ;
			document.getElementById("zoneProfil").appendChild(element) ;

				element = document.createElement("div") ;
				element.className = "col-xs-9 col-sm-9 col-md-9"
				element.id = "zoneProfilTxt" ;
				document.getElementById("zoneProfilRow").appendChild(element) ;

					element = document.createElement("div") ;
					element.className = "row namePlayer vertCenter" ;
					element.id = "profilName" ;
					tempTxt = document.createTextNode("Grandma Player") ;
					element.appendChild(tempTxt) ;
					document.getElementById("zoneProfilTxt").appendChild(element) ;

					element = document.createElement("div") ;
					element.className = "row linkPlayer vertCenter" ;
					element.id = "profilLink" ;
					document.getElementById("zoneProfilTxt").appendChild(element) ;

						element = document.createElement("a") ;
						tempTxt = document.createTextNode("Accéder au profil") ;
						element.appendChild(tempTxt) ;
						document.getElementById("profilLink").appendChild(element) ;

				element = document.createElement("div") ;
				element.className = "col-xs-3 col-sm-3 col-md-3" ;
				element.id = "zoneProfilImg" ;
				document.getElementById('zoneProfilRow').appendChild(element) ;

					element = document.createElement("div") ;
					element.className = "logoPlayerGame" ;
					element.id = "profilImg" ;
					document.getElementById("zoneProfilImg").appendChild(element) ;

		element = document.createElement("div") ;
		element.id = "zoneGame" ;
		element.className = "row" ;
		$("#base").append(element) ;

			element = document.createElement("canvas") ;
			element.id = "gameBoard" ;
			$("#zoneGame").append(element) ;

			$("#gameBoard").attr("width", $("#zoneGame").width()) ;
			$("#gameBoard").attr("height", (window.innerHeight)-$("#zoneHead").height()-40) ;
}

/*---Tools---*/
//Retourne un nombre aléaroire entre min inclu et max exclu
function getRandom (max, min) {return Math.floor(Math.random() * (max - min)) + min; ;}