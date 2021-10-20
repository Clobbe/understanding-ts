//Part 1
/* class Department {
  name: string;

  // this-keyword is the equivalent to __self__ that I'm used to use in Python.
  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log('Department: ' + this.name);
  }
}

const accounting = new Department('Accounting');
console.log(accounting);

accounting.describe();

const accountingCopy = { name: 'Finance', describe: accounting.describe };

accountingCopy.describe();
 */

//Part 2
class Department {
  private employee: string[] = [];
  // using private isolates the property to only be available within this class.

  //protected employee: string[] = [];
  //using the modifier "protected" makes the property employee available within the class and it's sub-classes.

  // this is an example of a more neat implementation of Access Modifiers
  constructor(private id: string, public name: string) {
    // this.name = n;
  }

  /*   same constructor-function only change is using the "readonly" functionality available in TypeScript. Which is really just to add more "safety". Meaning it's not possible to change the given Id, which make sense...
  constructor(private readonly id: string, public name: string) {
    // this.name = n;
  } */

  describe(this: Department) {
    console.log(`Department: (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employee.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employee.length);
    console.log(this.employee);
  }
}

// Trying out inheritance from Department-class. which means it gets all the nice features from Department-class.

class ITDepartment extends Department {
  /* whenever a sub-class (class that inherit from an other class) a new constructor needs to be called.*/
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');

    /* and when a new constructor is initialized within a sub-class, the "super()" function needs to be called. It's purpose is to pass whatever we want to pass "up" to the parent-class.*/
  }
}

/*
below implementation is the "longer" more explicit route on implementing a subclass.

class ITDepartment extends Department {
  admins : string[];
  constructor(id: string, admins) {
    super(id, 'IT');
    this.admins = admins;
    /* for the above implementation to work, we need to bind admins to this.admins */
/*
   }
}
 */
const it = new ITDepartment('id1', ['Clobbsson']);

it.describe();
it.addEmployee('Clobbsson');
it.addEmployee('Clobbert');

it.printEmployeeInfo();

console.log(it);
// accounting.employee[2] = "Clobbe"

//Above code is not valid since the use of "private" on the method inside the class enforces the use of .addEmployee() -- Great stuff for making sure classes are used the way they're designed to.

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found!');
  }
  /* a "getter" for getting a value from a property */

  set mostRecentReport(value: string) {
    if (!value) throw new Error('Pass a valid value!');
    this.addReport(value);
  }
  /* a "setter" which can be used to set a value to a property.*/

  /* it's preferred to use setters & getters when it's required/wanted to anonymize what's going on under the hood.  */

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
}

const accountingDep = new AccountingDepartment('id2', []);

accountingDep.mostRecentReport = 'this is another report';
accountingDep.addReport('This is a report for the accounting department');
console.log(accountingDep.mostRecentReport);

console.log(accountingDep);
accountingDep.printReports();

accountingDep.mostRecentReport;
