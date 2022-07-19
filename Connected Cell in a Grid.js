'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'maxRegion' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY grid as parameter.
 */

function maxRegion(grid) {
    // Write your code here
    const visited = new Set();
    let maxSize = -Infinity;
    
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            const size = exploreSize(grid, r, c, visited);
            if (size > 0 && size > maxSize) maxSize = size;
        }
    }
    
    return maxSize;

}

const exploreSize = (grid, r, c, visited) => {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    if (!rowInBounds || !colInBounds) return 0;
    
    if (grid[r][c] === 0) return 0;
    
    const pos = r + ',' + c;
    if (visited.has(pos)) return 0;
    visited.add(pos);
    
    let size = 1;
    size += exploreSize(grid, r-1, c, visited);
    size += exploreSize(grid, r+1, c, visited);
    size += exploreSize(grid, r-1, c-1, visited);
    size += exploreSize(grid, r, c-1, visited);
    size += exploreSize(grid, r+1, c-1, visited);
    size += exploreSize(grid, r-1, c+1, visited);
    size += exploreSize(grid, r, c+1, visited);
    size += exploreSize(grid, r+1, c+1, visited);
    
    return size;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const m = parseInt(readLine().trim(), 10);

    let grid = Array(n);

    for (let i = 0; i < n; i++) {
        grid[i] = readLine().replace(/\s+$/g, '').split(' ').map(gridTemp => parseInt(gridTemp, 10));
    }

    const res = maxRegion(grid);

    ws.write(res + '\n');

    ws.end();
}
