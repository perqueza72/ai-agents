const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        
        this.seen = new Map();
        this.last_position = {
            x: 0,
            y: 0
        };
        //LEFT, UP, RIGHT, DOWN, CELL
        this.actions = ["LEFT", "UP", "RIGHT", "DOWN"];

        
    }

    //Inicializa la posición del ratón y del queso.
    setup(state0) {
        this.last_position = {
            x: state0.raton.x,
            y: state0.raton.y
        };
        this.queso = state0.queso;
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {

        let posR = JSON.parse(JSON.stringify(this.last_position)); //Posición del ratón en el tablero.
        let neoPos // new position

        if(this.perception[4] !== 0) return "TAKE";
        if(this.seen.has(JSON.stringify(posR))) this.seen.set(JSON.stringify(posR), 1 + this.seen.get(JSON.stringify(posR)));
        else this.seen.set(JSON.stringify(posR), 1);

        
        //Inicializa las variables para realizar la busqueda
        let dir = "TAKE"
        let mini = 10000000
        let nextPos

        //Se realiza la busqueda de la dirección hacía donde se dirigirá el ratón.
        for(let i = 0; i < this.actions.length; i++){
            neoPos = this.getNewPos(i);

            if(this.perception[i] === 0){
                let vecs = 0;
                if(this.seen.has(JSON.stringify(neoPos))){
                    vecs = this.seen.get(JSON.stringify(neoPos));
                }
                vecs += this.getDistanceToCheese(neoPos);

                //Se calcula el peso minimo posible para el siguiente movimiento.
                if(vecs < mini){
                    mini = vecs;
                    dir = this.actions[i];
                    nextPos = JSON.parse(JSON.stringify(neoPos));
                }
            }
            
        }

        this.last_position = JSON.parse(JSON.stringify(nextPos));
        return dir;
    }


    /**
     * Retorna la distancia en L entre el ratón y el queso
     * @param {object} neoPos Es la siguiente posición de ratón que se intenta recorrer 
     * @returns {int} Distancia en L entre neoPos y la ubicación del queso
     */
    getDistanceToCheese(neoPos){
        return Math.abs(neoPos.x - this.queso.x) + Math.abs(neoPos.y - this.queso.y);
    }


    /**
     * Cambia la posición del ratón en función de la posición (pos) que se requiera.
     * @param {int} pos Ïndide de la dirección hacía donde se intenta dirigir
     * @returns {object} Retorna una nueva posición del ratón.
     */
    getNewPos(pos){
        let neoPos = JSON.parse(JSON.stringify(this.last_position))
        if(pos === 0 && neoPos.x>=0){ // Left
            neoPos.x -= 1;
        }else if(pos === 1 &&  neoPos.y>=0){ // Up
            neoPos.y -= 1;
        }else if(pos === 2){ // Right
            neoPos.x += 1;
        }else if(pos === 3){ // Down
            neoPos.y += 1;
        }

        return neoPos;
    }
}

module.exports = CleanerAgent;