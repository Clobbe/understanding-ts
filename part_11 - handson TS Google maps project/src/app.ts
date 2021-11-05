const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement; // exclamation mark (!) tells TS that this won't be null.

const searchAddressHandler = (event: Event) => {
  event.preventDefault(); //this prevents that a HTTP-request is sent and so that the page it self don't reload.
  const enteredAddress = addressInput.value;

  // here code for calling GMaps-API go
};

form.addEventListener('submit', searchAddressHandler);
