/* Generic Types */
/* whenever text "Generic Type, eg. 'Array<T>' shows, this means I'm dealing with a generic type" */

const genericStringArray: Array<string> = []; // this is also equivalent to setting the type string[]

/* below is an example of how this concept with generic types can be used with a Promise */

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('this is done!');
  }, 20);
});

promise.then((data) => {
  console.log(data.split(' '));
});
/* Generic Types helps to ensure that we don't accidentally do stuff that's not possible, i.e. use String-methods on a type Number */

/* Constraints and generic types */
function merge<T extends object, U extends object>(a: T, b: U) {
  return Object.assign(a, b);
}
const mergedObj = merge({ name: 'clobbsson' }, { age: 30 });
console.log(mergedObj);
/* by using "extends" in the type definition this means that the type T/U will take whatever the type "object" also take. Similar to inheritance of the perks and features of the constraints that the regular "object"-type have */


