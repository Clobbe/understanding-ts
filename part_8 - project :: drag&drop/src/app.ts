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

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    //since the function is only suppose to be called from within the constructor, this is defined as a 'private' function
    this.element.addEventListener('submit', this.submitHandler);
    //this function 'listen' for the form-submission and then call the submitHandler-function
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element); //when calling this method, this will insert the imported template-HTML and insert this after the "opening-tag" of our div "app"
  }
}

const prjIn = new ProjectInput();
