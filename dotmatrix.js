const fs = require('fs');
const readline = require('readline');

module.exports = function()
{
  this.edges = new Array();
  this.adjacency_list = {};

  function convert_dot_file_to_matrix(path, callback){
    this.read_stream = fs.createReadStream(path).setEncoding('ascii');

    const rl = readline.createInterface({
      input: this.read_stream,
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
      let vertices = convert_edges_to_adjacency_list(edges);
      adjacency_matrix = convert_list_to_matrix(vertices);
      callback(adjacency_matrix);
    });
  }

  function convert_edges_to_adjacency_list(edges){
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

      if(this.adjacency_list[vertex_left] == undefined){
        this.adjacency_list[vertex_left] = new Array(vertex_right);
      }
      else {
        this.adjacency_list[vertex_left].push(vertex_right);
      }

      if(this.adjacency_list[vertex_right] == undefined){
        this.adjacency_list[vertex_right] = new Array();
      }
    }

    vertices.sort();
    return vertices;
  }

  function convert_list_to_matrix(list){
    let num_unique_vertices = list.length;
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
      let current_vertex = list[i];
      this.adjacency_list[current_vertex].forEach((vertex) => {
        adjacency_matrix[i][list.indexOf(vertex)] = 1;
      });
      process.stdout.write(i + '\r');
    }
    return adjacency_matrix;
  }


  return {
    convert_dot_file_to_matrix: convert_dot_file_to_matrix,
  };
}();
