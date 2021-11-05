import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement; // exclamation mark (!) tells TS that this won't be null.

const gMapsApiKey = 'AIzaSyDEaoBTSphBIfvGf1jvr2s4asU8X85KmyI';

const searchAddressHandler = (event: Event) => {
  event.preventDefault(); //this prevents that a HTTP-request is sent and so that the page it self don't reload.
  const enteredAddress = addressInput.value;

  // here code for calling GMaps-API go
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${gMapsApiKey}`
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

form.addEventListener('submit', searchAddressHandler);
