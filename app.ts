function add(num1: number, num2: number): number {
  return num1 + num2;
}

function printResult(num: number): void {
  console.log("result: " + num);
}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number;
// with this combineValues take a,b: number and expect a number as return type

combineValues = add;
console.log(combineValues(8, 8));
