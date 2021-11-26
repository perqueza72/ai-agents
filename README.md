# ai-agents

First attemp to create a multi agent framework for the lecture: Introducción a la inteligencia Artificial. 
Project based on github: https://github.com/andcastillo/ai-agents.git

## Install

``` bash
git clone https://github.com/perqueza72/ai-agents
cd ai-agents
npm install 
```

## Run the example

node src/example/main.js

## Output

```
Winner Smith
[ { agentID: 'Smith', action: 'DOWN' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' },
  { agentID: 'Smith', action: 'RIGHT' },
  { agentID: 'Smith', action: 'LEFT' } ]
[ [ 0, 0, 0, 0 ],
  [ 0, 1, 1, -1 ],
  [ 0, 1, 0, 0 ],
  [ 0, 'X', 0, 1 ] ]
```
  
  As we still having the -1 in the problem matrix, we assume that agent could not solve the given problem.
