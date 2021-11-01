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

//ProjectInput Class
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

    //TODO :: add conditionals to check that no element is empty
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
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
