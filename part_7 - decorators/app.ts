/* Decorators */
/* a Decorator is simply a function that you apply to i.e. a class. */

/* function Logger(logString: string) {
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
 */
/* ================================================= */

/* Example of use case for Decorators */

/* function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const orgMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = orgMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  msg = "It's working";

  @Autobind
  showMsg() {
    console.log(this.msg);
  }
}

const p = new Printer();
p.showMsg();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMsg);
 */
/* ================================================= */

/* Example of using Decorators for validation */

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // here's where we add our validators, i.e. ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required',
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positive',
    ],
  };
}
function validate(obj: Object) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;

  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;

        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleElement = document.getElementById('title') as HTMLInputElement;
  const priceElement = document.getElementById('price') as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, try again');
    return;
  }

  console.log(createdCourse);
});
