//JavaScript document

/**
* Esta entidad representa las naves alienígenas que quieren invadir la tierra
*/
function EntidadAlien(){
	//La velocidad de movimiento en el eje X de la nave alienígena
	this.velocidadMovimiento=75;
	//Puntero al juego para poder notificarle eventos
	this.juego;
	
	this.destruido=0;
	
	/**
	* Constructor de la clase
	*
	* juego es el puntero al juego
	* xIni es la coordenada X inicial
	* yIni es la coordenada Y inicial
	* fila es el numero de la fila donde irá el alien, para saber que imagen utilizar
	*/
	this.constructor=function(juego,xIni,yIni,fila){
		switch(fila)
		{
			case 0:
				this.constructorBase(40,25,[Sprites.get("assets/img/alien1a.png"),Sprites.get("assets/img/alien1b.png")],200,xIni,yIni,"a");
				break;
			case 1:
			case 2:
				this.constructorBase(40,25,[Sprites.get("assets/img/alien2a.png"),Sprites.get("assets/img/alien2b.png")],250,xIni,yIni,"a");
				break;
			default:
				this.constructorBase(40,25,[Sprites.get("assets/img/alien3a.png"),Sprites.get("assets/img/alien3b.png")],300,xIni,yIni,"a");
				break;
		}
		this.juego=juego;
		this.dx=-this.velocidadMovimiento;
	};
	/**
	* Controla el movimiento de la nave alienígena utilizando el tiempo delta
	*
	* delta es el tiempo en milisegundos transcurridos desde el último movimiento
	*/
	this.mover=function(delta){
		//Si la nave alcanza el margen izquierdo del mapa, notifica al juego
		//para cambiar de sentido y avanzar un poco
		if (this.dx<0 && this.x<10)
		{
			this.juego.actualizaLogica();
		}
		//Si la nave alcanza el margen derecho del mapa, notifica al juego
		//para cambiar de sentido y avanzar un poco
		if (this.dx>0 && this.x>juego.getAnchuraCanvas()-(this.ancho+10))
		{
			this.juego.actualizaLogica();
		}
		//Movemos la nave
		this.moverBase(delta);
		
		if (this.destruido>0)
		{
			this.destruido-=delta;
			if (this.destruido<=0)
			{
				this.juego.eliminarEntidad(this);
			}
		}
	};
	/**
	* Actualiza la lógica del juego respecto a los aliens
	*/
	this.logica=function(){
		//Avanza un poco la nave verticalmente
		this.dx=-this.dx;
		this.y+=10;
		//Si alcanza la zona donde está la nave del jugador, la partida se acaba
		if (this.y>570)
		{
			this.juego.notificarMuerte();
		}
	};
	
	/**
	* Se encarga de hacer que el método mover elimine la entidad, cuando se le notifica
	* con este método que debe ser destruida.
	*/
	this.destruir=function(){
		this.sprites=[Sprites.get("assets/img/explosion.png")];
		this.spriteActual=0;
		this.destruido=50;
	};
	/**
	* Las colisiones de los aliens son manejadas en otro lugar
	*/
	this.colosionadoCon=function(otro){
	};
}
EntidadAlien.prototype = new Entidad();