'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the findShortest function below.

/*
 * For the unweighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] to <name>To[i].
 *
 */

const buildGraph = (graphFrom, graphTo) => {
    const graph = {}
    
    for (let node in graphFrom) {
        if (!(graphFrom[node] in graph)) graph[graphFrom[node]] = [];
        if (!(graphTo[node] in graph)) graph[graphTo[node]] = [];
        graph[graphFrom[node]].push(graphTo[node])
        graph[graphTo[node]].push(graphFrom[node])
    }
    
    return graph
}

const isValid = (arr, num) => {
    const keys = [];
    arr.forEach((data, idx) => {
        if (num === data) keys.push(idx + 1)
    })
    return keys;
}

function findShortest(graphNodes, graphFrom, graphTo, ids, val) {
    // solve here
    const multipleColorsId = isValid(ids, val);
    if (multipleColorsId.length < 2) return -1;
    
    const calculatedGraph = buildGraph(graphFrom, graphTo)
    
    let shortest = Infinity;
    
    for (let i = 0; i < multipleColorsId.length - 1; i++) {
        for (let j = i + 1; j < multipleColorsId.length; j++) {
            const visited = new Set([ multipleColorsId[i] ]);
            const queue = [ [ multipleColorsId[i], 0 ] ];
            
            while (queue.length > 0) {
                const [ node, distance ] = queue.shift();
                
                if (node === multipleColorsId[j]) {
                    shortest = distance < shortest ? distance : shortest;
                }                
                for (let neighbor of calculatedGraph[node]) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push([ neighbor, distance + 1 ])
                    }
                }
            }
        }
    }
    
    return shortest;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const graphNodesEdges = readLine().split(' ');
    const graphNodes = parseInt(graphNodesEdges[0], 10);
    const graphEdges = parseInt(graphNodesEdges[1], 10);

    let graphFrom = [];
    let graphTo = [];

    for (let i = 0; i < graphEdges; i++) {
        const graphFromTo = readLine().split(' ');

        graphFrom.push(parseInt(graphFromTo[0], 10));
        graphTo.push(parseInt(graphFromTo[1], 10));
    }

    const ids = readLine().split(' ').map(idsTemp => parseInt(idsTemp, 10));

    const val = parseInt(readLine(), 10);

    const ans = findShortest(graphNodes, graphFrom, graphTo, ids, val);

    ws.write(ans + '\n');

    ws.end();
}
