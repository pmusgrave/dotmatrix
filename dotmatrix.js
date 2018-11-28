const fs = require('fs');
const readline = require('readline');
const dot_path = process.argv[2];

let read_stream = fs.createReadStream(dot_path).setEncoding('ascii');

let edges = new Array();
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
  // console.log('edges:\n', edges)
  let vertices = new Array();

  for (let i = 0; i < edges.length; i++){
    let vertex_left = edges[i][0].replace(';', '');
    let vertex_right = edges[i][1].replace(';', '');

    if (!vertices.includes(vertex_left)){
      vertices.push(vertex_left);
    }
    if (!vertices.includes(vertex_right)){
      vertices.push(vertex_right);
    }

    if(adjacency_list[vertex_left] == undefined){
      adjacency_list[vertex_left] = new Array(vertex_right);
    }
    else {
      adjacency_list[vertex_left].push(vertex_right);
    }

    if(adjacency_list[vertex_right] == undefined){
      adjacency_list[vertex_right] = new Array();
    }
    // else {
    //   adjacency_list[vertex_right].push();
    // }
  }

  // console.log('adj_list: ', adjacency_list);
  // console.log('vertices: ', vertices.sort());

  // let vertices = Object.keys(adjacency_list);
  vertices = vertices.sort();
  let num_unique_vertices = vertices.length;
  let adjacency_matrix = new Array(num_unique_vertices);
  for (let i = 0; i < num_unique_vertices; i++){
    adjacency_matrix[i] = (new Array(num_unique_vertices));
  }

  for (let i = 0; i < num_unique_vertices; i++){
    for (let j = 0; j < num_unique_vertices; j++){
      adjacency_matrix[i][j] = 0;
    }
  }

  for (let i = 0; i < num_unique_vertices; i++){
    for (let j = 0; j < num_unique_vertices; j++){
      let current_vertex = vertices[i];

      // console.log('current: ', current_vertex, '\tadj_list[current]: ', adjacency_list[current_vertex]);

      adjacency_list[current_vertex].forEach((vertex) => {
        adjacency_matrix[i][vertices.indexOf(vertex)] = 1;
      });
    }
  }

  console.log(adjacency_matrix);
});
