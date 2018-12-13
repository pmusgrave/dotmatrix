const dotmatrix = require('./dotmatrix.js');
const dot_path = process.argv[2];

// dotmatrix.config_read_stream(dot_path);
dotmatrix.convert_dot_file_to_matrix(dot_path, (matrix) => {
  console.log(matrix);
});
