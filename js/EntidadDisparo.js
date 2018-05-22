//JavaScript document

/**
* Esta entidad representa los disparos de la nave del jugador
*/
function EntidadDisparo(){
	//La velocidad de movimiento en el eje X de la nave alienígena
	this.velocidadMovimiento=-300;
	//Puntero al juego para poder notificarle eventos
	this.juego;
	//True si el disparo ha sido usado, por ejemplo, ha chocado con algun alien
	this.usado=false;
	
	/**
	* Constructor de la clase
	*
	* juego es el puntero al juego
	* xIni es la coordenada X inicial
	* yIni es la coordenada Y inicial
	*/
	this.constructor=function(juego,xIni,yIni){
		this.constructorBase(4,10,[Sprites.get("assets/img/disparoa.png"),Sprites.get("assets/img/disparob.png")],100,xIni,yIni,"d");
		this.juego=juego;
		this.dy=this.velocidadMovimiento;
	};
	/**
	* Controla el movimiento de la nave alienígena utilizando el tiempo delta
	*
	* delta es el tiempo en milisegundos transcurridos desde el último movimiento
	*/
	this.mover=function(delta){
		//Movemos el disparo
		this.moverBase(delta);
		//Si se sale de la pantalla, lo eliminamos
		if (this.y<-100)
		{
			this.juego.eliminarEntidad(this);
		}
		
	};
	/**
	* La notificación de la lógica para mover las entidades de las naves alienígenas 
	* no nos afecta, no hacemos nada. Pero hay que declarar la función para que no 
	* explote el código.
	*/
	this.logica=function(){
	};
	/**
	* Notificación de que el disparo ha chocado con algo
	*
	* otro es la entidad con la que hemos chocado
	*/
	this.colosionadoCon=function(otro){
		//Previene que un solo disparo mate a varios aliens
		if (this.usado)
		{
			return;
		}
		
		//Si chocamos con un alien, lo matamos
		if (otro instanceof EntidadAlien)
		{
			this.usado=true;
			this.juego.eliminarEntidad(this);
			otro.destruir();
			this.juego.notificarAlienDestruido();
		}
	};
}
EntidadDisparo.prototype = new Entidad();