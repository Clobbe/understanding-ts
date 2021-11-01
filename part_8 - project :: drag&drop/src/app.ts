enum ProjectStatus {Active, Finished}
// by using enum here it's possible to get auto-correction. 

class Project {
/* the reason for implementing this as a class instead of let's say an interface
or a type is because with this approach it's now possible to instantiate a new object
that's typed correctly. Alternatively you could get the same result with an Interface, 
but then you would create a new object with the type Project instead. */
  constructor(public id:string,
              public title:string,
              public description:string,
              public people:number,
              public status:ProjectStatus) {

  }
}


type Listener = (items: Project[]) => void;
// this is to type the listener-fn

//Project State Manager
class ProjectState {
  private listeners: Listener[] = []
  private projects:Project[] = [];
  private static instance : ProjectState;
  
  private constructor(){}
  

  static getInstance(){
    if(this.instance){
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  /* this static getInstance()-block ensure that theres a global accessable instance of the class ProjectState. */

  addListener(listenerFn : Listener){
    this.listeners.push(listenerFn);  //this add a function to the list of listeners
  }

  addProject(title:string, description:string, numOfPeople:number){
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active,
    )
    this.projects.push(newProject);
    for (const listenerFn of this.listeners){
      listenerFn(this.projects.slice());  // the call of .slice() is done in order to get a copy of the project.
    }
  }
}

const projectState = ProjectState.getInstance(); //by calling this method, we retrieve if there's an existing ProjectState or simply a newly created ProjectState-instance if there is none.


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
  assignedProjects: Project[];

  constructor(private type:'active' | 'finished'){
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.assignedProjects = [];

    const importedContent = document.importNode(
      this.templateElement.content,
      true
    ); 
    //this will import the content of whatever the content is of the template.
    
    this.element = importedContent.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    //the above line set the id of the HTMLElement to it's type, i.e. active-projects

    projectState.addListener((projects:Project[]) => {
      const filteredProjects = projects.filter(prj => {
        // the .filter function is built in and expect to get a critera to filter either true/false.
        if(this.type === 'active'){
          return prj.status === ProjectStatus.Active
          //so, if the type is 'active' then return the enum-status from ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished
        //else return the enum-status from ProjectStatus.Finished

      });
      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });

    this.attach()
    this.renderContent() 
  }

  private renderProjects(){
    const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
    //the above line make sure to fetch the newly created <ul>-object. And using TypeCasting to tell TS that the fetched object is a HTMLUListElement.
    
    listEl.innerHTML = '';
    // by adding this line, we ensure that what's about to get rendered is empty and will therefore remove the issue with duplication-rendering. This way works fine in this project, but for a larger project it would cause some performance issues, i.e. using more memory than necessary.


    for(const prjItems of this.assignedProjects){
      //here we're looping through the array of projects that exists in this.assignedProjects-array. 
      
      const listItem = document.createElement('li');
      // then we create a list-element (<li>)

      listItem.textContent = prjItems.title;
      //which is here populated with the title of the current prjItem.

      listEl.appendChild(listItem)
      //last, the newly created <li> element is appended as a child of the <ul> element
    }
  }

  private renderContent() {
    /* this method is used to render the content that was first attached with the attach() method */
    const listId = `${this.type}-project-list`;   // this sets the id-property on the <ul>-tag
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS' //this is reponsible for adding the text content, i.e. the <h2>-title

  }
  private attach() {
    /* similar to the attach()-method implemented in class ProjectInput this method is responsible for "attaching" the hostElement to the "this"-keyword, but here before the end of the div-tag with id='app' */

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
      projectState.addProject(title, desc, people); // this line adds the input values received from the user in the form and then upon clicking submit, this will add the new project to the projects-array in the instance of ProjectState.
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
