/// <reference lib="webworker" />

const matrix1: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const matrix2: number[][] = [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1],
];

addEventListener('message', () => {
  const start = Date.now();
  for (let i = 0; i < 1_000_000; i++) {
    multiplyMatrices(matrix1, matrix2);
  }
  postMessage({ cost: Date.now() - start });
});

function multiplyMatrices(
  matrix1: number[][],
  matrix2: number[][]
): number[][] {
  const result: number[][] = [];

  const rows1 = matrix1.length;
  const cols1 = matrix1[0].length;
  const cols2 = matrix2[0].length;

  for (let i = 0; i < rows1; i++) {
    result[i] = [];
    for (let j = 0; j < cols2; j++) {
      result[i][j] = 0;
      for (let k = 0; k < cols1; k++) {
        result[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  return result;
}
