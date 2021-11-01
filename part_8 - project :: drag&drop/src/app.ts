//implementation of validate()
interface Validatable {
  value: string | number;
  required: boolean;
  minLength?: number; // this checks the length of the value
  maxLength?: number; // this checks the length of the value
  min?: number; // this checks the actual value
  max?: number; // this checks the actual value
}

function validate(validationInput: Validatable) {
  let isValid = true;

  if (validationInput.required) {
    isValid = isValid && validationInput.value.toString().trim().length !== 0;
  }
  if (
    validationInput.minLength != null &&
    typeof validationInput.value === 'string'
  ) {
    isValid =
      isValid && validationInput.value.length > validationInput.minLength;
  }
  if (
    validationInput.maxLength != null &&
    typeof validationInput.value === 'string'
  ) {
    isValid =
      isValid && validationInput.value.length < validationInput.maxLength;
  }
  if (
    validationInput.min != null &&
    typeof validationInput.value === 'number'
  ) {
    isValid = isValid && validationInput.value >= validationInput.min;
  }
  if (
    validationInput.max != null &&
    typeof validationInput.value === 'number'
  ) {
    isValid = isValid && validationInput.value <= validationInput.max;
  }
  return isValid;
}

/* //implmentation of a Autobind-decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
 */
/* For some reason the Autobind-decorator doesn't work properly. It returns as "undefined" */


class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type:'active' | 'finished'){
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedContent = document.importNode(
      this.templateElement.content,
      true
    ); //this will import the content of whatever the content is of the template.
    this.element = importedContent.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach()
    this.renderContent()
  }
  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'

  }
  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element); //when calling this method, this will insert the imported template-HTML and insert this after the "opening-tag" of our div "app"
  }
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  //these fields are the elements inside the form. Elements which we'll want to access.
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedContent = document.importNode(
      this.templateElement.content,
      true
    ); //this will import the content of whatever the content is of the template.
    this.element = importedContent.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;
    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    //by adding 'void' to the method we tell TS that the method can return nothing/undefined
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('invalid input, make sure all fields are filled');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    //since the function is only suppose to be called from within the constructor, this is defined as a 'private' function
    this.element.addEventListener('submit', this.submitHandler.bind(this));
    //this function 'listen' for the form-submission and then call the submitHandler-function
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element); //when calling this method, this will insert the imported template-HTML and insert this after the "opening-tag" of our div "app"
  }
}

const prjIn = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
