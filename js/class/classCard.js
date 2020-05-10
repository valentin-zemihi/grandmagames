var radius = 5 ;
var widthCard = 65 ;
var heightCard = 100 ;
var widthSymb = 15 ;
var heightSymb = 15 ;

class Card {
	constructor(value, color, x, y)
	{
		this.value = value ;
		this.color = color ;
		this.visible = false ;
		this.coordX = x ;
		this.coordY = y ;
		this.startTab = null ;
	}

	drawVerso(){
		drawContourCard(this.coordX, this.coordY) ;
		
		context.fillStyle = "rgb(0,0,255)" ;
		context.fillRect(this.coordX+5, this.coordY+5, 55, 90) ;
	}

	drawRecto(){
		var tempTxt ;
		var tempX ;
		var tempY ;

		drawContourCard(this.coordX, this.coordY) ;
		
		//Dessine le dessin du symbole
		switch (this.color)
		{
			case "Spades" :
				drawSpades(this.coordX+radius, this.coordY+radius) ;
				drawSpades(this.coordX+widthCard-radius-widthSymb, this.coordY+radius) ;
				drawSpades(this.coordX+radius, this.coordY+heightCard-radius-heightSymb) ;
				drawSpades(this.coordX+widthCard-radius-widthSymb, this.coordY+heightCard-radius-heightSymb) ;
				break ;
			case "Heart" :
				drawHeart(this.coordX+radius, this.coordY+radius) ;
				drawHeart(this.coordX+widthCard-radius-widthSymb, this.coordY+radius) ;
				drawHeart(this.coordX+radius, this.coordY+heightCard-radius-heightSymb) ;
				drawHeart(this.coordX+widthCard-radius-widthSymb, this.coordY+heightCard-radius-heightSymb) ;
				break ;
			case "Club" :
				drawClub(this.coordX+radius, this.coordY+radius) ;
				drawClub(this.coordX+widthCard-radius-widthSymb, this.coordY+radius) ;
				drawClub(this.coordX+radius, this.coordY+heightCard-radius-heightSymb) ;
				drawClub(this.coordX+widthCard-radius-widthSymb, this.coordY+heightCard-radius-heightSymb) ;
				break ;
			case "Diamond" :
				drawDiamond(this.coordX+radius, this.coordY+radius) ;
				drawDiamond(this.coordX+widthCard-radius-widthSymb, this.coordY+radius) ;
				drawDiamond(this.coordX+radius, this.coordY+heightCard-radius-heightSymb) ;
				drawDiamond(this.coordX+widthCard-radius-widthSymb, this.coordY+heightCard-radius-heightSymb) ;
				break ;
		}

		//Dessine la valeur
		context.font = "40px Helvetica" ;
		if(this.color!="Atout"){
			switch (this.value) {
				case 10 :
					tempTxt = this.value ;
					tempX = this.coordX-25+widthCard/2 ;
					break ;
				case 11 :
					tempTxt = "V" ;
					tempX = this.coordX-14+widthCard/2 ;
					break ;
				case 12 :
					if(gameActived == "Spider"){tempTxt = "D" ;}
					else {tempTxt = "C" ;}
					tempX = this.coordX-14+widthCard/2 ;
					break ;
				case 13 :
					if(gameActived == "Spider"){tempTxt = "R" ;}
					else {tempTxt = "D" ;}
					tempX = this.coordX-14+widthCard/2 ;
					break ;
				case 14 :
					tempTxt = "R" ;
					tempX = this.coordX-14+widthCard/2 ;
					break ;
				default :
					tempTxt = this.value ;
					tempX = this.coordX-12+widthCard/2
				break ;
			}
		}
		tempY = this.coordY+heightCard/2+15 ;
		context.fillText(tempTxt, tempX, tempY) ;
		context.font = "20px Helvetica" ;
		context.fillText(tempTxt, tempX+10, this.coordY+20) ;
	}

	isOver(mousePos)
	{
		if (mousePos.x>=this.coordX && mousePos.y>=this.coordY && mousePos.x<=(this.coordX+widthCard) && mousePos.y<=(this.coordY+heightCard)){return true ;}
		return false ;
	}
}

