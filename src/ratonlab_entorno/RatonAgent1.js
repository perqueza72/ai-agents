const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        
        this.seen = new Set();
        this.order = [2,3,1,0];
        this.initialized = false;
        
        //LEFT, UP, RIGHT, DOWN, CELL
        this.actions = ["LEFT", "UP", "RIGHT", "DOWN"];
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        
        if(!this.initialized){
            this.initialized = true;
            this.last_position = this.initialState;
        }

        let posR = JSON.parse(JSON.stringify(this.last_position)); //Posición del ratón en el tablero.
        let neoPos // new position

        if(this.perception[4] !== 0) return "TAKE";
        this.seen.add(JSON.stringify(posR));

        // console.log(this.seen)

        for(let i = 0; i < this.actions.length; i++){
            neoPos = this.getNewPos(this.order[i]);

            if(this.perception[this.order[i]] === 0 && !this.seen.has(JSON.stringify(neoPos))){
                this.last_position = JSON.parse(JSON.stringify(neoPos));
                // console.log(this.perception)
                // console.log("voy desde " + JSON.stringify(posR) + " hacia " +  JSON.stringify(neoPos) + ". Por tanto mi acción es: " + this.actions[i]);
                // console.log()
                return this.actions[this.order[i]];
            }
            
        }

        return "TAKE";
    }

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