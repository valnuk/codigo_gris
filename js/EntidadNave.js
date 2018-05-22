//JavaScript document

/**
* Esta entidad representa la nave del jugador, la última oportunidad
* que tiene la tierra de salvarse
*/
function EntidadNave(){
	//Puntero al juego para poder notificarle eventos
	this.juego;
	
	/**
	* Constructor de la clase
	*
	* juego es el puntero al juego
	* xIni es la coordenada X inicial
	* yIni es la coordenada Y inicial
	*/
	this.constructor=function(juego,xIni,yIni){
		this.constructorBase(40,25,[Sprites.get("assets/img/nave.png")],999999,xIni,yIni,"n");
		this.juego=juego;
	};
	/**
	* Controla el movimiento de la nave utilizando el tiempo delta
	*
	* delta es el tiempo en milisegundos transcurridos desde el último movimiento
	*/
	this.mover=function(delta){
		//Si estamos en el margen izquierdo del mapa, no podemos movernos más a la izquierda
		if (this.dx<0 && this.x<10)
		{
			return;
		}
		//Si estamos en el margen derecho del mapa, no podemos movernos más a la derecha
		if (this.dx>0 && this.x>juego.getAnchuraCanvas()-(this.ancho+10))
		{
			return;
		}
		
		this.moverBase(delta);
	};
	
	/**
	* La notificación de la lógica para mover las entidades de las naves alienígenas 
	* no nos afecta, no hacemos nada. Pero hay que declarar la función para que no 
	* explote el código.
	*/
	this.logica=function(){
	};
	/**
	* Notificación de que la nave del jugador ha chocado con algo
	*
	* otro es la entidad con la que hemos chocado
	*/
	this.colosionadoCon=function(otro){
		//Si hemos chocado con una nave alienígena, morimos y el juego se acaba
		if (otro instanceof EntidadAlien)
		{
			this.juego.notificarMuerte();
		}
	};
}
EntidadNave.prototype = new Entidad();