function drawSpades(x, y) {
	context.beginPath() ;

	context.moveTo(x+widthSymb/2, y) ;
	context.quadraticCurveTo(x+widthSymb, y+heightSymb/4, x+widthSymb, y+heightSymb/2) ;
	context.arc(x+3*(widthSymb/4), y+heightSymb/2, widthSymb/4, 0, Math.PI, false) ;

	context.lineTo(x+3*(widthSymb/4), y+heightSymb) ;
	context.lineTo(x+widthSymb/4, y+heightSymb) ;
	context.lineTo(x+widthSymb/2, y+heightSymb/2) ;

	context.arc(x+widthSymb/4, y+heightSymb/2, widthSymb/4, 0, Math.PI, false) ;
	context.quadraticCurveTo(x, y+heightSymb/4, x+widthSymb/2, y) ;

	context.closePath() ;
	context.fillStyle = "black" ;
	context.fill() ;
}

function drawHeart(x, y) {
	context.beginPath() ;

	context.moveTo(x+widthSymb/2, y+heightSymb) ; //A
	context.quadraticCurveTo(x+widthSymb, y+2*(heightSymb/3), x+widthSymb, y+heightSymb/4) ; //A-B
	context.arc(x+3*(widthSymb/4), y+heightSymb/4, widthSymb/4, 0, Math.PI, true) ;
	context.arc(x+widthSymb/4, y+heightSymb/4, widthSymb/4, 0, Math.PI, true) ;
	context.quadraticCurveTo(x, y+2*(heightSymb/3), x+widthSymb/2, y+heightSymb) ;

	context.closePath() ;
	context.fillStyle = "red" ;
	context.fill() ;
}

function drawClub(x, y) {
	context.beginPath() ;

	context.moveTo(x+widthSymb/2, y) ;
	context.arc(x+widthSymb/2, y+heightSymb/4, widthSymb/4, (3*Math.PI)/2, Math.PI/2, true) ;
	context.arc(x+widthSymb/2, y+heightSymb/4, widthSymb/4, Math.PI/2, (3*Math.PI)/2, true) ;

	context.moveTo(x, y+heightSymb/2) ;
	context.arc(x+widthSymb/4, y+heightSymb/2, widthSymb/4, Math.PI, 2*Math.PI, true) ;
	context.arc(x+widthSymb/4, y+heightSymb/2, widthSymb/4, 2*Math.PI, Math.PI, true) ;

	context.moveTo(x+widthSymb, y+heightSymb/2) ;
	context.arc(x+3*(widthSymb/4), y+heightSymb/2, widthSymb/4, Math.PI, 2*Math.PI, true) ;
	context.arc(x+3*(widthSymb/4), y+heightSymb/2, widthSymb/4, 2*Math.PI, Math.PI, true) ;

	context.moveTo(x+widthSymb/2, y+heightSymb/2) ;
	context.lineTo(x+3*(widthSymb/4), y+heightSymb) ;
	context.lineTo(x+widthSymb/4, y+heightSymb) ;
	context.lineTo(x+widthSymb/2, y+heightSymb/2) ;

	context.closePath() ;
	context.fillStyle = "black" ;
	context.fill() ;
}

function drawDiamond(x, y) {
	context.beginPath() ;

	context.moveTo(x+widthSymb/2, y) ;
	context.lineTo(x+widthSymb-2, y+heightSymb/2) ;
	context.lineTo(x+widthSymb/2, y+heightSymb) ;
	context.lineTo(x+2, y+heightSymb/2) ;

	context.closePath() ;
	context.fillStyle = "red" ;
	context.fill() ;
}

function drawContourCard(x, y){
	context.fillStyle = "rgb(255,255,255)" ;
	context.strokeStyle = "rgb(0, 0, 0)" ;
	context.lineWidth = 1 ;
	context.beginPath() ;
	context.moveTo(x+radius, y) ;
	context.lineTo(x+widthCard-radius, y) ;
	context.arc(x+widthCard-radius, y+radius, radius, (3*Math.PI)/2, 2*Math.PI, false) ;
	context.lineTo(x+widthCard, y+heightCard-radius) ;
	context.arc(x+widthCard-radius, y+heightCard-radius, radius, 2*Math.PI, Math.PI/2, false) ;
	context.lineTo(x+radius, y+heightCard) ;
	context.arc(x+radius, y+heightCard-radius, radius, Math.PI/2, Math.PI, false) ;
	context.lineTo(x, y+radius) ;
	context.arc(x+radius, y+radius, radius, Math.PI, (3*Math.PI)/2, false) ;
	context.lineTo(x+radius+1, y) ;
	context.fill() ;
	context.stroke() ;
}