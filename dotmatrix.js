const fs = require('fs');
const readline = require('readline');
const dot_path = process.argv[2];

let read_stream = fs.createReadStream(dot_path).setEncoding('ascii');
let write_stream = fs.createWriteStream(dot_path.substring(0, dot_path.length - 4) + '_adjacency_matrix',
  {defaultEncoding: 'ascii'})
    .on('error', function(err){
      console.log(err.stack);
    });

let edges = new Array();
let adjacency_list = {};

const rl = readline.createInterface({
  input: read_stream,
  output: write_stream
});

rl.on('line', (line) => {
  if (line.includes('->')){
    edges.push(line.split(' -> '));
  }
  if (line.includes('--')){
    edges.push(line.split(' -- '));
  }
});

rl.on('close', () => {
  edges.sort();
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
  }

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
    let current_vertex = vertices[i];

    adjacency_list[current_vertex].forEach((vertex) => {
      adjacency_matrix[i][vertices.indexOf(vertex)] = 1;
    });

    process.stdout.write(i + '\r');
  }

  adjacency_matrix.forEach(function(element) {
    write_stream.write(element.join(' ') + '\n')
  });

  write_stream.end();
  console.log('File ' + dot_path.substring(0, dot_path.length - 4) + '_adjacency_matrix written.');
});
