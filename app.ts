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

const add = (a: Combine, b: Combine) => {
  if (typeof a === 'string' || typeof b === 'string') {
    // the above line is what's called a type guard
    return a.toString() + b.toString();
  }
  return a + b;
};

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
