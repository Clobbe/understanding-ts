/* Decorators */
/* a Decorator is simply a function that you apply to i.e. a class. */

function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
  //a common convention is to use Capital letter on the decorator.
}

@Logger('LOG - class Person')
class Person {
  name = 'clobbsson';
  constructor() {
    console.log('creating a person...');
  }
}

const person = new Person();
console.log(person);
