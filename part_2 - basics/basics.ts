function add(num1: number, num2: number, showResult: boolean, phrase: string) {
  const result = num1 + num2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return result;
  }
}

const number1 = 5;
const number2 = 5;
const printResult = true;
const resultPhrase = "Result is: ";

const result = add(number1, number2, printResult, resultPhrase);
console.log(result);
