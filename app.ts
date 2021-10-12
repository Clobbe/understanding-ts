function add(num1: number, num2: number): number {
  return num1 + num2;
}

function printResult(num: number): void {
  console.log("result: " + num);
}

function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
  const result = n1 + n2;
  callback(result);
}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number;
// with this combineValues take a,b: number and expect a number as return type

combineValues = add;
console.log(combineValues(8, 8));

addAndHandle(10, 20, (result) => {
  console.log(result);
});
