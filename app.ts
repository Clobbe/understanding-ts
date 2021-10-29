/* Decorators */
/* a Decorator is simply a function that you apply to i.e. a class. */

function Logger(constructor: Function) {
  //a common convention is to use Capital letter on the decorator.
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'clobbsson';
  constructor() {
    console.log('creating a person...');
  }
}

const person = new Person();
console.log(person);
