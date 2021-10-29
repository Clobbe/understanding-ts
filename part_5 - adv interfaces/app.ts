/* Intersection types */

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
/* here the type ElevatedEmployee is a union of types Admin & Employee. Good way of combining types. */

const employee1: ElevatedEmployee = {
  name: 'clobbsson',
  privileges: ['create', 'update'],
  startDate: new Date(),
};

/* intersection also works with union-types, but there's it's only, as the name states, the intersection that will be the resulting type. As shown in code block below, where type CombineNumeric can only be of type "number" since this is the intersection of Combine & Numeric. */

type Combine = string | number;
type Numeric = number | boolean;
type CombineNumeric = Combine & Numeric;

/* "Type Guarding" */

/* Function Overloading - adding func overload */
/* useful in order to make TS understand what the return type for each case would be */
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combine, b: Combine) {
  if (typeof a === 'string' || typeof b === 'string') {
    // the above line is what's called a type guard
    return a.toString() + b.toString();
  }
  return a + b;
}

const result1 = add('hi', 'there');
const result2 = add('hi', 2);
const result3 = add(3, 2);

/* below illustrate similar, but instead of a type guarding, this is more of "property guarding". Meaning, checking if a certain property exists on the object or not.*/
type UnknownEmployee = Employee | Admin;

const printEmployeeInfo = (emp: UnknownEmployee) => {
  console.log(`Name :: ${emp.name}`);
  if ('privileges' in emp) {
    console.log(`Privileges :: ${emp.privileges}`);
  }
  if ('startDate' in emp) {
    console.log(`Start Date :: ${emp.startDate}`);
  }
};

printEmployeeInfo(employee1);

/* more code on type guarding */

class Car {
  drive() {
    console.log('Driving a car...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo ' + amount + ' in truck');
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();
  //  if ('loadCargo' in vehicle) { // this could be error prone, so a more elegant way of checking if the vehicle is a "Truck" in this case, is to use the JS-operator "instanceof"
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
};

useVehicle(v1);
useVehicle(v2);

/* working with Discriminated Unions
(types/interfaces that are somewhat related) */

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}
interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

const movingAnimal = (animal: Animal) => {
  let speed;
  switch (animal.type) {
    case 'horse':
      speed = animal.runningSpeed;
      break;
    case 'bird':
      speed = animal.flyingSpeed;
      break;
  }
  console.log(`Animal of type:${animal.type} is moving at speed: ${speed}`);
};

movingAnimal({ type: 'horse', runningSpeed: 20 });

/* Type Casting */

//const userInputElement = <HTMLInputElement>document.getElementById('userInput')
/* this makes TS understand what type it is on the element that's fetched from the html. */

const userInputElement = document.getElementById(
  'userInput'
) as HTMLInputElement;
//and this is simply just an alternative way of doing it

userInputElement.value = "Here's a value for you!";

/* Index Properties */
/* this is useful when I want to type something but I don't know which keys or how many keys I'll collect in advance */

interface ErrorContainer {
  [props: string]: string | number;
}
/* this type declaration ensures that an error that's used with this interface is a string */

const errorBag: ErrorContainer = {
  id: 1,
  email: 'Not a valid email address',
  username: 'Username must start with a capital letter',
};

/* Optional Chaining */
/* this is really helpful when for example an data object is fetched from a server and we want to do something if a property exists.*/

const fetchedDataObject = {
  id: 1,
  name: 'clobbsson',
  job: { title: 'cto', description: 'working with TypeScript' },
};

console.log(fetchedDataObject?.job?.description);
console.log(fetchedDataObject?.job?.title);
/* like in many other cases with TypeScript, the "?" works as an "optional"-operator */

/* Nullish Coalescing */
/* useful when I don't know in advance whether a value is null or undefined */

const unknownConstant = '';
const NullishCoalescing = unknownConstant ?? 'DEFAULT VALUE';

/* by using the ??-operator here this translates roughly into, "if the value of unknownConstant is undefined or null" then set 'DEFAULT VALUE' to NullishCoalescing */
