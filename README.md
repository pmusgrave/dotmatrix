# DOTMATRIX

This converts a DOT file to an adjacency matrix.

#### Example usage:

```
node dotmatrix.js file.dot
```

This will output "file_adjacency_matrix" in the same directory as the original DOT file.

If your DOT file is large, it may be necessary to increase Node's memory limit:

```
node --max-old-space-size=4096 dotmatrix.js path_to_dot_file.dot
```
