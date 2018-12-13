# DOTMATRIX

This converts a DOT file to an adjacency matrix.

#### Example usage:
First, include the dotmatrix module.
Then, call ```dotmatrix.convert_dot_file_to_matrix```. The first argument is the path to the target dot file, and the second argument is a callback function to process the results.

e.g.
```
const dotmatrix = require('./dotmatrix.js');
const dot_path = process.argv[2];

dotmatrix.convert_dot_file_to_matrix(dot_path, (matrix) => {
  console.log(matrix);
});
```
