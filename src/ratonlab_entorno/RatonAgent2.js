const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        
        this.seen = new Map();
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
        if(this.seen.has(JSON.stringify(posR))) this.seen.set(JSON.stringify(posR), 1 + this.seen.get(JSON.stringify(posR)));
        else this.seen.set(JSON.stringify(posR), 1);

        // console.log(this.seen)

        let dir = "TAKE"
        let mini = 10000000
        let nextPos

        for(let i = 0; i < this.actions.length; i++){
            neoPos = this.getNewPos(i);

            if(this.perception[i] === 0){
                if(!this.seen.has(JSON.stringify(neoPos))){
                    nextPos = JSON.parse(JSON.stringify(neoPos));
                    dir = this.actions[i];
                    break;
                }else{
                    let vecs = this.seen.get(JSON.stringify(neoPos));
                    if(vecs < mini){
                        mini = vecs;
                        dir = this.actions[i];
                        nextPos = JSON.parse(JSON.stringify(neoPos));
                    }
                }
            }
            
        }

        this.last_position = JSON.parse(JSON.stringify(nextPos));
        return dir;
    }

    check(obj){
        for(let a in this.seen){
            if(a.x == obj.x && a.y == obj.y) return false;
        }

        return true;
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