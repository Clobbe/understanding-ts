function combine(
  input1: string | number,
  input2: string | number,
  resultOutput: "as-number" | "as-string"
) {
  let result;
  if (
    typeof input1 === "number" &&
    typeof input2 === "number" &&
    resultOutput === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedNames = combine("Clobbe", "doing TS", "as-string");
const combinedAge = combine(29, 30, "as-number");

console.log(combinedNames);
console.log(combinedAge);
