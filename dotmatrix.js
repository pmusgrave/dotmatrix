const fs = require('fs');
const readline = require('readline');
const dot_path = process.argv[2];

let read_stream = fs.createReadStream(dot_path).setEncoding('ascii');

let edges = [0];
let adjacency_list = {};

const rl = readline.createInterface({
  input: read_stream,
  //output: process.stdout
});

rl.on('line', (line) => {
  if (line.includes('->')){
    edges.push(line.split(' -> '));
  }
});

rl.on('close', () => {
  edges.sort();

  for (let i = 0; i < edges.length; i++){
    if(adjacency_list[edges[i][0]] == undefined){
      adjacency_list[edges[i][0]] = new Array(edges[i][1]);
    }
    else {
      adjacency_list[edges[i][0]].push(edges[i][1]);
    }
  }

  let num_unique_vertices = Object.keys(adjacency_list).length;
  let adjacency_matrix = [num_unique_vertices][num_unique_vertices];

  for (let j = 0; j < num_unique_vertices; j++){
    
  }
});
